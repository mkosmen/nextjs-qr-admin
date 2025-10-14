import axios from 'axios';
import { cookies } from 'next/headers';
import { STATIC_KEYS } from '../constant';

const options = {
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  timeout: +(process.env.NEXT_PUBLIC_TIMEOUT || 1000),
  headers: { 'X-Custom-Header': 'foobar' },
};

const instance = axios.create(options);

instance.interceptors.request.use(
  async function (config) {
    const cookieStorage = await cookies();
    const token = cookieStorage.get(STATIC_KEYS.TOKEN)?.value;
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
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error.response.data);
  },
);

export default instance;
