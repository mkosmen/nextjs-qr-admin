import { ReactElement } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

import './globals.scss';

type Props = {
  children: ReactElement;
};

export default function RootLayout({ children }: Props) {
  return (
    <html>
      <body>
        <AppRouterCacheProvider>
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
