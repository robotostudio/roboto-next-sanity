import createMiddleware from 'next-intl/middleware';
import { DEFAULT_LOCALE, Locale, locales } from './config';

export default createMiddleware({
  locales: locales,
  defaultLocale: DEFAULT_LOCALE as Locale,
  localeDetection: false,
  localePrefix: 'as-needed',
});

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
