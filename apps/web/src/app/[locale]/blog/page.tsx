import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogIndexPage } from '~/components/pages/blog-page';
import {
  getAllBlogIndexTranslations,
  getBlogIndexData,
} from '~/components/pages/blog-page/blog-page-api';
import { getMetaData } from '~/lib/seo';
import { PageParams } from '~/types';

export const generateStaticParams = async () => {
  const [slugs, err] = await getAllBlogIndexTranslations();
  if (err || !Array.isArray(slugs)) return [];
  const locales = slugs.filter(Boolean) as string[];
  return locales.map((locale) => ({ locale }));
};

export const generateMetadata = async ({
  params,
}: PageParams): Promise<Metadata> => {
  const [data, err] = await getBlogIndexData(params.locale);
  if (!data || err) return {};
  const { seo } = data;
  if (!seo) return {};
  return getMetaData(seo);
};

export default async function BlogPage({ params }: PageParams) {
  const [data, err] = await getBlogIndexData(params.locale);
  if (!data || err) return notFound();
  return <BlogIndexPage data={data} />;
}
