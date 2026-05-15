import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const role = request.cookies.get('role')?.value;
  const { pathname } = request.nextUrl;

  // 1. If logged in, block Auth Pages (Login/Signup)
  if (token && (pathname === '/login' || pathname === '/signup')) {
    if (role === 'admin') return NextResponse.redirect(new URL('/admin', request.url));
    if (role === 'business') return NextResponse.redirect(new URL('/dashboard', request.url));
    return NextResponse.redirect(new URL('/', request.url)); // Default user
  }

  // 2. Role Protection for Business Dashboard
  if (pathname.startsWith('/dashboard') && role !== 'business' && role !== 'admin') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 3. Role Protection for Admin Panel
  if (pathname.startsWith('/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/login', '/signup'],
};