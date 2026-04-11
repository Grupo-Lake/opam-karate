import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3334';

// Public backoffice routes (sign-in, sign-up, access-denied)
const isPublicBackofficeRoute = createRouteMatcher([
  '/backoffice/sign-in(.*)',
  '/backoffice/sign-up(.*)',
  '/backoffice/access-denied(.*)',
]);

// Protected backoffice routes (everything else under /backoffice)
const isProtectedRoute = createRouteMatcher(['/backoffice(.*)']);

export default clerkMiddleware(async (auth, req) => {
  // Don't protect public auth routes, but protect everything else in backoffice
  if (isProtectedRoute(req) && !isPublicBackofficeRoute(req)) {
    const { userId, sessionClaims } = await auth();

    // Protege a rota (redireciona para sign-in se não autenticado)
    if (!userId) {
      const signInUrl = new URL('/backoffice/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return NextResponse.redirect(signInUrl);
    }

    // Verifica whitelist
    const email = sessionClaims?.email as string | undefined;

    if (!email) {
      const signInUrl = new URL('/backoffice/sign-in', req.url);
      return NextResponse.redirect(signInUrl);
    }

    try {
      // Verifica se o email está na whitelist
      const response = await fetch(`${API_URL}/admin-whitelist/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.status === 403) {
        // Email não está na whitelist
        const deniedUrl = new URL('/backoffice/access-denied', req.url);
        return NextResponse.redirect(deniedUrl);
      }

      if (!response.ok) {
        console.error('Whitelist check failed:', response.status);
        // Fail-open: permite acesso em caso de erro
        // Para fail-closed, descomente a linha abaixo:
        // return NextResponse.redirect(new URL('/backoffice/access-denied', req.url));
      }
    } catch (error) {
      console.error('Error checking whitelist:', error);
      // Fail-open: permite acesso em caso de erro
    }
  }

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
