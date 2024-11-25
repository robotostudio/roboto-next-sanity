import type { MetadataRoute } from 'next';
import { baseUrl } from '~/config';
import { handleErrors } from '~/lib/helper';
import { client } from '~/lib/sanity/client';
import { sitemapQuery } from '~/lib/sanity/queries';

type SitemapProjection = {
  _updatedAt: string;
  slug: string;
};

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
    client.fetch<SitemapProjection[]>(sitemapQuery, {
      types: ['page', 'mainPage', 'blog', 'blogIndex'],
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
