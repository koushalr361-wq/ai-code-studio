import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define which paths are completely public
const isPublicRoute = createRouteMatcher(["/", "/api/webhook(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  // If it's not a public route, enforce login security rules
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.[^?]*\\.[^?]*$$).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
