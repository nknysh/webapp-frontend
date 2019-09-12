import { pipe, lensPath, set } from 'ramda';

const headerAcceptLens = lensPath(['headers', 'common', 'Accept']);
const headerContentTypeLens = lensPath(['headers', 'common', 'Content-Type']);
const headerContentTypePatchLens = lensPath(['headers', 'patch', 'Content-Type']);
const headerContentTypePostLens = lensPath(['headers', 'post', 'Content-Type']);
const headerContentTypePutLens = lensPath(['headers', 'put', 'Content-Type']);

const applicationType = 'application/json';

/**
 * Header middleware
 *
 * Runs through config adding application type
 * to every possible header combination ensuring
 * `application/json` in all requests
 *
 * @param {AxiosRequestConfig} config
 * @returns {AxiosRequestConfig}
 */
const headerMiddleware = pipe(
  set(headerAcceptLens, applicationType),
  set(headerContentTypeLens, applicationType),
  set(headerContentTypePatchLens, applicationType),
  set(headerContentTypePostLens, applicationType),
  set(headerContentTypePutLens, applicationType)
);

export default headerMiddleware;
