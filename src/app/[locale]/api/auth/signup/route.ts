import { NextRequest } from 'next/server';
import { postRequest } from '@/lib/request';
import { LINKS } from '@/lib/constant';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    await postRequest(LINKS.API.AUTH.SIGNUP, { data });

    return Response.json({ status: true });
  } catch (error: any) {
    return Response.json({ false: true, ...error });
  }
}
