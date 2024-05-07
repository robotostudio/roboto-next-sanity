'use client';
import dynamic from 'next/dynamic';

export const SlugPageClient = dynamic(() =>
  import('./slug-page-component').then((mod) => mod.SlugPage),
);
