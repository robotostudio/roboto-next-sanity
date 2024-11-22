import type { Button } from './sanity.types';

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
