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

export const postApi = async <T>(url: string, config?: { params?: any; body?: any }) => {
  const opts = { ...config, method: 'POST' };
  return await fetchApi<T>(url, opts);
};

export const getApi = async <T>(url: string, config?: { params?: any }) =>
  await fetchApi<T>(url, { ...config, method: REQUEST_TYPES.GET });
