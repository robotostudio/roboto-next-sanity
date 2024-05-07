import 'server-only';

import type { QueryOptions, QueryParams } from 'next-sanity';

import { client } from '~/lib/sanity/client';

export const token = process.env.SANITY_API_TOKEN;

export async function sanityServerFetch<QueryResponse>({
  query,
  params = {},
  tags,
  preview: isDraftMode = false,
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
  preview?: boolean;
}) {
  if (isDraftMode && !token) {
    throw new Error(
      'The `SANITY_API_READ_TOKEN` environment variable is required.',
    );
  }

  return client.fetch<QueryResponse>(query, params, {
    ...(isDraftMode
      ? ({
          token: token,
          perspective: 'previewDrafts',
        } satisfies QueryOptions)
      : {}),
    next: {
      revalidate: isDraftMode ? 0 : false,
      tags,
    },
  });
}
