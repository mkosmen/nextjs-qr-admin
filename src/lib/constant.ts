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
  API_ROUTE: {
    AUTH: {
      LOGIN: 'api/auth/login',
      SIGNUP: 'api/auth/signup',
      LOGOUT: 'api/auth/logout',
    },
    USER: {
      ME: 'api/user/me',
      PASSWORD: {
        VERIFY: 'api/user/password/verify',
        RESET: 'api/user/password/reset',
      },
    },
    CATEGORY: {
      _DEFAULT: 'api/category',
      STATUS: 'api/category/[_id]/status',
    },
  },
  REST_API: {
    AUTH: {
      LOGIN: 'auth/signin',
      SIGNUP: 'auth/signup',
      LOGOUT: 'auth/logout',
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
      STATUS: 'category/[_id]/status',
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
  pageSize: 5,
};

export const DEFAULT_PAGINATION_LIMITATION: PaginationLimitModel = {
  maxPage: 5,
  total: 0,
};

export const DEFAULT_PAGINATION: Pagination = {
  ...DEFAULT_PAGINATION_MODEL,
  ...DEFAULT_PAGINATION_LIMITATION,
};

export const PAGE_SIZE_OPTIONS = [2, 5, 10, 20, 50, 100];
