import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '~/i18n/routing';
import type { Locale } from '~/config';
import NavbarComponent from '~/components/layout/navbar/navbar-component';
import FooterComponent from '~/components/layout/footer/footer-component';
import { Suspense } from 'react';

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

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  console.log('🚀 ~ messages:', messages, locale);

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <NavbarComponent />
          {children}
          <Suspense fallback={<div>Loading...</div>}>
            <FooterComponent />
          </Suspense>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
