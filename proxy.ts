import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define which paths are completely public
const isPublicRoute = createRouteMatcher(["/", "/api/webhook(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  // Directly read the URL path from the request object
  const url = new URL(request.url);
  
  // If it's not a public route, enforce login security rules
  if (!isPublicRoute(request)) {
    await auth().protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.[^?]*$$).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
