import { MetadataRoute } from 'next';
import { groq } from 'next-sanity';
import { baseUrl } from '~/config';
import { getClient } from '~/lib/sanity';

import { SitemapProjection } from '~/types';

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

export const sitemapQuery = groq`
*[_type in $types && defined(slug.current) && seoNoIndex != true ]{
  "slug":slug.current,
  _updatedAt,
  _type,
  _id
}`;


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const client = getClient();

  const slugPages = await client.fetch<SitemapProjection[]>(sitemapQuery, {
    types: ['page', 'mainPage', 'blog', 'blogIndex'],
  });

  const slugPagesSitemap = formatToSitemap([...slugPages], {
    changeFrequency: 'weekly',
    priority: 1,
  });

  return [...slugPagesSitemap];
}
