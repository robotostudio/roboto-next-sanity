import { SanityImageSource } from '@sanity/asset-utils';
import createImageUrlBuilder from '@sanity/image-url';
import { createClient } from 'next-sanity';

import { isProd } from '~/config';

export const sanityConfig = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
  apiVersion: '2021-06-09',
  useCdn: isProd,
};

const sanityClient = createClient({
  ...sanityConfig,
  perspective: 'published',
});

const previewClient = createClient({
  ...sanityConfig,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  perspective: 'previewDrafts',
});

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

export const getClient = (preview?: boolean) =>
  preview ? previewClient : sanityClient;

export const urlFor = (source: SanityImageSource) =>
  imageBuilder.image(source).auto('format').fit('max').format('webp');


  export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2022-11-15',
    useCdn: false,
    perspective: 'published',
  });