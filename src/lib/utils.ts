import { REQUEST_TYPES } from '@/lib/constant';

const DEFAULT_FETCH_OPTIONS = {
  headers: { 'Content-Type': 'application/json' },
  method: REQUEST_TYPES.GET,
};

export const fetchApi = async <T>(url: string, options = {}) => {
  const o = { ...DEFAULT_FETCH_OPTIONS, ...options };
  const r = await fetch(url, o);
  return <T>await r.json();
};

interface TDefault {
  status: boolean;
  message?: string;
  messages?: Record<string, string[]>;
}

export const postApi = async <T = TDefault>(url: string, config?: { params?: any; body?: any }) =>
  await fetchApi<T>(url, { ...config, method: REQUEST_TYPES.POST });

export const getApi = async <T = TDefault>(url: string, config?: { params?: any }) =>
  await fetchApi<T>(url, { ...config, method: REQUEST_TYPES.GET });

export const putApi = async <T = TDefault>(url: string, config?: { params?: any; body?: any }) =>
  await fetchApi<T>(url, { ...config, method: REQUEST_TYPES.PUT });

export const patchApi = async <T = TDefault>(url: string, config?: { params?: any; body?: any }) =>
  await fetchApi<T>(url, { ...config, method: REQUEST_TYPES.PATCH });

export const deleteApi = async <T = TDefault>(url: string, config?: { params?: any; body?: any }) =>
  await fetchApi<T>(url, { ...config, method: REQUEST_TYPES.DELETE });
