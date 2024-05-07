import { PartialResponse } from '~/types';
import { getClient } from './client';

type QueryParams = Record<string, unknown>;

const DEFAULT_PARAMS: QueryParams = {};
const DEFAULT_TAGS: string[] = [];
const DEFAULT_REVALIDATION = 3600;

type Props = {
  query: string;
  params?: QueryParams;
  tags?: string[];
  preview?: boolean;
};

export async function sanityFetch<QueryResponse>({
  query,
  params = DEFAULT_PARAMS,
  tags = DEFAULT_TAGS,
  preview,
}: Props): Promise<PartialResponse<QueryResponse>> {
  const client = getClient(preview);
  return client.fetch<PartialResponse<QueryResponse>>(query, params, {
    next: {
      revalidate: DEFAULT_REVALIDATION,
      tags,
    },
  });
}
