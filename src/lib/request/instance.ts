import axios from 'axios';

const options = {
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  timeout: +(process.env.NEXT_PUBLIC_TIMEOUT || 1000),
  headers: { 'X-Custom-Header': 'foobar' },
};

const instance = axios.create(options);

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

export default instance;
