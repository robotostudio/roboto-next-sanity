import {
  getPageType,
  getSlugPageData,
} from '~/components/pages/slug-page/slug-page-api';
import { SlugPage } from '~/components/pages/slug-page/slug-page-component';
import type { Locale } from '~/config';
import { getLocalizedSlug } from '~/lib/helper';

type Props = {
  params: Promise<{
    locale: Locale;
    rest: string[];
  }>;
};

async function RenderPageType({
  localizedSlug,
  locale,
}: {
  localizedSlug: string;
  locale: Locale;
}) {
  console.log('🚀 ~ localizedSlug:', localizedSlug);
  const [response, err] = await getSlugPageData(localizedSlug, locale);
  if (err || !response?.data) {
    return <div>Error: {err}</div>;
  }
  return <SlugPage data={response.data} />;
}

export default async function DynamicSlug({ params }: Props) {
  const { locale, rest } = await params;
  const slug = rest.join('/');

  const localizedSlug = getLocalizedSlug({ slug, locale });
  const [response, err] = await getPageType(localizedSlug);
  if (err || !response) {
    return <div>Error: {err}</div>;
  }
  const pageType = response.data;

  switch (pageType) {
    case 'page':
      return <RenderPageType localizedSlug={localizedSlug} locale={locale} />;
    default:
      return <div>Page not found</div>;
  }
}
