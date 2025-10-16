export const HOST = 'mongodb://127.0.0.1:27017/qrmenu';
export const DB = 'admin';

export const LINKS = {
  WEB: {
    LOGIN: 'login',
    SIGNUP: 'sign-up',
    DASHBOARD: 'dashboard',
    PROFILE: 'me',
  },
  API_ROUTE: {
    AUTH: {
      LOGIN: 'api/auth/login',
      SIGNUP: 'api/auth/signup',
      LOGOUT: 'api/auth/logout',
      ME: 'api/auth/me',
    },
  },
  API: {
    AUTH: {
      LOGIN: 'auth/signin',
      SIGNUP: 'auth/signup',
      LOGOUT: 'auth/logout',
      ME: 'auth/me',
    },
  },
};

export const REQUEST_TYPES = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete',
};

export const STATIC_KEYS = {
  TOKEN: 'token',
  LANGAUGE: 'lang',
};

export const LOCALES = ['en', 'tr'];
export const DEFAULT_LOCALE = 'tr';
