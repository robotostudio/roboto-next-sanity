import type { SanityImageSource } from '@sanity/asset-utils';
import createImageUrlBuilder from '@sanity/image-url';
import { createClient } from 'next-sanity';

export const sanityConfig = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
  apiVersion: '2021-06-09',
  useCdn: process.env.NODE_ENV === 'production',
};


export const scriptClient = createClient({
  ...sanityConfig,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  perspective: 'published',
});

const imageBuilder = createImageUrlBuilder({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
});

export const urlFor = (source: SanityImageSource) =>
  imageBuilder.image(source).auto('format').fit('max').format('webp');

export const client = createClient({
  ...sanityConfig,
  perspective: 'published',
});
