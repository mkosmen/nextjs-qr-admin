import { ReactElement } from 'react';
import LocalizerDropdown from './_shared/LocalizerDropdown';
import AuthProvider from '@/lib/providers/AuthProvider';

import '@/assets/global.scss';

type Props = {
  children: ReactElement;
};

export default async function RootLayout({ children }: Props) {
  return (
    <AuthProvider>
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-100">
        <div className="w-xs">
          <div className="flex justify-end">
            <LocalizerDropdown />
          </div>
          {children}
        </div>
      </div>
    </AuthProvider>
  );
}
