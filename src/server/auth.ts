'use server';

import { STATIC_KEYS } from '@/lib/constant';
import { getMe } from '@/lib/services/auth.service';
import { User } from '@/lib/types';
import { cookies } from 'next/headers';

export async function verify() {
  let user: User | undefined;
  const cookieStorage = await cookies();

  try {
    const token = cookieStorage.get(STATIC_KEYS.TOKEN);
    if (token) {
      user = await getMe();

      if (!user) {
        cookieStorage.delete(STATIC_KEYS.TOKEN);
      }
    }
  } catch {
    cookieStorage.delete(STATIC_KEYS.TOKEN);
  }

  return user;
}
