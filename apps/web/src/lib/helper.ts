import type { Locale } from '~/config';

type Response<T> = [T, undefined] | [undefined, string];

export async function handleErrors<T>(
  promise: Promise<T>,
): Promise<Response<T>> {
  try {
    const data = await promise;
    return [data, undefined];
  } catch (err) {
    return [
      undefined,
      err instanceof Error ? err.message : JSON.stringify(err),
    ];
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

export const getTitleCase = (name: string) => {
  const titleTemp = name.replace(/([A-Z])/g, ' $1');
  return titleTemp.charAt(0).toUpperCase() + titleTemp.slice(1);
};

export function getLocalizedSlug({
  slug,
  locale,
  prefix,
}: {
  slug: string;
  locale: Locale;
  prefix?: string;
}) {
  const segments = locale === 'en-GB' ? [prefix, slug] : [locale, prefix, slug];
  return `/${segments.filter(Boolean).join('/')}`;
}
