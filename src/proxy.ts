import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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

export function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (!isProtectedBackofficeRoute(pathname)) {
    return NextResponse.next();
  }

  // Verificar apenas se o cookie de sessão existe.
  // A validação real (token + whitelist) ocorre uma única vez durante o login,
  // não em cada requisição, evitando chamadas externas que podem falhar e causar loops.
  const session = req.cookies.get('__session')?.value;

  if (!session) {
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

