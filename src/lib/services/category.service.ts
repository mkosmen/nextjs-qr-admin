import { Category, Pagination } from '@/lib/types';
import { LINKS } from '@/lib/constant';
import { getRequest, patchRequest } from '@/lib/request';

export async function getList(config?: any) {
  return await getRequest<Category[]>(LINKS.REST_API.CATEGORY._DEFAULT, config);
}

export async function updateActive({ _id, active }: { _id: string; active: boolean }) {
  return await patchRequest<{ status: boolean }>(LINKS.REST_API.CATEGORY.STATUS, {
    active,
    replace: {
      _id,
    },
  });
}
