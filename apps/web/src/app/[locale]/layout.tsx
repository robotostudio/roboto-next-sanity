import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import FooterComponent, {
  FooterSkeleton,
} from '~/components/layout/footer/footer-component';
import { NavbarSkeleton } from '~/components/layout/navbar/navbar-client';
import NavbarComponent from '~/components/layout/navbar/navbar-component';
import type { Locale } from '~/config';
import { routing } from '~/i18n/routing';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <Suspense fallback={<NavbarSkeleton />}>
            <NavbarComponent />
          </Suspense>

          {children}

          <Suspense fallback={<FooterSkeleton />}>
            <FooterComponent />
          </Suspense>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
