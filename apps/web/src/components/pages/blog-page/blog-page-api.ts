import { LOCALIZED_SANITY_TAGS, type Locale, SANITY_TAGS } from '~/config';
import { getLocalizedSlug, handleErrors } from '~/lib/helper';
import {
  blogPageQueryOG,
  getAllBlogIndexTranslationsQuery,
  getAllBlogsPathsQuery,
  getBlogIndexDataQuery,
  getBlogPageDataQuery,
} from '~/lib/sanity/query';
import { sanityServerFetch } from '~/lib/sanity/sanity-server-fetch';
import type {
  BlogPageQueryOGResult,
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
  const localizedSlug = getLocalizedSlug(slug, locale, 'blog');
  return await handleErrors(
    sanityServerFetch<GetBlogPageDataQueryResult>({
      query: getBlogPageDataQuery,
      params: { slug: localizedSlug, locale },
      tags: [
        LOCALIZED_SANITY_TAGS.blogPage(locale),
        SANITY_TAGS.blogPage,
        localizedSlug,
      ],
    }),
  );
};

export const getBlogIndexData = async (locale: Locale) => {
  return await handleErrors(
    sanityServerFetch<GetBlogIndexDataQueryResult>({
      query: getBlogIndexDataQuery,
      params: { locale },
      tags: [LOCALIZED_SANITY_TAGS.blogIndex(locale), SANITY_TAGS.blogIndex],
    }),
  );
};

export const getBlogPageOGData = async (id: string) => {
  return await handleErrors(
    sanityServerFetch<BlogPageQueryOGResult>({
      query: blogPageQueryOG,
      params: { id },
    }),
  );
};
