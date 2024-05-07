import { Locale } from './config';
import { CarouselField, Form } from './sanity.types';

export type PreviewProps<T> = {
  initialData: T;
  query: string;
  preview?: boolean;
  queryParams: Record<string, any>;
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
  openInNewTab: boolean | null;
  href: string | null;
} | null;

export type SanityButton = {
  _key: string;
  buttonText?: string;
  icon?: { svg: string | null } | null;
  variant?: 'default' | 'outline';
  url?: ProcessedUrl;
};

export type SanityButtons = Array<SanityButton>;

export type SanityImage = NonNullable<CarouselField['image']>;

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


