import { NextResponse } from 'next/server';

export async function GET(req: NextResponse) {
  return Response.json({ status: true });
}
