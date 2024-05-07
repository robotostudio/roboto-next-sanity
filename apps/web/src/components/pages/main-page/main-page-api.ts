import { draftMode } from 'next/headers';
import { LOCALIZED_SANITY_TAGS, Locale, SANITY_TAGS } from '~/config';
import { handleErrors } from '~/lib/helper';
import {
  getAllMainPageTranslationsQuery,
  getMainPageDataQuery,
} from '~/lib/sanity/query';
import { sanityServerFetch } from '~/lib/sanity/sanity-server-fetch';
import {
  GetAllMainPageTranslationsQueryResult,
  GetMainPageDataQueryResult,
} from '~/sanity.types';

export const getMainPageData = async (locale: Locale) => {
  const { isEnabled } = draftMode();
  return await handleErrors(
    sanityServerFetch<GetMainPageDataQueryResult>({
      query: getMainPageDataQuery,
      params: { locale },
      preview: isEnabled,
      tags: [LOCALIZED_SANITY_TAGS.mainPage(locale), SANITY_TAGS.mainPage],
    }),
  );
};

export const getAllMainPageTranslations = async () => {
  return await handleErrors(
    sanityServerFetch<GetAllMainPageTranslationsQueryResult>({
      query: getAllMainPageTranslationsQuery,
      tags: [SANITY_TAGS.mainPage],
    }),
  );
};
