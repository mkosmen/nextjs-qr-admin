import { cookies } from 'next/headers';
import { getRequest } from '@/lib/request';
import { LINKS, STATIC_KEYS } from '@/lib/constant';

export async function GET() {
  try {
    await getRequest<boolean>(LINKS.REST_API.AUTH.LOGOUT);
  } finally {
    const cookieStorage = await cookies();
    cookieStorage.delete(STATIC_KEYS.TOKEN);
    return Response.json(true);
  }
}
