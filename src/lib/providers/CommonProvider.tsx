'use client';

import PasswordVerifyDialog from '@/components/PasswordVerifyDialog';
import { useState, createContext } from 'react';

export const CommonContext = createContext<{
  setVerifyPasswordDialogStatus: (status: boolean) => any;
  onCompleteHandler: (status: boolean) => void;
} | null>(null);

export default function CommonProvider({ children }: { children: React.ReactNode }) {
  const [verifyPasswordDialogStatus, setVerifyPasswordDialogStatus] = useState<boolean>(false);

  function onCompleteHandler() {}

  return (
    <CommonContext.Provider
      value={{
        setVerifyPasswordDialogStatus,
        onCompleteHandler,
      }}
    >
      {children}

      <PasswordVerifyDialog
        open={verifyPasswordDialogStatus}
        onClose={setVerifyPasswordDialogStatus}
        onComplete={onCompleteHandler}
      />
    </CommonContext.Provider>
  );
}
