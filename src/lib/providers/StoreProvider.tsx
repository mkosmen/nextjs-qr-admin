'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { store, AppStore } from '@/lib/store';
import { User } from '../types';
import { setUser } from '../store/reducers/usersReducer';

export default function StoreProvider({
  initialUser,
  children,
}: {
  initialUser?: User;
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = store;
  }

  if (initialUser) {
    store.dispatch(setUser(initialUser));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
