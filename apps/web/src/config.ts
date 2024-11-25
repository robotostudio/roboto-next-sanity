export const CONSTANTS = {
  SANITY_API_VERSION: '2024-11-15',
};


export const DEFAULT_LOCALE = 'en-GB';
export const LOCALES = [DEFAULT_LOCALE, 'de', 'fr'] as const;

export type Locale = (typeof LOCALES)[number];

const getBaseUrl = (): string => {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production')
    return `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview')
    return `https://${process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}`;
  return 'http://localhost:3000';
};

export const isProd = process.env.NODE_ENV === 'production';

export const baseUrl = getBaseUrl();

export const ogImageDimensions = {
  width: 1200,
  height: 630,
};
