import { Loader2 } from 'lucide-react';
import { NextIntlClientProvider } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { preconnect, prefetchDNS } from 'react-dom';
import { Footer } from '~/components/global/footer';
import { MarketingModalProvider } from '~/components/global/marketing-modal-provider';
import { Navbar } from '~/components/global/navbar';
import { PreviewBar } from '~/components/global/preview-bar';
import { locales } from '~/config';
import { token } from '~/lib/sanity/sanity-server-fetch';

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

const PreviewProvider = dynamic(
  () => import('~/components/global/preview-provider'),
);

export const metadata = {
  title: {
    template: '%s | Roboto Studio',
    default: 'Roboto Studio',
  },
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) return notFound();
  unstable_setRequestLocale(locale);

  preconnect('https://cdn.sanity.io');
  prefetchDNS('https://cdn.sanity.io');

  const { isEnabled } = draftMode();
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale}>
          <Navbar />
          {isEnabled ? (
            <PreviewProvider token={token}>{children}</PreviewProvider>
          ) : (
            children
          )}
          {isEnabled && <PreviewBar />}
          <Suspense
            fallback={
              <div className="mx-auto max-w-7xl overflow-hidden bg-primary px-6 py-20 sm:py-24 lg:px-8">
                <div className="flex h-full w-full items-center justify-center gap-2  text-slate-200">
                  <Loader2 className="animate-spin " />
                  Loading footer
                </div>
              </div>
            }
          >
            <Footer />
          </Suspense>
          <MarketingModalProvider />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
