import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { postRequest } from '@/lib/request';
import { SigInResponse } from '@/lib/types';
import { STATIC_KEYS } from '@/lib/constant';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const result = await postRequest<SigInResponse>('/auth/signin', { data });

    if (!result.token) {
      throw new Error();
    }

    const cookieStorage = await cookies();
    cookieStorage.set(STATIC_KEYS.TOKEN, result.token);

    return Response.json({ status: true });
  } catch (err: any) {
    return Response.json(err);
  }
}
