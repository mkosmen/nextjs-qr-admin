'use server';

import { PaginationResult, Product, ProductActionDto } from '@/lib/types';
import { LINKS } from '@/lib/constant';
import { deleteRequest, getRequest, patchRequest, postRequest, putRequest } from '@/lib/request';

export async function getList(config?: any) {
  return await getRequest<PaginationResult<{ products: Product[] }>>(
    LINKS.REST_API.PRODUCT._DEFAULT,
    config,
  );
}

export async function updateActive({ _id, active }: { _id: string; active: boolean }) {
  return await patchRequest<{ status: boolean }>(LINKS.REST_API.PRODUCT.STATUS, {
    active,
    replace: {
      _id,
    },
  });
}

export async function create(data: ProductActionDto) {
  return await postRequest(LINKS.REST_API.PRODUCT._DEFAULT, { data });
}

export async function remove(_id: string) {
  return await deleteRequest(LINKS.REST_API.PRODUCT.SINGLE, {
    replace: {
      _id,
    },
  });
}

export async function update(_id: string, data: ProductActionDto) {
  return await putRequest(LINKS.REST_API.PRODUCT.SINGLE, {
    replace: {
      _id,
    },
    data,
  });
}
