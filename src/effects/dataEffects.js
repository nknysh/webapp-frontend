import { isFunction } from 'utils';

import { isSuccess, isIdle } from 'store/common';

import { useEffectBoundary } from './genericEffects';
import { useState } from 'react';

/**
 * Fetch data
 *
 * @param {string} fetchStatus
 * @param {Function} fetcher
 * @param {object} fetchArgs
 * @returns {boolean}
 */
const fetchData = (fetchStatus, fetcher, fetchArgs = []) => {
  const fetched = isSuccess(fetchStatus);
  const idle = isIdle(fetchStatus);

  idle && isFunction(fetcher) && fetcher(...fetchArgs);

  return fetched;
};

/**
 * useFetchData
 *
 * Custom hook to handle fetching data once
 *
 * @param {string} fetchStatus
 * @param {Function} fetcher
 * @param {object} fetchArgs
 * @param {boolean} changed
 * @param {boolean} force
 * @param {boolean} ignore
 * @returns {boolean}
 */
export const useFetchData = (fetchStatus, fetcher, fetchArgs = [], changed = [], force = false, ignore = false) => {
  const [fetched, setFetched] = useState(false);

  useEffectBoundary(() => {
    if (ignore) return;

    (force || !fetched) && setFetched(fetchData(fetchStatus, fetcher, fetchArgs));
  }, [force, fetchStatus, ...changed]);

  return fetched;
};
