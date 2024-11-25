/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from 'next';
import { baseUrl, ogImageDimensions } from '~/config';

interface OgImageOptions {
  type?: string;
  id?: string;
}

export const getPageUrl = (slug = ''): string => `${baseUrl}${slug}`;

const getOgImage = ({ type, id }: OgImageOptions = {}): string => {
  const params = new URLSearchParams();
  if (id) params.set('id', id);
  if (type) params.set('type', type);
  return `api/og?${params.toString()}`;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
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
    title: seoTitle ?? title ?? '',
    description: seoDescription ?? description ?? '',
  };

  const ogImage = getOgImage({
    type: _type,
    id: _id,
  });
  console.log('🚀 ~ getMetaData ~ ogImage:', ogImage, _id);

  const ogImageUrl = seoImage ? ogImage : getPageUrl(`/${ogImage}`);

  return {
    title: meta.title,
    description: meta.description,
    metadataBase: new URL(baseUrl),
    creator: 'Roboto Studio Demo',
    authors: [
      {
        name: 'Roboto',
      },
    ],
    openGraph: {
      type: 'website',
      countryName: 'UK',
      description: meta.description,
      title: meta.title,
      images: [
        {
          url: ogImage,
          width: ogImageDimensions.width,
          height: ogImageDimensions.height,
          alt: meta.title,
          secureUrl: ogImageUrl,
        },
      ],
      url: getPageUrl(slug?.current),
    },
  };
};
