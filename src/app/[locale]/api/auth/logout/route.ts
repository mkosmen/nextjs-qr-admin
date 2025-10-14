import { cookies } from 'next/headers';
import { getRequest } from '@/lib/request';
import { STATIC_KEYS } from '@/lib/constant';

export async function GET() {
  try {
    const result = await getRequest<boolean>('/auth/signout');
    console.log('result', result);

    if (!result) {
      throw new Error();
    }

    const cookieStorage = await cookies();
    cookieStorage.delete(STATIC_KEYS.TOKEN);

    return Response.json(true);
  } catch {
    return Response.json(false);
  }
}
