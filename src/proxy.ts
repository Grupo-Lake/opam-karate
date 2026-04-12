import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3334';

// Public backoffice routes (sign-in, sign-up, access-denied)
const isPublicBackofficeRoute = createRouteMatcher([
  '/backoffice/sign-in(.*)',
  '/backoffice/sign-up(.*)',
  '/backoffice/access-denied(.*)',
  '/backoffice/force-signout(.*)',
]);

// Protected backoffice routes (everything else under /backoffice)
const isProtectedRoute = createRouteMatcher(['/backoffice(.*)']);

export default clerkMiddleware(async (auth, req) => {
  const pathname = req.nextUrl.pathname;
  
  console.log(`[Middleware] Path: ${pathname}`);

  // Permite rotas públicas de autenticação sem nenhuma verificação
  if (isPublicBackofficeRoute(req)) {
    console.log(`[Middleware] ✅ Public route allowed: ${pathname}`);
    return NextResponse.next();
  }

  // Protege rotas do backoffice que não são públicas
  if (isProtectedRoute(req)) {
    console.log(`[Middleware] 🔒 Protected route, checking auth: ${pathname}`);
    
    const { userId, sessionClaims } = await auth();

    // Redireciona para login se não estiver autenticado
    if (!userId) {
      console.log(`[Middleware] ❌ Not authenticated, redirecting to sign-in`);
      const signInUrl = new URL('/backoffice/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return NextResponse.redirect(signInUrl);
    }

    console.log(`[Middleware] ✅ Authenticated, userId: ${userId}`);

    // Verifica whitelist
    const email = sessionClaims?.email as string | undefined;

    if (!email) {
      console.log(`[Middleware] ⚠️  No email in session claims - LOGOUT FORÇADO`);
      
      // Verifica se já passou por force-signout recentemente (evita loop)
      const alreadySigningOut = req.cookies.get('force_signout_in_progress');
      
      if (alreadySigningOut) {
        console.log(`[Middleware] ❌ Already in sign-out process, aborting to prevent loop`);
        // Se já está tentando fazer logout mas ainda tem sessão, força limpeza via cookie
        const response = NextResponse.redirect(new URL('/backoffice/sign-in', req.url));
        response.cookies.delete('__session');
        response.cookies.delete('__client');
        response.cookies.delete('__clerk_db_jwt');
        response.cookies.delete('force_signout_in_progress');
        return response;
      }
      
      // Marca que está em processo de sign-out (expira em 10 segundos)
      const forceSignOutUrl = new URL('/backoffice/force-signout', req.url);
      const response = NextResponse.redirect(forceSignOutUrl);
      response.cookies.set('force_signout_in_progress', 'true', { 
        maxAge: 10,
        path: '/' 
      });
      
      return response;
    }
  
    // Se chegou aqui com email, limpa o cookie de force-signout se existir
    const alreadySigningOut = req.cookies.get('force_signout_in_progress');
    if (alreadySigningOut) {
      console.log(`[Middleware] ✅ Session recovered, removing force-signout cookie`);
    }

    console.log(`[Middleware] 📧 Checking whitelist for email: ${email}`);

    try {
      // Verifica se o email está na whitelist
      const response = await fetch(`${API_URL}/admin-whitelist/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      console.log(`[Middleware] 📡 Whitelist check response: ${response.status}`);

      if (response.status === 403) {
        // Email não está na whitelist
        console.log(`[Middleware] 🚫 Email not in whitelist, access denied`);
        const deniedUrl = new URL('/backoffice/access-denied', req.url);
        return NextResponse.redirect(deniedUrl);
      }

      if (!response.ok) {
        console.error(`[Middleware] ⚠️  Whitelist check failed: ${response.status}`);
        // Fail-open: permite acesso em caso de erro
        // Para fail-closed, descomente a linha abaixo:
        // return NextResponse.redirect(new URL('/backoffice/access-denied', req.url));
      } else {
        console.log(`[Middleware] ✅ Whitelist check passed`);
      }
    } catch (error) {
      console.error('[Middleware] ❌ Error checking whitelist:', error);
      // Fail-open: permite acesso em caso de erro
    }
  } else {
    console.log(`[Middleware] ℹ️  Not a backoffice route: ${pathname}`);
  }

  console.log(`[Middleware] ➡️  Allowing access to: ${pathname}\n`);
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
