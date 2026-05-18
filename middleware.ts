import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define which paths are accessible to the public without logging in
const isPublicRoute = createRouteMatcher(["/", "/api/webhook(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  // If the user is trying to access a private route and isn't logged in, protect it!
  if (!isPublicRoute(request)) {
    await auth().protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.[^?]*$$).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
