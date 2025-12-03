import { cookies } from 'next/headers';
import { STATIC_KEYS } from '../constant';

export async function getToken() {
  return (await cookies()).get(STATIC_KEYS.TOKEN)?.value;
}

export async function setToken(token: string) {
  (await cookies()).set(STATIC_KEYS.TOKEN, token, { httpOnly: true, maxAge: 60 * 60 });
}

export async function removeToken() {
  (await cookies()).delete(STATIC_KEYS.TOKEN);
}
