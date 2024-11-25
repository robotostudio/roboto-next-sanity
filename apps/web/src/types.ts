import type { Button, Form, Page } from './sanity.types';

export type Maybe<T> = T | null | undefined;

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type PartialResponse<T> = Prettify<Partial<T>>;

export type PageComponentProps<T> = {
  data: PartialResponse<T>;
};

export type ProcessedUrl = {
  openInNewTab?: Maybe<boolean>;
  href?: Maybe<string>;
};

export type SanityButtonProps = {
  _key: string;
  buttonText?: string;
  icon?: Maybe<{ svg?: Maybe<string> }>;
  variant?: Button['variant'];
  url?: Maybe<ProcessedUrl>;
};

export type SanityImageAsset = NonNullable<Page['image']>;

export type ProcessPageBuilderAddButtons<T> = T extends { buttons?: unknown }
  ? Omit<T, 'buttons'> & { buttons?: SanityButtonProps[] }
  : T;

export type ProcessPageBuilderAddForm<T> = T extends { form?: unknown }
  ? Omit<T, 'form'> & { form?: Form }
  : T;

export type ProcessPageBuilderBlock<T> = ProcessPageBuilderAddButtons<
  ProcessPageBuilderAddForm<T>
>;
