import { unstable_cache } from 'next/cache';
import { sanityFetch } from '~/lib/sanity/live';
import { getFooterDataQuery } from '~/lib/sanity/queries';

const footerFetcher = unstable_cache(async () => {
  return await sanityFetch({
    query: getFooterDataQuery,
  });
}, ['footer-data']);

export async function getFooterData() {
  return await footerFetcher();
}
