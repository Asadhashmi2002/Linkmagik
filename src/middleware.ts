import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes that don't need authentication
  const publicRoutes = [
    '/api/redirect',
    '/api/auth/login',
    '/api/auth/logout',
    '/ad',
    '/ad-2',
    '/redirect',
    '/login',
  ];

  // Check if the current path is public
  const isPublicRoute = publicRoutes.some(route => 
    pathname.startsWith(route)
  );

  // If it's a public route, allow access
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // For protected routes, check authentication
  const token = request.cookies.get('auth-token')?.value;

  if (!token) {
    // Redirect to login page
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Verify the token
  const payload = verifyToken(token);
  if (!payload) {
    // Invalid token, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Valid token, allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth endpoints)
     * - api/redirect (redirect endpoints)
     * - ad (ad pages)
     * - ad-2 (ad pages)
     * - redirect (redirect pages)
     * - login (login page)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api/auth|api/redirect|ad|ad-2|redirect|login|_next/static|_next/image|favicon.ico).*)',
  ],
};
