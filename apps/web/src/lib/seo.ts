import { Metadata } from 'next';
import { baseUrl, ogImageDimensions, webConfig } from '~/config';

export const getPageUrl = (slug?: string) => `${baseUrl}${slug ?? ''}`;

const getOgImage = (options?: { title?: string; type: string; id: string }) => {
  const { title, type, id } = options ?? {};

  const params = new URLSearchParams({});
  if (id) params.set('id', id);
  if (title) params.set('title', title);
  if (type) params.set('type', type);

  return 'api/og?' + params.toString();
};

export const getMetaData = (data: any): Metadata => {
  const {
    _type,
    seoDescription,
    seoImage,
    seoTitle,
    slug,
    image,
    title,
    description,
    icon,
    _id,
  } = data;
  console.log('🚀 ~ getMetaData ~ data:', data);

  const meta = {
    seoTitle: seoTitle ?? title ?? '',
    seoDescription: seoDescription ?? description ?? '',
  };

  const ogImage = getOgImage({
    title: meta.seoTitle,
    type: _type,
    id: _id,
  });

  const metadata: Metadata = {
    title: meta.seoTitle,
    description: meta.seoDescription,
    metadataBase: new URL(webConfig.root),
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
