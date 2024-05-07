import { SANITY_TAGS } from '~/config';
import { handleErrors } from '~/lib/helper';
import { getFooterDataQuery } from '~/lib/sanity/query';
import { sanityServerFetch } from '~/lib/sanity/sanity-server-fetch';
import { GetFooterDataQueryResult } from '~/sanity.types';

export const getFooterData = async () => {
  return await handleErrors(
    sanityServerFetch<GetFooterDataQueryResult>({
      query: getFooterDataQuery,
      tags: [SANITY_TAGS.footer],
    }),
  );
};
