import {
  getAllSlugPagePaths,
  getPageType,
  getSlugPageData,
} from '~/components/pages/slug-page/slug-page-api';
import { SlugPage } from '~/components/pages/slug-page/slug-page-component';
import type { Locale } from '~/config';
import { getLocalizedSlug } from '~/lib/helper';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getMetaData } from '~/lib/seo';

interface PageParams {
  locale: Locale;
  rest: string[];
}

interface Props {
  params: Promise<PageParams>;
}

interface RenderPageTypeProps {
  localizedSlug: string;
  locale: Locale;
}

export const generateStaticParams = async () => {
  const slugPaths = await getAllSlugPagePaths();

  return slugPaths;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { locale, rest } = await params;
  const slug = rest.join('/');
  const localizedSlug = getLocalizedSlug({ slug, locale });
  const [data, err] = await getSlugPageData(localizedSlug, locale);
  if (err || !data?.data) return {};
  return getMetaData(data.data);
};

async function RenderPageType({ localizedSlug, locale }: RenderPageTypeProps) {
  const [response, error] = await getSlugPageData(localizedSlug, locale);

  if (error || !response?.data) {
    notFound();
  }

  return <SlugPage data={response.data} />;
}

export default async function DynamicSlug({ params }: Props) {
  const { locale, rest } = await params;
  const slug = rest.join('/');
  const localizedSlug = getLocalizedSlug({ slug, locale });

  const [pageTypeResponse, pageTypeError] = await getPageType(localizedSlug);


  if (pageTypeError || !pageTypeResponse) {
    notFound();
  }

  const pageType = pageTypeResponse.data;

  if (!pageType) {
    notFound();
  }

  // Handle different page types
  switch (pageType) {
    case 'page':
      return <RenderPageType localizedSlug={localizedSlug} locale={locale} />;
    // Add additional page type cases here as they become available
    // case 'blog':
    //   return <BlogPage localizedSlug={localizedSlug} locale={locale} />;
    // case 'product':
    //   return <ProductPage localizedSlug={localizedSlug} locale={locale} />;
    default:
      notFound();
  }
}
