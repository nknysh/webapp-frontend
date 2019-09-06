import axios from 'axios';
import { defaultTo, map, curry } from 'ramda';

import { API_BASE_URL } from 'config';

import middleware from './middleware';

const baseURL = defaultTo('/api', API_BASE_URL);

const client = axios.create({
  baseURL,
  withCredentials: true,
});

const useInterceptor = curry((type, interceptor) => client.interceptors[type].use(interceptor));

map(useInterceptor('request'), middleware.request);
map(useInterceptor('response'), middleware.response);

export default client;
