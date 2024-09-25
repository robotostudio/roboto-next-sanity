import type { SanityImageSource } from '@sanity/asset-utils';
import createImageUrlBuilder from '@sanity/image-url';
import { createClient } from 'next-sanity';
import { isProd } from '~/config';

export const sanityConfig = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
  apiVersion: '2022-11-15',
  useCdn: isProd,
};


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
