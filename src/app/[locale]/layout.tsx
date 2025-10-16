import { ReactElement } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import StoreProvider from '@/lib/providers/StoreProvider';
import { store } from '@/lib/store';

import { cookies } from 'next/headers';
import { STATIC_KEYS } from '@/lib/constant';
import { getMe } from '@/lib/services/auth.service';

import './globals.scss';
import { User } from '@/lib/types';

type Props = {
  children: ReactElement;
};

export default async function RootLayout({ children }: Props) {
  const messages = await getMessages();

  const isLogged = !!store.getState().user?.user;

  const cookieStorage = await cookies();
  const hasToken = cookieStorage.has(STATIC_KEYS.TOKEN);
  let user: User | undefined;
  if (hasToken && !isLogged) {
    user = await getMe();
  }

  return (
    <html className="h-full">
      <body className="h-full">
        <AppRouterCacheProvider>
          <NextIntlClientProvider messages={messages}>
            <StoreProvider initialUser={user}>{children}</StoreProvider>
          </NextIntlClientProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
