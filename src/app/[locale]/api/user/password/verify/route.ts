import { postRequest } from '@/lib/request';
import { User } from '@/lib/types';
import { LINKS } from '@/lib/constant';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    await postRequest<User>(LINKS.REST_API.USER.PASSWORD.VERIFY, { data });

    return Response.json({ status: true });
  } catch (error: any) {
    return Response.json({ status: false, ...error });
  }
}
