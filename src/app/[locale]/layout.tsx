'use server';

import { ReactElement } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import ToastProvider from '@/lib/providers/ToastProvider';
import StoreProvider from '@/lib/providers/StoreProvider';
import { getLocale } from 'next-intl/server';

import '@/assets/global.scss';

export async function generateMetadata({ params }: any) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

type Props = {
  children: ReactElement;
};

export default async function RootLayout({ children }: Props) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html className="h-full overflow-hidden" lang={locale}>
      <body className="h-full overflow-hidden">
        <AppRouterCacheProvider>
          <NextIntlClientProvider messages={messages}>
            <StoreProvider>
              <ToastProvider>{children}</ToastProvider>
            </StoreProvider>
          </NextIntlClientProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
