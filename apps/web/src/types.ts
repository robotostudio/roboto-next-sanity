import type { Locale } from './config';
import type { Page, Form, Button } from './sanity.types';

export type PreviewProps<T> = {
  initialData: T;
  query: string;
  preview?: boolean;
  queryParams: Record<string, unknown>;
};

export type PageParams<T = Record<string, string>> = {
  params: T & { locale: Locale };
  searchParams: { [key: string]: string | string[] | undefined };
};

export type Prettify<T> = {
  [K in keyof T]: T[K];
  // eslint-disable-next-line @typescript-eslint/ban-types
} & {};

export type PartialResponse<T> = Prettify<Partial<T>>;

export type PageComponentProps<T> = {
  data: PartialResponse<T>;
  preview?: boolean;
};

export type ProcessedUrl = {
  openInNewTab?: Maybe<boolean>;
  href?: Maybe<string>;
};

export type SanityButton = {
  _key: string;
  buttonText?: string;
  icon?: Maybe<{ svg?: Maybe<string> }>;
  variant?: Button['variant'];
  url?: Maybe<ProcessedUrl>;
};

export type SanityButtons = Array<SanityButton>;

export type SanityImage = NonNullable<Page['image']>;

export type SitemapProjection = {
  _updatedAt: string;
  slug: string;
};

export type ProcessPageBuilderAddButtons<T> = T extends { buttons?: unknown }
  ? Omit<T, 'buttons'> & { buttons?: SanityButtons }
  : // eslint-disable-next-line @typescript-eslint/ban-types
    T;

export type ProcessPageBuilderAddForm<T> = T extends { form?: unknown }
  ? Omit<T, 'form'> & { form?: Form }
  : // eslint-disable-next-line @typescript-eslint/ban-types
    T;

export type ProcessPageBuilderBlock<T> = ProcessPageBuilderAddButtons<
  ProcessPageBuilderAddForm<T>
>;

export type Maybe<T> = T | null | undefined;
