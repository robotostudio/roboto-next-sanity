import createNextIntlPlugin from 'next-intl/plugin';
import { fileURLToPath } from 'node:url';
import createJiti from 'jiti';
const jiti = createJiti(fileURLToPath(import.meta.url));

// Import env here to validate during build. Using jiti we can import .ts files :)
jiti('./src/config/server-env.ts');
jiti('./src/config/client-env.ts');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.NODE_ENV === 'development'
    ? {
        cacheMaxMemorySize: 0,
        logging: {
          fetches: {},
        },
      }
    : {}),
  images: {
    remotePatterns: [{ hostname: 'cdn.sanity.io' }],
  },
  experimental: {
    taint: true,
  },
};

export default withNextIntl(nextConfig);
