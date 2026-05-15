import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const role = request.cookies.get('role')?.value;
  const { pathname } = request.nextUrl;

  if (token && (pathname === '/login' || pathname === '/signup')) {
    if (role === 'admin') return NextResponse.redirect(new URL('/admin-dashboard', request.url));
    if (role === 'business') return NextResponse.redirect(new URL('/dashboard', request.url));
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (pathname.startsWith('/dashboard') && role !== 'business' && role !== 'admin') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (pathname.startsWith('/admin-dashboard') && role !== 'admin') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin-dashboard/:path*', '/login', '/signup'],
};