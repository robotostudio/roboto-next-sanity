import { draftMode } from 'next/headers';
import { LOCALIZED_SANITY_TAGS, Locale, SANITY_TAGS } from '~/config';
import { getLocalizedSlug, handleErrors } from '~/lib/helper';
import {
  getAllBlogIndexTranslationsQuery,
  getAllBlogsPathsQuery,
  getBlogIndexDataQuery,
  getBlogPageDataQuery,
} from '~/lib/sanity/query';
import { sanityServerFetch } from '~/lib/sanity/sanity-server-fetch';
import {
  GetAllBlogIndexTranslationsQueryResult,
  GetAllBlogsPathsQueryResult,
  GetBlogIndexDataQueryResult,
  GetBlogPageDataQueryResult,
} from '~/sanity.types';

export const cleanBlogSlug = (str: string) => {
  const arr = str.split('/');
  return arr[arr.length - 1];
};

export const getAllBlogsPaths = async () => {
  return await handleErrors(
    sanityServerFetch<GetAllBlogsPathsQueryResult>({
      query: getAllBlogsPathsQuery,
      tags: [SANITY_TAGS.blogs],
    }),
  );
};

export const getAllBlogIndexTranslations = async () => {
  return await handleErrors(
    sanityServerFetch<GetAllBlogIndexTranslationsQueryResult>({
      query: getAllBlogIndexTranslationsQuery,
      tags: [SANITY_TAGS.blogIndex],
    }),
  );
};

export const getBlogPageData = async (slug: string, locale: Locale) => {
  const { isEnabled } = draftMode();

  const localizedSlug = getLocalizedSlug(slug, locale, 'blog');
  return await handleErrors(
    sanityServerFetch<GetBlogPageDataQueryResult>({
      query: getBlogPageDataQuery,
      params: { slug: localizedSlug, locale },
      preview: isEnabled,
      tags: [
        LOCALIZED_SANITY_TAGS.blogPage(locale),
        SANITY_TAGS.blogPage,
        localizedSlug,
      ],
    }),
  );
};

export const getBlogIndexData = async (locale: Locale) => {
  const { isEnabled } = draftMode();
  return await handleErrors(
    sanityServerFetch<GetBlogIndexDataQueryResult>({
      query: getBlogIndexDataQuery,
      params: { locale },
      preview: isEnabled,
      tags: [LOCALIZED_SANITY_TAGS.blogIndex(locale), SANITY_TAGS.blogIndex],
    }),
  );
};
