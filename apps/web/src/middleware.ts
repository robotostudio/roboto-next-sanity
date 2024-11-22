import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames and api routes
  matcher: [
    // Match all pathnames except for
    // - /api (API routes)
    // - /_next (Next.js internals)
    // - /static (inside /public)
    // - /_vercel (Vercel internals)
    // - /favicon.ico, /robots.txt (static files)
    '/((?!api|_next|_vercel|static|favicon.ico|robots.txt).*)',
  ],
};
