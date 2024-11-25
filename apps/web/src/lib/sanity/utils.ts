import createImageUrlBuilder from '@sanity/image-url';
import { dataset, projectId } from './api';
import type { SanityImageSource } from '@sanity/asset-utils';

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
});

export const urlFor = (source: SanityImageSource) =>
  imageBuilder.image(source).auto('format').fit('max').format('webp');
