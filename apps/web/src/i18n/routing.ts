import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

const DEFAULT_LOCALE = 'en' as const;
const LOCALES = [DEFAULT_LOCALE, 'de'] as const;

export type Locale = (typeof LOCALES)[number];

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: LOCALES,
  // Used when no locale matches
  defaultLocale: DEFAULT_LOCALE,
  localeDetection: false,
  localePrefix: 'always',
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
