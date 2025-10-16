import { getRequest, postRequest } from '@/lib/request';
import { User } from '@/lib/types';
import { LINKS } from '@/lib/constant';
import { NextRequest } from 'next/server';

export async function GET() {
  try {
    const me = await getRequest<User>(LINKS.REST_API.USER.ME);

    return Response.json(me);
  } catch (error: any) {
    return Response.json({ status: false, ...error });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const me = await postRequest<User>(LINKS.REST_API.USER.ME, { data });

    return Response.json(me);
  } catch (error: any) {
    return Response.json({ status: false, ...error });
  }
}
