import { AxiosRequestConfig } from 'axios';
import reqInstance from './instance';
import { REQUEST_TYPES } from '../constant';

export const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
  const result = await reqInstance.request<T>({
    ...config,
  });

  return result.data as unknown as T;
};

export const getRequest = async <T>(url: string, config?: any) =>
  await request<T>({ ...config, url, method: REQUEST_TYPES.GET });

export const postRequest = async <T>(url: string, config: any) =>
  await request<T>({ ...config, url, method: REQUEST_TYPES.POST });

export const putRequest = async <T>(url: string, config: any) =>
  await request<T>({ ...config, url, method: REQUEST_TYPES.PUT });

export const patchRequest = async <T>(url: string, config: any) =>
  await request<T>({ ...config, url, method: REQUEST_TYPES.PATCH });

export const deleteRequest = async <T>(url: string, config: any) =>
  await request<T>({ ...config, url, method: REQUEST_TYPES.DELETE });
