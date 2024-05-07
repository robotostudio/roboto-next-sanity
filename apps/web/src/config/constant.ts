export const ogImageDimensions = {
  width: 1200,
  height: 630,
};

export const locales = ['en-GB', 'fr', 'de'] as const;

export const DEFAULT_LOCALE = 'en-GB';
export type Locale = (typeof locales)[number];


export const SANITY_TAGS = {
  mainPage: 'main-page',
  blogPage: 'blog-page',
  blogs: 'blogs',
  blogIndex: 'blog-index',
  slugPage: 'slug-page',
  footer: 'footer',
  navbar: 'navbar',
} as const;

export const LOCALIZED_SANITY_TAGS = {
  mainPage: (locale: Locale) => `${SANITY_TAGS.mainPage}-${locale}`,
  blogPage: (locale: Locale) => `${SANITY_TAGS.blogPage}-${locale}`,
  blogs: (locale: Locale) => `${SANITY_TAGS.blogs}-${locale}`,
  blogIndex: (locale: Locale) => `${SANITY_TAGS.blogIndex}-${locale}`,
  slugPage: (locale: Locale) => `${SANITY_TAGS.slugPage}-${locale}`,
} as const;

