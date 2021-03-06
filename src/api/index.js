import axios from 'axios';
import { defaultTo, map, curry } from 'ramda';

import { API_BASE_URL } from 'config';

import middleware from './middleware';

const baseURL = defaultTo('/api', API_BASE_URL);

const client = axios.create({
  baseURL,
  withCredentials: true,
});

/**
 * Use interceptor
 *
 * Curried function that attachs interceptors (middlewares)
 * to Axios instance
 *
 * @param {string} type Type of interceptor (request/response)
 * @param {Function} interceptor Middleware to execute
 * @returns {Function | object}
 */
const useInterceptor = curry((type, interceptor) => client.interceptors[type].use(interceptor));

// TODO: You can't use a hook like this so something is probably broken, but we should transition off this
// API service anyway.
map(useInterceptor('request'), middleware.request); //eslint-disable-line
map(useInterceptor('response'), middleware.response); //eslint-disable-line

export default client;
