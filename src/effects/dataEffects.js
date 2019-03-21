import { values, pipe, all, equals, last, reduce } from 'ramda';

import { isFunction, mapWithIndex } from 'utils';

import { isActive, isSuccess, isError } from 'store/common';

import { useEffectBoundary } from './genericEffects';
import { useState } from 'react';

const allFetched = pipe(
  values,
  all(equals(true))
);

const fetchData = (fetchStatus, fetcher, fetchArgs = {}, force = false) => {
  const fetched = isSuccess(fetchStatus);
  const error = isError(fetchStatus);
  const active = isActive(fetchStatus);

  if ((force || (!fetched && !active && !error)) && isFunction(fetcher)) {
    fetcher(fetchArgs);
  }

  return fetched;
};

export const useFetchData = (fetchStatus, fetcher, fetchArgs = {}, force = false) => {
  const [fetched, setFetched] = useState(false);

  useEffectBoundary(() => {
    !fetched && setFetched(fetchData(fetchStatus, fetcher, fetchArgs, force));
  }, [force, fetchStatus]);

  return fetched;
};

export const useFetchDataMultiple = fetches => {
  const fetchResult = (accum, args) => [...accum, useFetchData(...args)];

  const fetchResults = reduce(fetchResult, [], fetches);

  return allFetched(fetchResults);
};
