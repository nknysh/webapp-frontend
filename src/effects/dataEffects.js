import { isFunction } from 'utils';

import { isSuccess, isIdle } from 'store/common';

import { useEffectBoundary } from './genericEffects';
import { useState } from 'react';

const fetchData = (fetchStatus, fetcher, fetchArgs = []) => {
  const fetched = isSuccess(fetchStatus);
  const idle = isIdle(fetchStatus);

  idle && isFunction(fetcher) && fetcher(...fetchArgs);

  return fetched;
};

export const useFetchData = (fetchStatus, fetcher, fetchArgs = [], changed = [], force = false, ignore = false) => {
  const [fetched, setFetched] = useState(false);

  useEffectBoundary(() => {
    if (ignore) return;

    (force || !fetched) && setFetched(fetchData(fetchStatus, fetcher, fetchArgs));
  }, [force, fetchStatus, ...changed]);

  return fetched;
};
