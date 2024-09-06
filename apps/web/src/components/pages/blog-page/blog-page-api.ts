import { LOCALIZED_SANITY_TAGS, type Locale, SANITY_TAGS } from '~/config';
import { getLocalizedSlug, handleErrors } from '~/lib/helper';
import { client } from '~/lib/sanity';
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

export const getAllBlogsPaths = async () => {
  const [data, err] = await handleErrors(
    client.fetch<GetAllBlogsPathsQueryResult>(getAllBlogsPathsQuery),
  );
  if (!data || err) return [];
  const paths: { slug: string; locale: Locale }[] = [];
  for (const blog of data) {
    if (!blog.slug || !blog?.locale) continue;
    const slugFragments = blog.slug.split('/').filter(Boolean);
    const slug = slugFragments[slugFragments.length - 1];
    paths.push({
      locale: blog.locale as Locale,
      slug,
    });
  }
  return paths;
};

export const getAllBlogIndexTranslations = async () => {
  return await handleErrors(
    client.fetch<GetAllBlogIndexTranslationsQueryResult>(
      getAllBlogIndexTranslationsQuery,
    ),
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
