import { unstable_cache } from 'next/cache';
import { DEFAULT_LOCALE, LOCALES, type Locale } from '~/config';
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

// /**
//  * Extracts slug from path segments
//  */
// const extractSlugFromPath = (slugPath: string): string => {
//   const slugFragments = slugPath.split('/').filter(Boolean);
//   return slugFragments.length > 1 ? slugFragments[1] : slugFragments[0];
// };

/**
/**
 * Gets all valid page paths with their locales
 * @returns Array of page paths with their corresponding locales
 */
export const getAllSlugPagePaths = unstable_cache(
  async () => {
    const [data, error] = await handleErrors(
      client.fetch(getAllSlugPagePathsQuery),
    );

    if (!Array.isArray(data) || error) {
      console.error('Failed to fetch page paths:', error);
      return [];
    }

    return data
      .filter((page): page is { slug: string; locale: string } =>
        Boolean(page?.slug && page?.locale),
      )
      .map(({ slug }) => {
        const segments = slug.split('/').filter(Boolean);
        const [firstSegment, ...restSegments] = segments;
        const isLocaleSegment = LOCALES.includes(firstSegment as Locale);

        return {
          locale: isLocaleSegment ? (firstSegment as Locale) : DEFAULT_LOCALE,
          rest: isLocaleSegment ? restSegments : segments,
        };
      });
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
    return await handleErrors(client.fetch(slugPageQueryOG, { id }));
  },
  ['slugPageOG'],
  cacheConfig,
);

/**
 * Gets Open Graph data for generic pages
 */
export const getGenericPageOGData = unstable_cache(
  async (id: string) => {
    return await handleErrors(client.fetch(genericPageQueryOG, { id }));
  },
  ['genericPageOG'],
  cacheConfig,
);
