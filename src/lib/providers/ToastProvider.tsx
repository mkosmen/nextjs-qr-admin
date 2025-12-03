'use client';

import Toast from '@/components/Toast';
import { useState, createContext } from 'react';

export const ToastContext = createContext<{
  showToast: (message: string) => any;
} | null>(null);

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toastMessage, setToastMessage] = useState('');
  const [toastOpenStatus, setToastOpenStatus] = useState(false);

  function showToast(message: string) {
    setToastMessage(message);
    setToastOpenStatus(true);
  }

  function onCloseToast() {
    setToastMessage('');
    setToastOpenStatus(false);
  }

  return (
    <ToastContext
      value={{
        showToast,
      }}
    >
      {children}

      <Toast open={toastOpenStatus} message={toastMessage} onClose={onCloseToast} />
    </ToastContext>
  );
}
