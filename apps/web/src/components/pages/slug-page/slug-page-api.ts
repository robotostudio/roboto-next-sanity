'use server';
import { draftMode } from 'next/headers';
import { LOCALIZED_SANITY_TAGS, type Locale, SANITY_TAGS } from '~/config';
import { getLocalizedSlug, handleErrors } from '~/lib/helper';
import {
  getAllSlugPagePathsQuery,
  getSlugPageDataQuery,
} from '~/lib/sanity/query';
import { sanityServerFetch } from '~/lib/sanity/sanity-server-fetch';
import type {
  GetAllSlugPagePathsQueryResult,
  GetSlugPageDataQueryResult,
} from '~/sanity.types';

export const getSlugPageData = async (slug: string, locale: Locale) => {
  const { isEnabled } = draftMode();

  const localizedSlug = getLocalizedSlug(slug, locale);
  return await handleErrors(
    sanityServerFetch<GetSlugPageDataQueryResult>({
      query: getSlugPageDataQuery,
      params: { slug: localizedSlug, locale },
      tags: [LOCALIZED_SANITY_TAGS.slugPage(locale), slug, localizedSlug],
      preview: isEnabled,
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
