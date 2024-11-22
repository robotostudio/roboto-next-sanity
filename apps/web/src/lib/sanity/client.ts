import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId, studioUrl } from './api';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
  stega: {
    studioUrl,
  },
});
