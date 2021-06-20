import axios from 'axios';

import { SERVER_API_URL } from './constants';

const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = SERVER_API_URL;

const instance = axios.create({
  baseURL: SERVER_API_URL,
  timeout: TIMEOUT,
});

const onRequestSuccess = (config: any) => {
  const token =
    localStorage.getItem('authentication_token') || sessionStorage.getItem('authentication_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};
const onResponseSuccess = (response: any) => response;
const onResponseError = (err: any) => {
  const status = err.status || (err.response ? err.response.status : 0);
  if (status === 403 || status === 401) {
    // onUnauthenticated();
  }
  return Promise.reject(err);
};

instance.interceptors.request.use(onRequestSuccess);
instance.interceptors.response.use(onResponseSuccess, onResponseError);

export default instance;
