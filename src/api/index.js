import axios from 'axios';
import { map, curry } from 'ramda';

import { API_BASE_URL } from 'config';

import middleware from './middleware';

const client = axios.create({ API_BASE_URL });

const useInterceptor = curry((type, interceptor) => client.interceptors[type].use(interceptor));

map(useInterceptor('request'), middleware.request);
map(useInterceptor('response'), middleware.response);

export default client;
