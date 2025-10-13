import axios from 'axios';
import { cookies } from 'next/headers';
import { STATIC_KEYS } from '../constant';

const options = {
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  timeout: +(process.env.NEXT_PUBLIC_TIMEOUT || 1000),
  headers: { 'X-Custom-Header': 'foobar' },
};

const instance = axios.create(options);

// Add a request interceptor
instance.interceptors.request.use(
  async function (config) {
    console.log('REQ REQ');
    const cookieStorage = await cookies();
    const token = cookieStorage.get(STATIC_KEYS.TOKEN)?.value;
    if (token) {
      config.headers['x-token'] = token;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default instance;
