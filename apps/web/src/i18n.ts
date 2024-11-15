import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  return {
    // messages: (await import(`./messages/${locale}.json`)).default,
  };
});
