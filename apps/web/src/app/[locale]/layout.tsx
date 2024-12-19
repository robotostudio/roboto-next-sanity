import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { VisualEditing } from 'next-sanity';
import { revalidatePath, revalidateTag } from 'next/cache';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { preconnect, prefetchDNS } from 'react-dom';
import { PreviewBar } from '~/components/global/preview-bar';
import FooterComponent, {
  FooterSkeleton,
} from '~/components/layout/footer/footer-component';
import { NavbarSkeleton } from '~/components/layout/navbar/navbar-client';
import NavbarComponent from '~/components/layout/navbar/navbar-component';
import type { Locale } from '~/config';
import { routing } from '~/i18n/routing';
import { SanityLive } from '~/lib/sanity/live';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  console.log('🚀 ~ locale:', locale);
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  console.log('🚀 ~ routing:', routing.locales);

  setRequestLocale(locale);

  preconnect('https://cdn.sanity.io');
  prefetchDNS('https://cdn.sanity.io');

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <Suspense fallback={<NavbarSkeleton />}>
            <NavbarComponent />
          </Suspense>
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
          <Suspense fallback={<FooterSkeleton />}>
            <FooterComponent />
          </Suspense>
          <SanityLive />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
