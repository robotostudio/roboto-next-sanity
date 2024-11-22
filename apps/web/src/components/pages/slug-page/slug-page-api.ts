import { unstable_cache } from 'next/cache';
import type { Locale } from '~/config';
import { handleErrors } from '~/lib/helper';
import { client } from '~/lib/sanity/client';
import { sanityFetch } from '~/lib/sanity/live';
import {
  genericPageQueryOG,
  getAllSlugPagePathsQuery,
  getPageTypeQuery,
  getSlugPageDataQuery,
  slugPageQueryOG,
} from '~/lib/sanity/queries';

// Cache duration in seconds
const CACHE_DURATION = 60 * 60; // 1 hour

// Reusable cache config
const cacheConfig = {
  tags: ['pages'],
  revalidate: CACHE_DURATION,
};

/**
 * Fetches page data for a specific slug and locale
 */
export const getSlugPageData = unstable_cache(
  async (slug: string, locale: Locale) => {
    return await handleErrors(
      sanityFetch({
        query: getSlugPageDataQuery,
        params: { slug, locale },
      }),
    );
  },
  ['slugPageData'],
  cacheConfig,
);

/**
 * Extracts slug from path segments
 */
const extractSlugFromPath = (slugPath: string): string => {
  const slugFragments = slugPath.split('/').filter(Boolean);
  return slugFragments.length > 1 ? slugFragments[1] : slugFragments[0];
};

/**
 * Gets all valid page paths with their locales
 */
export const getAllSlugPagePaths = unstable_cache(
  async () => {
    const [data, err] = await handleErrors(
      client.fetch(getAllSlugPagePathsQuery),
    );


    if (!Array.isArray(data) || err) {
      return [];
    }
    return data.reduce<Array<{ slug: string; locale: Locale }>>(
      (
        paths: Array<{ slug: string; locale: Locale }>,
        page: { slug: string | null; locale: string | null },
      ) => {
        if (!page?.slug || !page?.locale) return paths;

        paths.push({
          locale: page.locale as Locale,
          slug: extractSlugFromPath(page.slug),
        });

        return paths;
      },
      [],
    );
  },
  ['allSlugPaths'],
  cacheConfig,
);

/**
 * Gets the page type for a specific slug
 */
export const getPageType = unstable_cache(
  async (slug: string) => {
    return await handleErrors(
      sanityFetch({
        query: getPageTypeQuery,
        params: { slug },
      }),
    );
  },
  ['pageType'],
  cacheConfig,
);

/**
 * Gets Open Graph data for slug pages
 */
export const getSlugPageOGData = unstable_cache(
  async (id: string) => {
    return await handleErrors(
      sanityFetch({
        query: slugPageQueryOG,
        params: { id },
      }),
    );
  },
  ['slugPageOG'],
  cacheConfig,
);

/**
 * Gets Open Graph data for generic pages
 */
export const getGenericPageOGData = unstable_cache(
  async (id: string) => {
    return await handleErrors(
      sanityFetch({
        query: genericPageQueryOG,
        params: { id },
      }),
    );
  },
  ['genericPageOG'],
  cacheConfig,
);
