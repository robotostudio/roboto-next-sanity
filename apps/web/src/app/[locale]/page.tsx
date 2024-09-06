import { notFound } from 'next/navigation';
import { MainPageComponent } from '~/components/pages/main-page';
import { getMainPageData } from '~/components/pages/main-page/main-page-api';

import type { PageParams } from '~/types';

export default async function Page({ params }: PageParams) {
  const [data, err] = await getMainPageData(params.locale);
  if (!data || err) return notFound();
  return <MainPageComponent data={data} />;
}
