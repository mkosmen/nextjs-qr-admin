import { cookies } from 'next/headers';
import { getRequest } from '@/lib/request';
import { LINKS, STATIC_KEYS } from '@/lib/constant';

export async function GET() {
  const x = await getRequest<boolean>(LINKS.REST_API.AUTH.LOGOUT);
  const cookieStorage = await cookies();
  cookieStorage.delete(STATIC_KEYS.TOKEN);
  return Response.json({ status: true });
}
