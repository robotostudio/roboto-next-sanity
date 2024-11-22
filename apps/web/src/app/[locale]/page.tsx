import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getAllMainPageTranslations,
  getMainPageData,
} from '~/components/pages/main-page/main-page-api';
import MainPageComponent from '~/components/pages/main-page/main-page-component';
import type { Locale } from '~/config';
import { getMetaData } from '~/lib/seo';

type Params = {
  params: Promise<{
    locale: Locale;
  }>;
};

export const generateStaticParams = async () => {
  const [slugs, err] = await getAllMainPageTranslations();
  if (err || !slugs) return [];
  const locales = slugs.filter(Boolean) as string[];
  return locales.map((locale) => ({ locale }));
};

export const generateMetadata = async ({
  params,
}: Params): Promise<Metadata> => {
  const { locale } = await params;
  const [result, err] = await getMainPageData(locale);
  if (err || !result?.data) return {};
  return getMetaData(result.data);
};

export default async function Page({ params }: Params) {
  const { locale } = await params;
  const [response, err] = await getMainPageData(locale);
  if (!response || err) return notFound();
  return <MainPageComponent data={response.data} />;
}
