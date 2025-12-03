'use server';

import axios, { CreateAxiosDefaults } from 'axios';
import { removeToken, getToken } from '@/lib/services/token.service';

const options: CreateAxiosDefaults = {
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  timeout: +(process.env.NEXT_PUBLIC_TIMEOUT || 1000),
  headers: {
    'next-action': true,
  },
};

const instance = axios.create(options);

instance.interceptors.request.use(
  async function (config) {
    const token = await getToken();
    if (token) {
      config.headers['x-token'] = token;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      await removeToken();
    }

    return Promise.reject({
      ...error.response.data,
      status: error.response.status,
    });
  },
);

export default instance;
