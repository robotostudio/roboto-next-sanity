import type { Locale } from '~/config';

export async function handleErrors<T>(
  promise: Promise<T>,
): Promise<[T | undefined, unknown]> {
  try {
    const data = await promise;
    return [data, null];
  } catch (err) {
    if (err instanceof Error) {
      console.log('errr', err.name, err.message);
    } else {
      console.log('eror', JSON.stringify(err));
    }

    return [undefined, err];
  }
}

export const extractFormData = (data: FormData) => {
  const raw: Record<string, unknown> = {};
  data.forEach((val, key) => {
    if (!key.startsWith('$')) {
      raw[key] = val;
    }
  });
  return raw;
};

export const getLocalizedSlug = (
  slug: string,
  locale: Locale,
  prefix?: string,
): string => {
  const segments = locale === 'en-GB' ? [prefix, slug] : [locale, prefix, slug];
  return `/${segments.filter(Boolean).join('/')}`;
};

export const getTitleCase = (name: string) => {
  const titleTemp = name.replace(/([A-Z])/g, ' $1');
  return titleTemp.charAt(0).toUpperCase() + titleTemp.slice(1);
};
