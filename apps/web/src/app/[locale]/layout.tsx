import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { VisualEditing, } from 'next-sanity';
import { revalidatePath, revalidateTag } from 'next/cache';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { preconnect, prefetchDNS } from 'react-dom';
import { Footer } from '~/components/global/footer';
import { Navbar } from '~/components/global/navbar';
import { PreviewBar } from '~/components/global/preview-bar';
import { locales } from '~/config';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const metadata = {
  title: {
    template: '%s | Roboto Studio',
    default: 'Roboto Studio',
  },
};

export default async function LocaleLayout(props: Props) {
  const params = await props.params;

  const {
    locale
  } = params;

  const {
    children
  } = props;

  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) return notFound();
  setRequestLocale(locale);

  preconnect('https://cdn.sanity.io');
  prefetchDNS('https://cdn.sanity.io');

  return (
    (<html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale}>
          <Navbar />
          {(await draftMode()).isEnabled ? (
            <>
              {children}
              <PreviewBar />
              <VisualEditing
                refresh={async (payload) => {
                  'use server';
                  if (payload.source === 'manual') {
                    revalidatePath('/', 'layout');
                    return;
                  }
                  const tags = [
                    payload?.document?.slug?.current,
                    payload?.document?._id?.startsWith('drafts.')
                      ? payload?.document?._id.slice(7)
                      : payload?.document?._id,
                    payload?.document?._type,
                  ];
                  for (const tag of tags) {
                    if (tag) revalidateTag(tag);
                  }
                }}
              />
            </>
          ) : (
            children
          )}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>)
  );
}
