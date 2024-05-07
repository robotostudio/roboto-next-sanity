import { SANITY_TAGS } from '~/config';
import { handleErrors } from '~/lib/helper';
import { getNavbarDataQuery } from '~/lib/sanity/query';
import { sanityServerFetch } from '~/lib/sanity/sanity-server-fetch';
import { GetNavbarDataQueryResult } from '~/sanity.types';

export const getNavbarData = async () => {
  return await handleErrors(
    sanityServerFetch<GetNavbarDataQueryResult>({
      query: getNavbarDataQuery,
      tags: [SANITY_TAGS.navbar],
    }),
  );
};
