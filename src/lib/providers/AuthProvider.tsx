'use client';

import { useState, createContext, useEffect } from 'react';
import { verify } from '@/server/auth';
import { useAppDispatch } from '../store/hooks';
import { setUser } from '../store/reducers/usersReducer';

export const AuthContext = createContext(null);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    verify()
      .then((d) => {
        dispatch(setUser(d));
      })
      .catch((error: any) => {
        console.log('HATA VAR', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
}
