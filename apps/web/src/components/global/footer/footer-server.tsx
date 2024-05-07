import { FC } from 'react';
import { getFooterData } from './footer-api';
import { FooterClient } from './footer-client';

export const Footer: FC = async () => {
  const [data, error] = await getFooterData();
  if (error || !data) {
    return <div>Error</div>;
  }
  return <FooterClient data={data} />;
};
