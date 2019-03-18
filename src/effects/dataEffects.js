import { values, pipe, all, equals } from 'ramda';

import { isFunction, mapWithIndex } from 'utils';

import { isLoading, isSuccess, isError } from 'store/common';

import { useEffectBoundary } from './genericEffects';
import { useState } from 'react';

const allFetched = pipe(
  values,
  all(equals(true))
);

const fetchData = (fetchStatus, fetcher, fetchArgs = {}, force = false) => {
  const fetched = !isLoading(fetchStatus) && isSuccess(fetchStatus);
  const error = isError(fetchStatus);

  if ((force || (!fetched && !error)) && isFunction(fetcher)) {
    fetcher(fetchArgs);
  }

  return fetched;
};

export const useFetchData = (fetchStatus, fetcher, fetchArgs = {}, force = false) => {
  const [fetched, setFetched] = useState(false);

  useEffectBoundary(() => {
    setFetched(fetchData(fetchStatus, fetcher, fetchArgs, force));
  }, [force, fetchStatus]);

  return fetched;
};

export const useFetchDataMultiple = fetches => {
  const fetchResult = args => useFetchData(...args);

  const fetchResults = mapWithIndex(fetchResult, fetches);

  return allFetched(fetchResults);
};
