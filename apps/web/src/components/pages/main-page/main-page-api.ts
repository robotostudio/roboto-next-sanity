import type { Locale } from '~/config';
import { handleErrors } from '~/lib/helper';
import { client } from '~/lib/sanity/client';
import { sanityFetch } from '~/lib/sanity/live';
import {
  getMainPageDataQuery,
  getMainPageTranslationsQuery,
} from '~/lib/sanity/queries';

export async function getMainPageData(locale: Locale) {
  return await handleErrors(
    sanityFetch({
      query: getMainPageDataQuery,
      params: { locale },
      tag: 'mainPage',
    }),
  );
}

export async function getAllMainPageTranslations() {
  return await handleErrors(client.fetch(getMainPageTranslationsQuery));
}
