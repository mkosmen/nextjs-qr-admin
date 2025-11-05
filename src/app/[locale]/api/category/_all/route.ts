import { getAll } from '@/lib/services/category.service';

export async function GET() {
  const result = await getAll();

  return Response.json(result);
}
