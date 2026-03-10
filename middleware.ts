import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Never touch NextAuth or API routes
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAdmin = token?.role === "admin";
  const isLoggedIn = !!token;

  // Admin on any non-admin page → redirect to dashboard
  if (isAdmin && !pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  // Non-admin trying to access admin dashboard → redirect to admin login
  if (!isAdmin && pathname.startsWith("/admin/dashboard")) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  // Unauthenticated user trying to watch a lesson video (3rd level deep)
  if (!isLoggedIn && pathname.match(/^\/lessons\/[^/]+\/[^/]+/)) {
    return NextResponse.redirect(new URL(`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`, req.url));
  }

  // Unauthenticated user trying to access protected student pages
  if (!isLoggedIn && (pathname.startsWith("/profile") || pathname.startsWith("/dashboard") || pathname.startsWith("/checkout"))) {
    return NextResponse.redirect(new URL(`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icons|manifest.json|hero|sponsors|videos).*)"],
};
