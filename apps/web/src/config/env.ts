// import { createEnv } from '@t3-oss/env-nextjs';
// import { z } from 'zod';

// export const env = createEnv({
//   /*
//    * Serverside Environment variables, not available on the client.
//    * Will throw if you access these variables on the client.
//    */
//   server: {
//     SANITY_API_TOKEN: z.string(),
//     SANITY_PREVIEW_SECRET: z.string(),
//     SANITY_API_READ_TOKEN: z.string(),
//   },

//   /*
//    * Environment variables available on the client (and server).
//    *
//    * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
//    */
//   client: {
//     NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
//     NEXT_PUBLIC_SITE_URL: z.string().min(1),
//     NEXT_PUBLIC_VERCEL_ENV: z
//       .enum(['development', 'preview', 'production'])
//       .default('development'),
//     NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL: z.string().optional(),
//     NEXT_PUBLIC_VERCEL_BRANCH_URL: z.string().optional(),
//   },
//   /*
//    * Due to how Next.js bundles environment variables on Edge and Client,
//    * we need to manually destructure them to make sure all are included in bundle.
//    *
//    * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
//    */
//   runtimeEnv: {
//     SANITY_API_TOKEN: process.env.SANITY_API_TOKEN,
//     SANITY_API_READ_TOKEN: process.env.SANITY_API_READ_TOKEN,
//     NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
//     SANITY_PREVIEW_SECRET: process.env.SANITY_PREVIEW_SECRET,
//     NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
//     NEXT_PUBLIC_VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV,
//     NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL:
//       process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
//     NEXT_PUBLIC_VERCEL_BRANCH_URL: process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL,
//   },
//   skipValidation: true,
// });

// console.log('env', env);

const getBaseUrl = (): string => {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production')
    return process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL as string;
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview')
    return `https://${process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}`;
  return 'http://localhost:3000';
};

export const baseUrl = getBaseUrl();
console.log('🚀 ~ baseUrl:', baseUrl);
