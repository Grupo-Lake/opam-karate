import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3334';

const isPublicBackofficeRoute = createRouteMatcher([
  '/backoffice/sign-in(.*)',
  '/backoffice/sign-up(.*)',
  '/backoffice/access-denied(.*)',
  '/backoffice/force-signout(.*)',
]);

const isProtectedRoute = createRouteMatcher(['/backoffice(.*)']);

async function checkWhitelist(email: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/admin-whitelist/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    console.log(`[Middleware] 📡 Whitelist check response: ${response.status}`);

    if (response.status === 403) {
      console.log(`[Middleware] 🚫 Email not in whitelist`);
      return false;
    }

    if (!response.ok) {
      console.error(`[Middleware] ⚠️  Whitelist check failed: ${response.status}`);
      return true;
    }

    console.log(`[Middleware] ✅ Whitelist check passed`);
    return true;
  } catch (error) {
    console.error('[Middleware] ❌ Error checking whitelist:', error);
    return true;
  }
}

export default clerkMiddleware(async (auth, req) => {
  const pathname = req.nextUrl.pathname;
  
  console.log(`[Middleware] Path: ${pathname}`);

  if (isPublicBackofficeRoute(req)) {
    console.log(`[Middleware] ✅ Public route allowed: ${pathname}`);
    return NextResponse.next();
  }

  if (isProtectedRoute(req)) {
    console.log(`[Middleware] 🔒 Protected route, checking auth: ${pathname}`);
    
    const { userId, sessionClaims } = await auth();

    if (!userId) {
      console.log(`[Middleware] ❌ Not authenticated, redirecting to sign-in`);
      const signInUrl = new URL('/backoffice/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return NextResponse.redirect(signInUrl);
    }

    console.log(`[Middleware] ✅ Authenticated, userId: ${userId}`);

    const email = 
      (sessionClaims?.email as string | undefined) ||
      (sessionClaims?.email_address as string | undefined) ||
      (sessionClaims?.primaryEmailAddress as string | undefined) ||
      (sessionClaims?.emailAddresses as string | undefined);

    console.log(`[Middleware] 📧 Session claims:`, {
      email: sessionClaims?.email,
      email_address: sessionClaims?.email_address,
      primaryEmailAddress: sessionClaims?.primaryEmailAddress,
      emailAddresses: sessionClaims?.emailAddresses,
      extractedEmail: email,
    });

    if (!email) {
      console.log(`[Middleware] ⚠️  No email found in session claims - trying Clerk API...`);
      console.log(`[Middleware] Full session claims:`, JSON.stringify(sessionClaims, null, 2));
      
      try {
        const client = await clerkClient();
        const user = await client.users.getUser(userId);
        const userEmail = user.emailAddresses.find(e => e.id === user.primaryEmailAddressId)?.emailAddress;
        
        console.log(`[Middleware] 📧 Email from Clerk API: ${userEmail}`);
        
        if (!userEmail) {
          console.log(`[Middleware] ❌ No email found even in Clerk API - LOGOUT FORÇADO`);
        } else {
          console.log(`[Middleware] ✅ Email found via Clerk API: ${userEmail}, checking whitelist`);
          
          const isInWhitelist = await checkWhitelist(userEmail);
          
          if (!isInWhitelist) {
            const deniedUrl = new URL('/backoffice/access-denied', req.url);
            return NextResponse.redirect(deniedUrl);
          }
          
          return NextResponse.next();
        }
      } catch (error) {
        console.error(`[Middleware] ❌ Error fetching user from Clerk API:`, error);
      }
      
      const alreadySigningOut = req.cookies.get('force_signout_in_progress');
      
      if (alreadySigningOut) {
        console.log(`[Middleware] ❌ Already in sign-out process, aborting to prevent loop`);
        const response = NextResponse.redirect(new URL('/backoffice/sign-in', req.url));
        response.cookies.delete('__session');
        response.cookies.delete('__client');
        response.cookies.delete('__clerk_db_jwt');
        response.cookies.delete('force_signout_in_progress');
        return response;
      }
      
      const forceSignOutUrl = new URL('/backoffice/force-signout', req.url);
      const response = NextResponse.redirect(forceSignOutUrl);
      response.cookies.set('force_signout_in_progress', 'true', { 
        maxAge: 10,
        path: '/' 
      });
      
      return response;
    }
  
    const alreadySigningOut = req.cookies.get('force_signout_in_progress');
    if (alreadySigningOut) {
      console.log(`[Middleware] ✅ Session recovered, removing force-signout cookie`);
    }

    console.log(`[Middleware] 📧 Checking whitelist for email: ${email}`);

    const isInWhitelist = await checkWhitelist(email);
    
    if (!isInWhitelist) {
      const deniedUrl = new URL('/backoffice/access-denied', req.url);
      return NextResponse.redirect(deniedUrl);
    }
  } else {
    console.log(`[Middleware] ℹ️  Not a backoffice route: ${pathname}`);
  }

  console.log(`[Middleware] ➡️  Allowing access to: ${pathname}\n`);
  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
