'use client';

import { useState, createContext } from 'react';
import PasswordVerifyDialog from '@/components/PasswordVerifyDialog';

export const CommonContext = createContext<{
  toggleVerifyPasswordDialog: (status: boolean) => any;
  setIsComplete: (status: boolean) => any;
  isComplete: boolean;
} | null>(null);

export default function CommonProvider({ children }: { children: React.ReactNode }) {
  const [verifyPasswordDialogStatus, toggleVerifyPasswordDialog] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState(false);

  return (
    <CommonContext.Provider
      value={{
        toggleVerifyPasswordDialog,
        setIsComplete,
        isComplete,
      }}
    >
      {children}

      <PasswordVerifyDialog
        open={verifyPasswordDialogStatus}
        onClose={toggleVerifyPasswordDialog}
        onComplete={setIsComplete}
      />
    </CommonContext.Provider>
  );
}
