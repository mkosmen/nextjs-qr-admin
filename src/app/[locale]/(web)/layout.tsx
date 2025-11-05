'use client';

import { ReactElement } from 'react';
import XHeader from './_shared/XHeader';
import XSideBar from './_shared/XSideBar';
import XFooter from './_shared/XFooter';
import CommonProvider from '@/lib/providers/CommonProvider';
import AuthProvider from '@/lib/providers/AuthProvider';

import '@/assets/global.scss';

type Props = {
  children: ReactElement;
};

export default function RootLayout({ children }: Props) {
  return (
    <AuthProvider>
      <CommonProvider>
        <div className="flex h-full w-full">
          <XSideBar />
          <div className="flex h-full w-full flex-1 flex-col">
            <XHeader />
            <div className="flex flex-1 flex-col overflow-y-auto bg-gray-100">
              <main className="mx-auto w-full max-w-5xl flex-1 overflow-hidden p-2">
                {children}
              </main>
              <XFooter />
            </div>
          </div>
        </div>
      </CommonProvider>
    </AuthProvider>
  );
}
