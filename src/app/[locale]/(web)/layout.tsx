'use client';

import { ReactElement } from 'react';
import XHeader from './_shared/XHeader';
import XSideBar from './_shared/XSideBar';
import XFooter from './_shared/XFooter';
import CommonProvider from '@/lib/providers/CommonProvider';

import '@/assets/global.scss';

type Props = {
  children: ReactElement;
};

export default function RootLayout({ children }: Props) {
  return (
    <CommonProvider>
      <div className="flex h-full w-full bg-gray-200">
        <XSideBar />
        <div className="flex h-full w-full flex-1 flex-col">
          <XHeader />
          <div className="flex flex-1 flex-col overflow-y-auto">
            <main className="mx-auto w-full max-w-5xl flex-1 overflow-hidden p-2">{children}</main>
            <XFooter />
          </div>
        </div>
      </div>
    </CommonProvider>
  );
}
