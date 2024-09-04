import { type Locale, SANITY_TAGS } from '~/config';
import { handleErrors } from '~/lib/helper';
import {
  getAllMainPageTranslationsQuery,
  getMainPageDataQuery,
  mainPageQueryOG,
} from '~/lib/sanity/query';
import { sanityServerFetch } from '~/lib/sanity/sanity-server-fetch';
import type {
  GetAllMainPageTranslationsQueryResult,
  GetMainPageDataQueryResult,
  MainPageQueryOGResult,
} from '~/sanity.types';

export const getMainPageData = async (locale: Locale) => {
  return await handleErrors(
    sanityServerFetch<GetMainPageDataQueryResult>({
      query: getMainPageDataQuery,
      params: { locale },
      tags: ['main-page-api'],
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

export const getMainPageOGData = async () => {
  return await handleErrors(
    sanityServerFetch<MainPageQueryOGResult>({
      query: mainPageQueryOG,
    }),
  );
};
