'use client';

import { ReactElement } from 'react';
import XHeader from './_shared/XHeader';
import XSideBar from './_shared/XSideBar';
import XFooter from './_shared/XFooter';
import { useAppSelector } from '@/lib/store/hooks';

import '../globals.scss';

type Props = {
  children: ReactElement;
};

export default function RootLayout({ children }: Props) {
  const user = useAppSelector((s) => s.user);

  return (
    <div className="flex h-full w-full">
      <XSideBar />
      <div className="flex h-full w-full flex-1 flex-col">
        <XHeader user={user.user!} />
        <div className="flex-1 overflow-hidden">
          <main className="overflow-y-auto p-2">{children}</main>
          <XFooter />
        </div>
      </div>
    </div>
  );
}
