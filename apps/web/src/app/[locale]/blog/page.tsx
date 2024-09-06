import { notFound } from 'next/navigation';
import { BlogIndexPage } from '~/components/pages/blog-page';
import { getBlogIndexData } from '~/components/pages/blog-page/blog-page-api';
import type { PageParams } from '~/types';

export default async function BlogPage({ params }: PageParams) {
  const [data, err] = await getBlogIndexData(params.locale);
  if (!data || err) return notFound();
  return <BlogIndexPage data={data} />;
}
