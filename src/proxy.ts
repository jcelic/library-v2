import { NextResponse, type NextRequest } from 'next/server';
import { SESSION_COOKIE_NAME } from '@/lib/auth/constants';

const PUBLIC_PATHS = ['/login', '/signup'];

export const proxy = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const isPublicPath = PUBLIC_PATHS.includes(pathname);
  const hasSessionCookie = request.cookies.has(SESSION_COOKIE_NAME);

  if (!hasSessionCookie && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!_next/static|_next/image|.*\\..*).*)'],
};
