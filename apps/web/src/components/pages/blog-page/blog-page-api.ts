import type { Locale } from '~/config';
import { handleErrors } from '~/lib/helper';
import { client } from '~/lib/sanity/client';
import { sanityFetch } from '~/lib/sanity/live';
import {
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
  return await handleErrors(client.fetch(getAllBlogsPathsQuery));
}

export async function getAllBlogIndexTranslations() {
  return await handleErrors(client.fetch(getAllBlogIndexTranslationsQuery));
}
