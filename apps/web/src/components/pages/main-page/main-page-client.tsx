'use client';
import dynamic from 'next/dynamic';

export const MainPageComponentClient = dynamic(() =>
  import('./main-page-component').then((mod) => mod.MainPageComponent),
);
