import { ReactElement } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import StoreProvider from '@/lib/providers/StoreProvider';
import { store } from '@/lib/store';
import { cookies } from 'next/headers';
import { LINKS, STATIC_KEYS } from '@/lib/constant';
import { getMe } from '@/lib/services/auth.service';
import { User } from '@/lib/types';
import { redirect } from '@/i18n/navigation';
import { getLocale } from 'next-intl/server';

import './globals.scss';

type Props = {
  children: ReactElement;
};

export default async function RootLayout({ children }: Props) {
  let user: User | undefined;

  const locale = await getLocale();
  const messages = await getMessages();
  const cookieStorage = await cookies();
  const isLogged = !!store.getState().user?.user;
  const hasToken = cookieStorage.has(STATIC_KEYS.TOKEN);
  if (hasToken && !isLogged) {
    try {
      user = await getMe();
    } catch {
      redirect({ href: LINKS.WEB.LOGIN, locale });
    }
  }

  return (
    <html className="h-full" lang={locale}>
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
