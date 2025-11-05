import { REQUEST_TYPES } from '@/lib/constant';

interface TDefault {
  status: boolean;
  message?: string;
  messages?: Record<string, string[]>;
}

interface Config {
  params?: any;
  searchParams?: any;
  replace?: Record<string, any>;
  body?: any;
}

interface ConfigWithMethod extends Config {
  method: (typeof REQUEST_TYPES)[keyof typeof REQUEST_TYPES];
}

const DEFAULT_FETCH_OPTIONS = {
  headers: { 'Content-Type': 'application/json' },
  method: REQUEST_TYPES.GET,
};

export const fetchApi = async <T>(url: string, options: ConfigWithMethod) => {
  let newUrl = url;
  const { replace = {}, params = {}, ...fetchOptions } = options;

  Object.entries(replace as object).forEach(([key, value]) => {
    newUrl = url.replaceAll(`[${key}]`, value);
  });
  if (Object.keys(params).length > 0) {
    newUrl += '?' + new URLSearchParams(params);
  }

  const o = { ...DEFAULT_FETCH_OPTIONS, ...fetchOptions };

  const r = await fetch(newUrl, o);
  const result = <T>await r.json();
  return result;
};

export const postApi = async <T = TDefault>(url: string, config?: Config) =>
  await fetchApi<T>(url, { ...config, method: REQUEST_TYPES.POST });

export const getApi = async <T = TDefault>(url: string, config?: Config) =>
  await fetchApi<T>(url, { ...config, method: REQUEST_TYPES.GET });

export const putApi = async <T = TDefault>(url: string, config?: Config) =>
  await fetchApi<T>(url, { ...config, method: REQUEST_TYPES.PUT });

export const patchApi = async <T = TDefault>(url: string, config?: Config) =>
  await fetchApi<T>(url, { ...config, method: REQUEST_TYPES.PATCH });

export const deleteApi = async <T = TDefault>(url: string, config?: Config) =>
  await fetchApi<T>(url, { ...config, method: REQUEST_TYPES.DELETE });

export const sleep = (time = 1000) => new Promise((r) => setTimeout(r, time));
