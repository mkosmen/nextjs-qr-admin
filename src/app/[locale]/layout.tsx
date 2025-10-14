'use server';

import { ReactElement } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

import './globals.scss';

type Props = {
  children: ReactElement;
};

export default async function RootLayout({ children }: Props) {
  const messages = await getMessages();
  return (
    <html className="h-full">
      <body className="h-full">
        <AppRouterCacheProvider>
          <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
