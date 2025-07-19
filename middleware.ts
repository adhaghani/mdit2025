import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Website launch date - August 1, 2025 at midnight GMT+8
  const launchDate = new Date("2025-08-01T00:00:00+08:00");
  const currentDate = new Date();

  // Check if the website is not live yet
  const siteIsNotLive = currentDate < launchDate;

  // If site is not live and user is trying to access routes other than homepage
  if (siteIsNotLive && request.nextUrl.pathname !== "/") {
    // Redirect to homepage
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  // Match all paths except static files and API routes
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
