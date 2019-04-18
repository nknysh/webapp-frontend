import { values, pipe, all, equals, reduce } from 'ramda';

import { isFunction } from 'utils';

import { isSuccess, isIdle } from 'store/common';

import { useEffectBoundary } from './genericEffects';
import { useState } from 'react';

const allFetched = pipe(
  values,
  all(equals(true))
);

const fetchData = (fetchStatus, fetcher, fetchArgs = []) => {
  const fetched = isSuccess(fetchStatus);
  const idle = isIdle(fetchStatus);

  idle && isFunction(fetcher) && fetcher(...fetchArgs);

  return fetched;
};

export const useFetchData = (fetchStatus, fetcher, fetchArgs = [], changed = [], force = false) => {
  const [fetched, setFetched] = useState(false);

  useEffectBoundary(() => {
    (force || !fetched) && setFetched(fetchData(fetchStatus, fetcher, fetchArgs));
  }, [force, fetchStatus, ...changed]);

  return fetched;
};

export const useFetchDataMultiple = fetches => {
  const fetchResult = (accum, args) => [...accum, useFetchData(...args)];

  const fetchResults = reduce(fetchResult, [], fetches);

  return allFetched(fetchResults);
};
