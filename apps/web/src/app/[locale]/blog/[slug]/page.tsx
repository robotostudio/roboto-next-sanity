import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogSlugPage } from '~/components/pages/blog-page';
import {
  getAllBlogsPaths,
  getBlogPageData,
} from '~/components/pages/blog-page/blog-page-api';
import { getMetaData } from '~/lib/seo';
import type { PageParams } from '~/types';

export const generateStaticParams = async () => {
  const blogs = await getAllBlogsPaths();
  return blogs;
};

export const generateMetadata = async ({
  params,
}: PageParams<{ slug: string }>): Promise<Metadata> => {
  const [data, err] = await getBlogPageData(params.slug, params.locale);
  if (!data || err) return {};
  return getMetaData(data);
};

export default async function BlogPage({
  params,
}: PageParams<{ slug: string }>) {
  const [data, err] = await getBlogPageData(params.slug, params.locale);
  if (!data || err) return notFound();
  return <BlogSlugPage data={data} />;
}
