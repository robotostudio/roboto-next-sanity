import createNextIntlPlugin from 'next-intl/plugin';

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
