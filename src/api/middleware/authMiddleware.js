import { lensPath, set } from 'ramda';

const headerAuthorizationLens = lensPath(['headers', 'common', 'Authorization']);

const authToken = localStorage.getItem('authToken');

const authMiddleware = config => {
  if (!authToken) return config;

  return set(headerAuthorizationLens, `Bearer: ${authToken}`, config);
};

export default authMiddleware;
