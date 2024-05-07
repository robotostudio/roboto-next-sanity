'use client';

import dynamic from 'next/dynamic';

export const BlogSlugPageClient = dynamic(() =>
  import('./blog-page-component').then((mod) => mod.BlogSlugPage),
);
