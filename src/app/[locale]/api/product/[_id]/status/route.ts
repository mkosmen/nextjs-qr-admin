import { updateActive } from '@/lib/services/product.service';
import { NextResponse } from 'next/server';

export async function PATCH(req: NextResponse) {
  const data = await req.json();
  const result = await updateActive(data);
  return Response.json(result);
}
