import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createRemoteJWKSet, jwtVerify } from 'jose';

const FIREBASE_PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'karate-opam';

const JWKS_URI = new URL(
  'https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com'
);

const getJWKS = createRemoteJWKSet(JWKS_URI);

// Rotas públicas do backoffice (não precisam de autenticação)
const publicBackofficeRoutes = [
  '/backoffice/sign-in',
  '/backoffice/access-denied',
  '/backoffice/force-signout',
];

function isProtectedBackofficeRoute(pathname: string): boolean {
  return (
    pathname.startsWith('/backoffice') &&
    !publicBackofficeRoutes.some((route) => pathname.startsWith(route))
  );
}

async function verifyFirebaseToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, getJWKS, {
      issuer: `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`,
      audience: FIREBASE_PROJECT_ID,
    });
    return true;
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (!isProtectedBackofficeRoute(pathname)) {
    return NextResponse.next();
  }

  const session = req.cookies.get('__session')?.value;

  if (!session || !(await verifyFirebaseToken(session))) {
    const signInUrl = new URL('/backoffice/sign-in', req.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};
