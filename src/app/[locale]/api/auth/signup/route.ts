import { NextRequest } from 'next/server';
import { postRequest } from '@/lib/request';
import { LINKS } from '@/lib/constant';

export async function POST(req: NextRequest) {
  const data = await req.json();
  await postRequest(LINKS.REST_API.AUTH.SIGNUP, { data });

  return Response.json({ status: true });
}
