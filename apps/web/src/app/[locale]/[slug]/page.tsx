import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSlugPageData } from '~/components/pages/slug-page/slug-page-api';
import { SlugPage } from '~/components/pages/slug-page/slug-page-component';
import type { PageParams } from '~/types';

export const generateStaticParams = async () => {
  return [];
};

export const generateMetadata = async ({
  params,
}: PageParams<{ slug: string }>): Promise<Metadata> => {
  return {};
};

export default async function Page({ params }: PageParams<{ slug: string }>) {
  const { locale, slug } = params ?? {};
  const [data, err] = await getSlugPageData(slug, locale);

  if (err || !data) {
    return notFound();
  }
  return <SlugPage data={data} />;
}
