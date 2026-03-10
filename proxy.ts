export { default as proxy } from "next-auth/middleware";

export const config = {
  // Protect admin dashboard and individual lesson/course pages for students
  matcher: [
    "/admin/dashboard/:path*",
    "/lessons/:courseId/:path*",
  ],
};
