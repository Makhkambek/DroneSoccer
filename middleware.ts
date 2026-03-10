import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;
    const isAdmin = token?.role === "admin";

    // Admin trying to access non-admin pages → redirect to dashboard
    if (isAdmin && !pathname.startsWith("/admin") && !pathname.startsWith("/api")) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }

    // Non-admin trying to access admin pages → redirect to admin login
    if (!isAdmin && pathname.startsWith("/admin/dashboard")) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;
        // Allow public pages without auth
        if (
          pathname === "/" ||
          pathname.startsWith("/about") ||
          pathname.startsWith("/competitions") ||
          pathname.startsWith("/shop") ||
          pathname.startsWith("/apply") ||
          pathname.startsWith("/auth") ||
          pathname.startsWith("/admin/login") ||
          pathname.startsWith("/api") ||
          pathname.startsWith("/_next") ||
          pathname.startsWith("/public")
        ) {
          return true;
        }
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icons|manifest.json|hero|sponsors|videos|api/auth).*)"],
};
