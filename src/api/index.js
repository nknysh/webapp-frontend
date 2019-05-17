import axios from 'axios';
import { defaultTo, map, curry, compose } from 'ramda';

import { API_BASE_URL } from 'config';

import middleware from './middleware';
import { withRequestHelpers } from './request';

const baseURL = defaultTo('/api', API_BASE_URL);

const client = axios.create({
  baseURL,
});

const useInterceptor = curry((type, interceptor) => client.interceptors[type].use(interceptor));

map(useInterceptor('request'), middleware.request);
map(useInterceptor('response'), middleware.response);

export default compose(withRequestHelpers)(client);
