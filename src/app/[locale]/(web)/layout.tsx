'use client';

import { ReactElement } from 'react';
import XHeader from './_shared/XHeader';
import XBody from './_shared/XBody';
import XLeft from './_shared/XLeft';
import XFooter from './_shared/XFooter';
import { useAppSelector } from '@/lib/store/hooks';

import '../globals.scss';

type Props = {
  children: ReactElement;
};

export default function RootLayout({ children }: Props) {
  const user = useAppSelector((s) => s.user);

  return (
    <div className="flex h-full w-full flex-col">
      <XHeader user={user.user!} />
      <div className="flex h-full flex-1">
        <XLeft />
        <XBody>
          <div>{children}</div>
        </XBody>
        <XFooter />
      </div>
    </div>
  );
}
