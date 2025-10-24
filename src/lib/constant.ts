export const LINKS = {
  WEB: {
    LOGIN: '/login',
    SIGNUP: '/signup',
    DASHBOARD: '/dashboard',
    PROFILE: '/me',
    CATEGORY: '/category',
    PRODUCT: '/product',
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
