'use client';

import { useSearchParams } from 'next/navigation';
import { ComponentProps, FC } from 'react';

export type SearchParamsTextProps = {
  param?: string;
  fallback?: string;
} & ComponentProps<'span'>;

export const SearchParamsText: FC<SearchParamsTextProps> = ({
  param,
  fallback,
  ...rest
}) => {
  const search = useSearchParams();
  const text = param ? search.get(param) ?? fallback : fallback;
  return <span {...rest}>{text}</span>;
};
