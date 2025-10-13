import { NextRequest } from 'next/server';
import { postRequest } from '@/lib/request';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    await postRequest('/auth/signup', { data });

    return Response.json({ result: true });
  } catch {
    return Response.json({ result: false });
  }
}
