import type { Locale } from '~/config';
import { handleErrors } from '~/lib/helper';
import { client } from '~/lib/sanity';
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
    client.fetch<GetAllMainPageTranslationsQueryResult>(
      getAllMainPageTranslationsQuery,
    ),
  );
};

export const getMainPageOGData = async () => {
  return await handleErrors(
    sanityServerFetch<MainPageQueryOGResult>({
      query: mainPageQueryOG,
    }),
  );
};
