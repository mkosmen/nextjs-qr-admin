import { Pagination, PaginationLimitModel, PaginationModel } from './types';

export const LINKS = {
  WEB: {
    LOGIN: 'login',
    SIGNUP: 'signup',
    DASHBOARD: 'dashboard',
    PROFILE: 'me',
    CATEGORY: 'category',
    PRODUCT: 'product',
    COMPANY: 'company',
  },
  REST_API: {
    AUTH: {
      LOGIN: 'auth/signin',
      SIGNUP: 'auth/signup',
      LOGOUT: 'auth/signout',
    },
    USER: {
      ME: 'user/me',
      PASSWORD: {
        VERIFY: 'user/password/verify',
        RESET: 'user/password/reset',
      },
    },
    CATEGORY: {
      _DEFAULT: 'category',
      ALL: 'category/all',
      SINGLE: 'category/[_id]',
      STATUS: 'category/[_id]/status',
    },
    PRODUCT: {
      _DEFAULT: 'product',
      SINGLE: 'product/[_id]',
      STATUS: 'product/[_id]/status',
    },
  },
};

export const REQUEST_TYPES = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

export const STATIC_KEYS = {
  TOKEN: 'token',
  LANGAUGE: 'lang',
};

export const LOCALES = ['en', 'tr'];
export const DEFAULT_LOCALE = 'tr';

export const DEFAULT_PAGINATION_MODEL: PaginationModel = {
  page: 0,
  pageSize: 30,
};

export const DEFAULT_PAGINATION_LIMITATION: PaginationLimitModel = {
  maxPage: 0,
  total: 0,
};

export const DEFAULT_PAGINATION: Pagination = {
  ...DEFAULT_PAGINATION_MODEL,
  ...DEFAULT_PAGINATION_LIMITATION,
};

export const PAGE_SIZE_OPTIONS = [10, 20, 30, 50, 100];

export type MODAL_ACTION_TYPE = 'create' | 'update';

export const PUBLIC_ROUTES = ['/login', '/signup'];
