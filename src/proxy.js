
import { NextResponse } from "next/server";

export function proxy(request) {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  const { pathname } = request.nextUrl;

  // Prevent authenticated users from accessing auth pages
  if (token && (pathname === "/login" || pathname === "/signup")) {
    if (role === "admin") {
      return NextResponse.redirect(
        new URL("/admin-dashboard", request.url)
      );
    }

    if (role === "business") {
      return NextResponse.redirect(
        new URL("/dashboard", request.url)
      );
    }

    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  // Protect business dashboard
  if (pathname.startsWith("/dashboard")) {
    if (!token || role !== "business") {
      return NextResponse.redirect(
        new URL("/", request.url)
      );
    }
  }

  // Protect admin dashboard
  if (pathname.startsWith("/admin-dashboard")) {
    if (!token || role !== "admin") {
      return NextResponse.redirect(
        new URL("/", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin-dashboard/:path*",
    "/login",
    "/signup",
  ],
};
