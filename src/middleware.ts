import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes that don't need authentication
  const publicRoutes = [
    '/api/redirect',
    '/api/auth/login',
    '/api/auth/logout',
    '/api/auth/register',
    '/api/auth/profile',
    '/api/init-db',
    '/api/test-db',
    '/api/test-auth',
    '/api/env-check',
    '/api/create-admin',
    '/api/test-admin',
    '/api/test-login',
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
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (!payload) {
      // Invalid token, redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } catch (error) {
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
