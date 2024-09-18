const getBaseUrl = (): string => {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production')
    return `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview')
    return `https://${process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}`;
  return 'http://localhost:3000';
};

export const isProd = process.env.NODE_ENV === 'production';

export const baseUrl = getBaseUrl();
