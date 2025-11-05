import { STATIC_KEYS } from '@/lib/constant';
import { getMe } from '@/lib/services/auth.service';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStorage = await cookies();
  try {
    const user = await getMe();

    return Response.json(user);
  } catch (error: any) {
    console.log('verify hatası');
    cookieStorage.delete(STATIC_KEYS.TOKEN);
    const r = cookieStorage.get(STATIC_KEYS.TOKEN);
    console.log('r', r);

    return Response.json(null, { status: 401 });
  }
}
