export const HOST = 'mongodb://127.0.0.1:27017/qrmenu';
export const DB = 'admin';

export const LINKS = {
  LOGIN: 'login',
  SIGNUP: 'sign-up',
  DASHBOARD: 'dashboard',
  PROFILE: 'me',
};

export const API_LINKS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    SIGNUP: '/api/auth/signup',
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
