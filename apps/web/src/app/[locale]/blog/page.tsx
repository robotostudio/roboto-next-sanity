import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogIndexData } from '~/components/pages/blog-page/blog-page-api';
import { getAllBlogIndexTranslations } from '~/components/pages/blog-page/blog-page-api';
import { BlogIndexPage } from '~/components/pages/blog-page/blog-page-component';
// import { BlogIndexPage } from "~/components/pages/blog-page";

import type { Locale } from '~/config';
import { getMetaData } from '~/lib/seo';

type PageParams = {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const generateStaticParams = async () => {
  const [slugs, err] = await getAllBlogIndexTranslations();
  if (err || !Array.isArray(slugs)) return [];
  const locales = slugs.filter(Boolean) as string[];
  console.log('🚀 ~ generateStaticParams ~ locales:', locales);
  return locales.map((locale) => ({ locale }));
};

export const generateMetadata = async ({
  params,
}: PageParams): Promise<Metadata> => {
  const { locale } = await params;
  const [result, err] = await getBlogIndexData(locale);
  if (!result?.data || err) return {};
  const { seo } = result.data;
  if (!seo) return {};
  return getMetaData(seo);
};

export default async function BlogPage({ params }: PageParams) {
  const { locale } = await params;
  const [result, err] = await getBlogIndexData(locale);
  if (!result?.data || err) return notFound();
  return <BlogIndexPage data={result.data} />;
}
