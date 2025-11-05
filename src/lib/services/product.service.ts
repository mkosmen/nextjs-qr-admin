import { Category, CategoryActionDto } from '@/lib/types';
import { LINKS } from '@/lib/constant';
import { deleteRequest, getRequest, patchRequest, postRequest, putRequest } from '@/lib/request';

export async function getList(config?: any) {
  return await getRequest<Category[]>(LINKS.REST_API.PRODUCT._DEFAULT, config);
}

export async function updateActive({ _id, active }: { _id: string; active: boolean }) {
  return await patchRequest<{ status: boolean }>(LINKS.REST_API.PRODUCT.STATUS, {
    active,
    replace: {
      _id,
    },
  });
}

export async function create(data: CategoryActionDto) {
  return await postRequest(LINKS.REST_API.PRODUCT._DEFAULT, { data });
}

export async function remove(_id: string) {
  return await deleteRequest(LINKS.REST_API.PRODUCT.SINGLE, {
    replace: {
      _id,
    },
  });
}

export async function update(_id: string, data: CategoryActionDto) {
  return await putRequest(LINKS.REST_API.PRODUCT.SINGLE, {
    replace: {
      _id,
    },
    data,
  });
}
