import { unstable_cache } from 'next/cache';
import { sanityFetch } from '~/lib/sanity/live';
import { getNavbarDataQuery } from '~/lib/sanity/queries';

const navbarFetcher = unstable_cache(async () => {
  return await sanityFetch({
    query: getNavbarDataQuery,
  });
}, ['navbar-data']);

export async function getNavbarData() {
  return await navbarFetcher();
}
