'use client';

import { useRef, ReactNode, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store, AppStore } from '@/lib/store';
import { me } from '@/lib/services/user.service';
import { setUser } from '@/lib/store/reducers/usersReducer';
import { useRouter } from '@/i18n/navigation';
import { LINKS } from '../constant';

interface Props {
  children: ReactNode;
}

export default function StoreProvider({ children }: Props) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = store;
  }
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const user = store.getState().user.user;

  useEffect(() => {
    if (!user) {
      me()
        .then((d) => {
          store.dispatch(setUser(d));
        })
        .catch(() => {
          router.push(LINKS.WEB.DASHBOARD);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [router, user]);

  if (loading) {
    return null;
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
