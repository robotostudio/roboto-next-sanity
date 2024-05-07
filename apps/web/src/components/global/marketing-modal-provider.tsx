import { FC, Suspense } from 'react';
import { handleErrors } from '~/lib/helper';
import { getMarketingModalDataQuery } from '~/lib/sanity/query';
import { sanityServerFetch } from '~/lib/sanity/sanity-server-fetch';
import { GetMarketingModalDataQueryResult } from '~/sanity.types';

import { MarketingModal } from '~/components/atoms/marketing-modal';


const getMarketingModals = async () => {
  return await handleErrors(
    sanityServerFetch<GetMarketingModalDataQueryResult>({
      query: getMarketingModalDataQuery,
    }),
  );
};

export const MarketingModalProvider: FC = async () => {
  const [data, err] = await getMarketingModals();

  if (!data || err) return <></>;

  return (
    <Suspense>
      <MarketingModal data={data} />
    </Suspense>
  );
};
