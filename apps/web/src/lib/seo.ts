import type { Metadata } from 'next';
import { baseUrl, ogImageDimensions } from '~/config';
  
export const getPageUrl = (slug?: string) => `${baseUrl}${slug ?? ''}`;

const getOgImage = (options?: { type: string; id: string }) => {
  const { type, id } = options ?? {};

  const params = new URLSearchParams({});
  if (id) params.set('id', id);
  if (type) params.set('type', type);
  return `api/og?${params.toString()}`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getMetaData = (data: Record<string, any>): Metadata => {
  const {
    _type,
    seoDescription,
    seoImage,
    seoTitle,
    slug,
    title,
    description,
    _id,
  } = data;

  const meta = {
    seoTitle: seoTitle ?? title ?? '',
    seoDescription: seoDescription ?? description ?? '',
  };

  const ogImage = getOgImage({
    type: _type,
    id: _id,
  });

  const metadata: Metadata = {
    title: meta.seoTitle,
    description: meta.seoDescription,
    metadataBase: new URL(baseUrl),
    creator: 'Roboto Studio Demo',
    authors: {
      name: 'Roboto',
    },
    // icons: faviconImage,
    openGraph: {
      type: 'website',
      countryName: 'UK',
      description: meta.seoDescription,
      title: meta.seoTitle,
      images: [
        {
          url: ogImage,
          width: ogImageDimensions.width,
          height: ogImageDimensions.height,
          alt: meta.seoTitle,
          secureUrl: seoImage ? ogImage : getPageUrl(`/${ogImage}`),
        },
      ],
      url: getPageUrl(slug?.current),
    },
  };

  return metadata;
};
