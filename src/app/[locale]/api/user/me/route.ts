import { getRequest, putRequest } from '@/lib/request';
import { User } from '@/lib/types';
import { LINKS } from '@/lib/constant';
import { NextRequest } from 'next/server';

export async function GET() {
  const me = await getRequest<User>(LINKS.REST_API.USER.ME);

  return Response.json(me);
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const status = await putRequest<boolean>(LINKS.REST_API.USER.ME, { data });

  return Response.json({ status });
}
