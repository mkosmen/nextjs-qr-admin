import { ReactElement } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import StoreProvider from '@/lib/providers/StoreProvider';
import ToastProvider from '@/lib/providers/ToastProvider';
import { store } from '@/lib/store';
import { cookies } from 'next/headers';
import { LINKS, STATIC_KEYS } from '@/lib/constant';
import { getMe } from '@/lib/services/auth.service';
import { User } from '@/lib/types';
import { redirect } from '@/i18n/navigation';
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
    <html className="h-full overflow-hidden" lang={locale}>
      <body className="h-full overflow-hidden">
        <AppRouterCacheProvider>
          <NextIntlClientProvider messages={messages}>
            <StoreProvider initialUser={user}>
              <ToastProvider>{children}</ToastProvider>
            </StoreProvider>
          </NextIntlClientProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
