import { NextRequest } from 'next/server';
import { getList, create } from '@/lib/services/category.service';

export async function GET(req: NextRequest) {
  const result = await getList(req.nextUrl.searchParams);

  return Response.json(result);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const result = await create(data);

  return Response.json(result);
}
