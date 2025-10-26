import { cookies } from 'next/headers';
import { getRequest } from '@/lib/request';
import { LINKS, STATIC_KEYS } from '@/lib/constant';

export async function GET() {
  const cookieStorage = await cookies();
  cookieStorage.delete(STATIC_KEYS.TOKEN);

  await getRequest<boolean>(LINKS.REST_API.AUTH.LOGOUT);
  return Response.json({ status: true });
}
