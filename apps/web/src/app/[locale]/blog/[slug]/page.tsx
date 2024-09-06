import { notFound } from 'next/navigation';
import { BlogSlugPage } from '~/components/pages/blog-page';
import { getBlogPageData } from '~/components/pages/blog-page/blog-page-api';
import type { PageParams } from '~/types';

export default async function SlugPage({
  params,
}: PageParams<{ slug: string }>) {
  const [data, err] = await getBlogPageData(params.slug, params.locale);
  if (!data || err) return notFound();
  return <BlogSlugPage data={data} />;
}
