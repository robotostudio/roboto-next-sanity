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

export const getSlugPageData = async (slug: string, locale: Locale) => {
  return await handleErrors(
    sanityFetch({
      query: getSlugPageDataQuery,
      params: { slug, locale },
    }),
  );
};

export const getAllSlugPagePaths = async () => {
  const [data, err] = await handleErrors(
    client.fetch(getAllSlugPagePathsQuery),
  );
  if (!data || err) {
    return [];
  }
  const paths: { slug: string; locale: Locale }[] = [];
  for (const page of data) {
    if (page?.slug && page?.locale) {
      const slugFragments = page.slug.split('/').filter(Boolean);
      const slug =
        slugFragments.length > 1 ? slugFragments[1] : slugFragments[0];
      paths.push({
        locale: page.locale as Locale,
        slug,
      });
    }
  }
  return paths;
};

export const getPageType = async (slug: string) => {
  const getPageTypeCached = unstable_cache(
    async () =>
      await sanityFetch({
        query: getPageTypeQuery,
        params: { slug },
      }),
    ['getPageType', slug],
  );

  return await handleErrors(getPageTypeCached());
};

export const getSlugPageOGData = async (id: string) => {
  return await handleErrors(
    sanityFetch({
      query: slugPageQueryOG,
      params: { id },
    }),
  );
};

export const getGenericPageOGData = async (id: string) => {
  return await handleErrors(
    sanityFetch({
      query: genericPageQueryOG,
      params: { id },
    }),
  );
};
