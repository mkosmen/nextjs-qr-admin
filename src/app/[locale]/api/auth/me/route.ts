import { getRequest } from '@/lib/request';
import { User } from '@/lib/types';
import { LINKS } from '@/lib/constant';

export async function GET() {
  try {
    const me = await getRequest<User>(LINKS.API.AUTH.ME);

    return Response.json(me);
  } catch (error: any) {
    return Response.json({ status: false, ...error });
  }
}
