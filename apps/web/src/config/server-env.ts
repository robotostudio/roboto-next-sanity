import { createEnv } from '@t3-oss/env-nextjs';
import { vercel } from '@t3-oss/env-nextjs/presets';
import { z } from 'zod';

export const serverEnv = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'production']),
    SANITY_API_TOKEN: z.string(),
    SANITY_PREVIEW_SECRET: z.string(),
    SANITY_API_READ_TOKEN: z.string(),
    SANITY_REVALIDATE_SECRET: z.string().default('REVALIDATE_SECRET'),
  },
  extends: [vercel()],
  emptyStringAsUndefined: true,
  experimental__runtimeEnv: process.env,
});
