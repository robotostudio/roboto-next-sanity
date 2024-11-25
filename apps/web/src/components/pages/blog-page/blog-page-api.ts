import { unstable_cache } from 'next/cache';
import type { Locale } from '~/config';
import { handleErrors } from '~/lib/helper';
import { client } from '~/lib/sanity/client';
import { sanityFetch } from '~/lib/sanity/live';
import {
  blogPageQueryOG,
  getAllBlogIndexTranslationsQuery,
  getAllBlogsPathsQuery,
  getBlogIndexDataQuery,
  getBlogPageDataQuery,
} from '~/lib/sanity/queries';

export async function getBlogIndexData(locale: Locale) {
  return await handleErrors(
    sanityFetch({
      query: getBlogIndexDataQuery,
      params: {
        locale,
      },
    }),
  );
}

export async function getBlogPageData(slug: string, locale: Locale) {
  return await handleErrors(
    sanityFetch({
      query: getBlogPageDataQuery,
      params: { slug, locale },
    }),
  );
}

export async function getAllBlogsPaths() {
  const [result, err] = await handleErrors(client.fetch(getAllBlogsPathsQuery));
  if (err || !Array.isArray(result)) return [];

  const paths: { slug: string; locale: string }[] = [];

  for (const item of result) {
    if (!item.slug || !item.locale) continue;
    const slugParts = item.slug.split('/').filter(Boolean);
    paths.push({ slug: slugParts[slugParts.length - 1], locale: item.locale });
  }

  return paths;
}

export async function getAllBlogIndexTranslations() {
  return await handleErrors(client.fetch(getAllBlogIndexTranslationsQuery));
}

export const getBlogPageOGData = unstable_cache(async (id: string) => {
  return await handleErrors(client.fetch(blogPageQueryOG, { id }));
});
