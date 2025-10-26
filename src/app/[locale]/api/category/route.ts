import { NextRequest } from 'next/server';
import { getList } from '@/lib/services/category.service';

export async function POST(req: NextRequest) {
  const d = await req.json();
  const result = await getList(d);

  return Response.json(result);
}
