import axios from 'axios';
import { defaultTo, map, curry, compose } from 'ramda';

import middleware from './middleware';
import { withRequestHelpers } from './request';

const baseURL = defaultTo('/api', process.env.API_BASE_URL);

const client = axios.create({
  baseURL,
});

const useInterceptor = curry((type, interceptor) => client.interceptors[type].use(interceptor));

map(useInterceptor('request'), middleware.request);
map(useInterceptor('response'), middleware.response);

export default compose(withRequestHelpers)(client);
