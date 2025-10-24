import { putRequest } from '@/lib/request';
import { User } from '@/lib/types';
import { LINKS } from '@/lib/constant';
import { NextRequest } from 'next/server';

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    await putRequest<User>(LINKS.REST_API.USER.PASSWORD.RESET, { data });

    return Response.json({ status: true });
  } catch (error: any) {
    return Response.json({ status: false, ...error });
  }
}
