import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Public backoffice routes (sign-in, sign-up)
const isPublicBackofficeRoute = createRouteMatcher([
  '/backoffice/sign-in(.*)',
  '/backoffice/sign-up(.*)',
]);

// Protected backoffice routes (everything else under /backoffice)
const isProtectedRoute = createRouteMatcher(['/backoffice(.*)']);

export default clerkMiddleware(async (auth, req) => {
  // Don't protect public auth routes, but protect everything else in backoffice
  if (isProtectedRoute(req) && !isPublicBackofficeRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
