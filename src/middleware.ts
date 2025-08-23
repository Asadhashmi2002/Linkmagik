import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the path matches a short code pattern (4 characters, alphanumeric)
  const shortCodeMatch = pathname.match(/^\/([0-9a-zA-Z]{4})$/);
  
  if (shortCodeMatch) {
    const code = shortCodeMatch[1];
    
    // Skip if it's our ad pages or other known routes
    if (code === 'ad' || code === 'ad-2' || code === 'api') {
      return NextResponse.next();
    }
    
    // For short codes, let the dynamic route handle it
    return NextResponse.next();
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
