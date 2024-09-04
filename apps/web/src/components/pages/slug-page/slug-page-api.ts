'use server';
import { type Locale, SANITY_TAGS } from '~/config';
import { getLocalizedSlug, handleErrors } from '~/lib/helper';
import {
  genericPageQueryOG,
  getAllSlugPagePathsQuery,
  getSlugPageDataQuery,
  slugPageQueryOG,
} from '~/lib/sanity/query';
import { sanityServerFetch } from '~/lib/sanity/sanity-server-fetch';
import type {
  GenericPageQueryOGResult,
  GetAllSlugPagePathsQueryResult,
  GetSlugPageDataQueryResult,
  SlugPageQueryOGResult,
} from '~/sanity.types';

export const getSlugPageData = async (slug: string, locale: Locale) => {
  const localizedSlug = getLocalizedSlug(slug, locale);
  console.log('🚀 ~ getSlugPageData ~ localizedSlug:', localizedSlug);
  return await handleErrors(
    sanityServerFetch<GetSlugPageDataQueryResult>({
      query: getSlugPageDataQuery,
      params: { slug: localizedSlug, locale },
      tags: [localizedSlug],
    }),
  );
};

export const getAllSlugPagePaths = async () => {
  const [data, err] = await handleErrors(
    sanityServerFetch<GetAllSlugPagePathsQueryResult>({
      query: getAllSlugPagePathsQuery,
      tags: [SANITY_TAGS.slugPage],
    }),
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

export const getSlugPageOGData = async (id: string) => {
  return await handleErrors(
    sanityServerFetch<SlugPageQueryOGResult>({
      query: slugPageQueryOG,
      params: { id },
    }),
  );
};

export const getGenericPageOGData = async (id: string) => {
  return await handleErrors(
    sanityServerFetch<GenericPageQueryOGResult>({
      query: genericPageQueryOG,
      params: { id },
    }),
  );
};
