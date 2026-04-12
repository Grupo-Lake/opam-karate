import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { firebaseConfig } from "./lib/firebase/config";

const FIREBASE_PROJECT_ID = firebaseConfig.projectId;

if (!FIREBASE_PROJECT_ID) {
  console.error("[MIDDLEWARE] NEXT_PUBLIC_FIREBASE_PROJECT_ID is not set");
}

const JWKS_URI = new URL(
  "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com",
);

let jwksInstance: ReturnType<typeof createRemoteJWKSet> | null = null;

function getJWKS() {
  if (!jwksInstance) {
    jwksInstance = createRemoteJWKSet(JWKS_URI);
  }
  return jwksInstance;
}

// Rotas públicas do backoffice (não precisam de autenticação)
const publicBackofficeRoutes = [
  "/backoffice/sign-in",
  "/backoffice/access-denied",
  "/backoffice/force-signout",
];

function isProtectedBackofficeRoute(pathname: string): boolean {
  return (
    pathname.startsWith("/backoffice") &&
    !publicBackofficeRoutes.some((route) => pathname.startsWith(route))
  );
}

async function verifyFirebaseToken(token: string): Promise<boolean> {
  try {
    if (!FIREBASE_PROJECT_ID) {
      console.error("[MIDDLEWARE] Firebase Project ID not configured");
      return false;
    }

    await jwtVerify(token, getJWKS(), {
      issuer: `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`,
      audience: FIREBASE_PROJECT_ID,
    });
    return true;
  } catch (error) {
    console.error(
      "[MIDDLEWARE] Token verification failed:",
      error instanceof Error ? error.message : "Unknown error",
    );
    return false;
  }
}

export async function proxy(req: NextRequest) {
  try {
    const pathname = req.nextUrl.pathname;

    if (!isProtectedBackofficeRoute(pathname)) {
      return NextResponse.next();
    }

    // Se Firebase não está configurado, bloqueia acesso
    if (!FIREBASE_PROJECT_ID) {
      console.error("[MIDDLEWARE] Blocking access - Firebase not configured");
      const signInUrl = new URL("/backoffice/sign-in", req.url);
      return NextResponse.redirect(signInUrl);
    }

    const session = req.cookies.get("__session")?.value;

    if (!session || !(await verifyFirebaseToken(session))) {
      const signInUrl = new URL("/backoffice/sign-in", req.url);
      return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
  } catch (error) {
    // Fallback crítico: log do erro e permite acesso (pode ajustar para bloquear)
    console.error("[MIDDLEWARE] Critical error:", error);

    // Em produção, redireciona para sign-in em caso de erro crítico
    const signInUrl = new URL("/backoffice/sign-in", req.url);
    return NextResponse.redirect(signInUrl);
  }
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
