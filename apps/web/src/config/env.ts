export const {
  NODE_ENV,
  SANITY_API_TOKEN,
  NEXT_PUBLIC_SANITY_PROJECT_ID,
  SANITY_PREVIEW_SECRET,
  NEXT_PUBLIC_SITE_URL,
} = process.env;

export const isProd = NODE_ENV === 'production';
export const isPreview = process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview';

export const webConfig = {
  root: isPreview
    ? `https://${process.env.VERCEL_URL}` ?? 'http://localhost:3000'
    : NEXT_PUBLIC_SITE_URL ?? 'http://locahost:3000',
};

export const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL;

/* eslint-disable no-nested-ternary */
export const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : vercelUrl
  ? `https://${vercelUrl}`
  : 'http://localhost:3000';

