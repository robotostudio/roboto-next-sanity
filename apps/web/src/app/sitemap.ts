import type { MetadataRoute } from 'next';
import { baseUrl } from '~/config';
import { handleErrors } from '~/lib/helper';
import { sitemapQuery } from '~/lib/sanity/query';
import { sanityServerFetch } from '~/lib/sanity/sanity-server-fetch';

import type { SitemapProjection } from '~/types';

type SiteMap = Pick<
  MetadataRoute.Sitemap[number],
  'changeFrequency' | 'priority'
>;



const formatToSitemap = (
  data: SitemapProjection[],
  options: SiteMap,
): MetadataRoute.Sitemap => {
  return data.map(({ _updatedAt, slug }) => ({
    url: `${baseUrl}/${slug.split('/').filter(Boolean).join('/')}`,
    lastModified: new Date(_updatedAt),
    ...options,
  }));
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [slugPages] = await handleErrors(
    sanityServerFetch<SitemapProjection[]>({
      query: sitemapQuery,
      params: {
        types: ['page', 'mainPage', 'blog', 'blogIndex'],
      },
    }),
  );
  if (!slugPages) {
    return [];
  }

  const slugPagesSitemap = formatToSitemap([...slugPages], {
    changeFrequency: 'weekly',
    priority: 1,
  });

  return [...slugPagesSitemap];
}
