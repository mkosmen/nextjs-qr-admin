import { ReactElement } from 'react';
import LocalizerDropdown from './_shared/LocalizerDropdown';

import '@/app/globals.scss';

type Props = {
  children: ReactElement;
};

export default async function RootLayout({ children }: Props) {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-xs">
        <div className="flex justify-end">
          <LocalizerDropdown />
        </div>
        {children}
      </div>
    </div>
  );
}
