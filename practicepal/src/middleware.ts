// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ Allow NextAuth + public/auth pages through (avoid infinite redirects)
  if (
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/auth") ||
    pathname === "/" ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // ✅ Only enforce auth on matched routes (see config.matcher)
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (token) return NextResponse.next();

  // redirect to your actual login page
  const url = req.nextUrl.clone();
  url.pathname = "/auth/login";
  url.searchParams.set("callbackUrl", req.nextUrl.pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/plans/:path*",
    "/stats/:path*",
    "/account/:path*",
    "/sessions/:path*",
  ],
};
