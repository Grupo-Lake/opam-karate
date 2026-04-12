import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3334';

// Rotas públicas do backoffice (não precisam autenticação)
const publicBackofficeRoutes = [
  '/backoffice/sign-in',
  '/backoffice/access-denied',
  '/backoffice/force-signout',
];

// Rotas protegidas do backoffice (precisam autenticação)
function isProtectedBackofficeRoute(pathname: string): boolean {
  return pathname.startsWith('/backoffice') && 
         !publicBackofficeRoutes.some(route => pathname.startsWith(route));
}

async function checkWhitelist(email: string, token: string): Promise<boolean> {
  try {
    console.log(`[Proxy] 🔍 Checking whitelist for: ${email}`);
    console.log(`[Proxy] 🎫 Token (first 20 chars): ${token.substring(0, 20)}...`);
    
    const response = await fetch(`${API_URL}/admin-whitelist/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ email }),
    });

    console.log(`[Proxy] 📡 Whitelist check response: ${response.status}`);
    
    // Log do body da resposta
    const responseText = await response.text();
    console.log(`[Proxy] 📄 Response body: ${responseText}`);

    if (response.status === 403) {
      console.log(`[Proxy] 🚫 Email not in whitelist`);
      return false;
    }

    if (!response.ok) {
      console.error(`[Proxy] ⚠️  Whitelist check failed: ${response.status}`);
      return true; // Em caso de erro, permitir acesso (fail-open)
    }

    console.log(`[Proxy] ✅ Whitelist check passed`);
    return true;
  } catch (error) {
    console.error('[Proxy] ❌ Error checking whitelist:', error);
    return true; // Em caso de erro, permitir acesso (fail-open)
  }
}

async function verifyFirebaseToken(token: string): Promise<{ email?: string; uid: string } | null> {
  try {
    const response = await fetch(`${API_URL}/auth/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.log(`[Proxy] ❌ Token verification failed: ${response.status}`);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('[Proxy] ❌ Error verifying token:', error);
    return null;
  }
}

export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  
  console.log(`[Proxy] Path: ${pathname}`);

  // Se NÃO for rota de backoffice, aceitar imediatamente
  if (!isProtectedBackofficeRoute(pathname)) {
    console.log(`[Proxy] ℹ️  Not a protected backoffice route, allowing: ${pathname}`);
    return NextResponse.next();
  }

  console.log(`[Proxy] 🔒 Protected backoffice route: ${pathname}`);

  // A partir daqui, são apenas rotas protegidas do backoffice
  console.log(`[Proxy] 🔒 Protected backoffice route: ${pathname}`);

  // A partir daqui, são apenas rotas protegidas do backoffice

  // Obter token Firebase de múltiplas fontes
  const firebaseToken = 
    req.cookies.get('__session')?.value || 
    req.cookies.get('firebase_token')?.value ||
    req.headers.get('authorization')?.replace('Bearer ', '');

  console.log(`[Proxy] 🍪 Cookies available:`, {
    __session: req.cookies.get('__session') ? 'YES' : 'NO',
    firebase_token: req.cookies.get('firebase_token') ? 'YES' : 'NO',
  });
  console.log(`[Proxy] 📋 Authorization header:`, req.headers.get('authorization') ? 'YES' : 'NO');

  if (!firebaseToken) {
    console.log(`[Proxy] ❌ No Firebase token found, redirecting to sign-in`);
    const signInUrl = new URL('/backoffice/sign-in', req.url);
    signInUrl.searchParams.set('redirect_url', req.url);
    return NextResponse.redirect(signInUrl);
  }

  console.log(`[Proxy] ✅ Firebase token found, verifying...`);

  // Verificar token com Firebase Admin
  const userData = await verifyFirebaseToken(firebaseToken);

  if (!userData) {
    console.log(`[Proxy] ❌ Token verification failed, redirecting to sign-in`);
    const signInUrl = new URL('/backoffice/sign-in', req.url);
    signInUrl.searchParams.set('redirect_url', req.url);
    return NextResponse.redirect(signInUrl);
  }

  console.log(`[Proxy] ✅ Authenticated, uid: ${userData.uid}`);

  const email = userData.email;

  console.log(`[Proxy] 📧 User data:`, {
    uid: userData.uid,
    email: userData.email,
    extractedEmail: email,
  });

  if (!email) {
    console.log(`[Proxy] ⚠️  No email found in token - LOGOUT FORÇADO`);
    
    // Verificar se já estamos em processo de force-signout (prevenir loop)
    const alreadySigningOut = req.cookies.get('force_signout_in_progress');
    
    if (alreadySigningOut) {
      console.log(`[Proxy] ❌ Already in sign-out process, aborting to prevent loop`);
      const response = NextResponse.redirect(new URL('/backoffice/sign-in', req.url));
      response.cookies.delete('__session');
      response.cookies.delete('firebase_token');
      response.cookies.delete('force_signout_in_progress');
      return response;
    }
    
    // Redirecionar para página de force-signout
    const forceSignOutUrl = new URL('/backoffice/force-signout', req.url);
    const response = NextResponse.redirect(forceSignOutUrl);
    response.cookies.set('force_signout_in_progress', 'true', { 
      maxAge: 10,
      path: '/' 
    });
    
    return response;
  }

  // Se chegou aqui, temos email - remover cookie de force-signout se existir
  const alreadySigningOut = req.cookies.get('force_signout_in_progress');
  if (alreadySigningOut) {
    console.log(`[Proxy] ✅ Session recovered, removing force-signout cookie`);
  }

  console.log(`[Proxy] 📧 Checking whitelist for email: ${email}`);

  // Verificar whitelist
  const isInWhitelist = await checkWhitelist(email, firebaseToken);
  
  if (!isInWhitelist) {
    console.log(`[Proxy] 🚫 Email not in whitelist, redirecting to access-denied`);
    const deniedUrl = new URL('/backoffice/access-denied', req.url);
    return NextResponse.redirect(deniedUrl);
  }

  console.log(`[Proxy] ➡️  Allowing access to: ${pathname}\n`);
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};

