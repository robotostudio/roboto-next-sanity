import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getAllBlogsPaths,
  getBlogPageData,
} from '~/components/pages/blog-page/blog-page-api';
import { BlogSlugPage } from '~/components/pages/blog-page/blog-page-component';
import type { Locale } from '~/config';
import { getLocalizedSlug } from '~/lib/helper';
import { getMetaData } from '~/lib/seo';

type PageParams = {
  params: Promise<{
    slug: string;
    locale: Locale;
  }>;
};

// Generate static paths for all blog posts at build time
export const generateStaticParams = async () => {
  return await getAllBlogsPaths();
};

// Helper function to fetch and validate blog data
async function getBlogData(params: Awaited<PageParams['params']>) {
  const { slug, locale } = params;
  const localizedSlug = getLocalizedSlug({ slug, locale, prefix: 'blog' });
  const [result, err] = await getBlogPageData(localizedSlug, locale);

  if (!result?.data || err) {
    return null;
  }

  return result.data;
}

// Generate metadata for SEO
export const generateMetadata = async ({
  params,
}: PageParams): Promise<Metadata> => {
  const resolvedParams = await params;
  const data = await getBlogData(resolvedParams);

  if (!data) {
    return {};
  }

  return getMetaData(data);
};

// Main blog post page component
export default async function BlogSlug({ params }: PageParams) {
  const resolvedParams = await params;
  const data = await getBlogData(resolvedParams);

  if (!data) {
    notFound();
  }

  return <BlogSlugPage data={data} />;
}
