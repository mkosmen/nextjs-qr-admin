import { NextRequest } from 'next/server';
import { remove, update } from '@/lib/services/product.service';

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ _id: string }> }) {
  const { _id } = await params;
  await remove(_id);
  return Response.json({ status: true });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ _id: string }> }) {
  const { _id } = await params;
  const data = await req.json();
  await update(_id, data);
  return Response.json({ status: true });
}
