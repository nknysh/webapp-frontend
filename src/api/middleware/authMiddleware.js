import { lensPath, set } from 'ramda';

const headerAuthorizationLens = lensPath(['headers', 'common', 'Authorization']);

const authToken = localStorage.getItem('authToken');

const headerMiddleware = config => {
  if (!authToken) return config;

  return set(headerAuthorizationLens, `Bearer: ${authToken}`);
};

export default headerMiddleware;
