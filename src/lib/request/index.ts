'use server';

import { AxiosRequestConfig } from 'axios';
import reqInstance from './instance';
import { REQUEST_TYPES } from '../constant';

type Config = AxiosRequestConfig & { replace?: Record<string, any> };

export const request = async <T>(config: Config): Promise<T> => {
  const { replace = {}, ...axiosOptions } = config;

  Object.entries(replace as object).forEach(([key, value]) => {
    axiosOptions.url = (axiosOptions.url || '').replaceAll(`[${key}]`, value);
  });

  axiosOptions.url = '/' + axiosOptions.url?.replaceAll(/^\//gi, '');

  const result = await reqInstance.request<T>({
    ...axiosOptions,
  });

  return result.data as unknown as T;
};

type ConfigPartial = Omit<Config, 'url' | 'method'> & { [key: string]: any };

export const getRequest = async <T>(url: string, config?: ConfigPartial) =>
  await request<T>({ ...config, url, method: REQUEST_TYPES.GET });

export const postRequest = async <T>(url: string, config?: ConfigPartial) =>
  await request<T>({ ...config, url, method: REQUEST_TYPES.POST });

export const putRequest = async <T>(url: string, config?: ConfigPartial) =>
  await request<T>({ ...config, url, method: REQUEST_TYPES.PUT });

export const patchRequest = async <T>(url: string, config?: ConfigPartial) =>
  await request<T>({ ...config, url, method: REQUEST_TYPES.PATCH });

export const deleteRequest = async <T>(url: string, config?: ConfigPartial) =>
  await request<T>({ ...config, url, method: REQUEST_TYPES.DELETE });
