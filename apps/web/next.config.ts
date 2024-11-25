import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  devIndicators: {
    appIsrStatus: true,
    buildActivityPosition: 'bottom-right',
    buildActivity: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
