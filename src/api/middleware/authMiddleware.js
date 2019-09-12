import { lensPath, set } from 'ramda';

const headerAuthorizationLens = lensPath(['headers', 'common', 'Authorization']);

const authToken = localStorage.getItem('authToken');

/**
 * Authentication middleware
 *
 * Adds bearer token to axios config headers
 * if authToken exists
 *
 * @param {AxiosRequestConfig} config
 * @returns {AxiosRequestConfig}
 */
const authMiddleware = config => {
  if (!authToken) return config;

  return set(headerAuthorizationLens, `Bearer: ${authToken}`, config);
};

export default authMiddleware;
