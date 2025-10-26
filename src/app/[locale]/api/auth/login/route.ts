import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { postRequest } from '@/lib/request';
import { SigInResponse } from '@/lib/types';
import { LINKS, STATIC_KEYS } from '@/lib/constant';

export async function POST(req: NextRequest) {
  const cookieStorage = await cookies();

  cookieStorage.delete(STATIC_KEYS.TOKEN);

  const data = await req.json();
  const result = await postRequest<SigInResponse>(LINKS.REST_API.AUTH.LOGIN, { data });

  cookieStorage.set(STATIC_KEYS.TOKEN, result.token!);

  return Response.json({ status: true });
}
