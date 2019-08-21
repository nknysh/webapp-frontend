import axios from 'axios';
import { map, curry } from 'ramda';

import middleware from './middleware';

const baseURL = '/api'; // defaultTo('/api', API_BASE_URL);

const client = axios.create({ baseURL });

const useInterceptor = curry((type, interceptor) => client.interceptors[type].use(interceptor));

map(useInterceptor('request'), middleware.request);
map(useInterceptor('response'), middleware.response);

export default client;
