'use server';
import 'server-only';
import { type QueryOptions, type QueryParams, createClient } from 'next-sanity';
import { draftMode } from 'next/headers';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2022-11-15',
  useCdn: process.env.NODE_ENV === 'production',
  stega: {
    enabled: process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview',
    studioUrl:
      process.env.NODE_ENV === 'production'
        ? 'https://template-roboto.sanity.studio'
        : 'http://localhost:3333',
  },
});

export async function sanityServerFetch<QueryResponse>({
  query,
  params = {},
  tags,
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
  revalidate?: number | false;
}) {
  const isDraftMode = draftMode().isEnabled;
  if (isDraftMode && !process.env.SANITY_API_READ_TOKEN) {
    throw new Error('Missing environment variable SANITY_API_READ_TOKEN');
  }

  return client.fetch<QueryResponse>(query, params, {
    ...(isDraftMode
      ? ({
          token: process.env.SANITY_API_READ_TOKEN,
          perspective: 'previewDrafts',
          stega: true,
        } satisfies QueryOptions)
      : {}),
    next: {
      revalidate: isDraftMode ? 0 : false,
      tags,
    },
  });
}
