import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// This tells Clerk that the home page and the AI API route are free to execute
const isPublicRoute = createRouteMatcher(["/", "/api/generate"]);

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
