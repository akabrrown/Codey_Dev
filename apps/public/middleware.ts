import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // Exclude static files, API routes, and the coming-soon route itself from redirects
  if (
    url.pathname.startsWith('/_next') || 
    url.pathname.startsWith('/api') || 
    url.pathname.startsWith('/coming-soon') ||
    url.pathname.startsWith('/reviews') ||
    url.pathname.match(/\.(png|jpg|jpeg|gif|svg|ico)$/)
  ) {
    return NextResponse.next();
  }

  // Only rewrite to coming-soon if we're in the Vercel production environment
  if (process.env.VERCEL_ENV === 'production') {
    url.pathname = '/coming-soon';
    return NextResponse.rewrite(url);
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
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
