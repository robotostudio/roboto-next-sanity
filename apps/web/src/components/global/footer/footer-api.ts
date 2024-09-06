import { handleErrors } from '~/lib/helper';
import { client } from '~/lib/sanity';
import { getFooterDataQuery } from '~/lib/sanity/query';
import type { GetFooterDataQueryResult } from '~/sanity.types';

export const getFooterData = async () => {
  return await handleErrors(
    client.fetch<GetFooterDataQueryResult>(getFooterDataQuery),
  );
};
