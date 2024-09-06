import { handleErrors } from '~/lib/helper';
import { client } from '~/lib/sanity';
import { getNavbarDataQuery } from '~/lib/sanity/query';
import type { GetNavbarDataQueryResult } from '~/sanity.types';

export const getNavbarData = async () => {
  return await handleErrors(
    client.fetch<GetNavbarDataQueryResult>(getNavbarDataQuery),
  );
};
