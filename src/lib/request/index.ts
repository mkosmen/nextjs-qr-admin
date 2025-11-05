import { AxiosRequestConfig } from 'axios';
import reqInstance from './instance';
import { REQUEST_TYPES } from '../constant';

export const request = async <T>(
  config: AxiosRequestConfig & { replace: Record<string, any> },
): Promise<T> => {
  const { replace = {}, ...axiosOptions } = config;

  Object.entries(replace as object).forEach(([key, value]) => {
    axiosOptions.url = (axiosOptions.url || '').replaceAll(`[${key}]`, value);
  });

  const result = await reqInstance.request<T>({
    ...axiosOptions,
  });

  return result.data as unknown as T;
};

export const getRequest = async <T>(url: string, config?: any) =>
  await request<T>({ ...config, url, method: REQUEST_TYPES.GET });

export const postRequest = async <T>(url: string, config?: any) =>
  await request<T>({ ...config, url, method: REQUEST_TYPES.POST });

export const putRequest = async <T>(url: string, config?: any) =>
  await request<T>({ ...config, url, method: REQUEST_TYPES.PUT });

export const patchRequest = async <T>(url: string, config?: any) =>
  await request<T>({ ...config, url, method: REQUEST_TYPES.PATCH });

export const deleteRequest = async <T>(url: string, config?: any) =>
  await request<T>({ ...config, url, method: REQUEST_TYPES.DELETE });
