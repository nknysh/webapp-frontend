import { length, values } from 'ramda';

import { isEmptyOrNil } from 'utils';

import { useEffectBoundary } from './genericEffects';

export const useFetchData = (fetcher, data, fetchArgs) => {
  useEffectBoundary(() => {
    isEmptyOrNil(data) && fetcher(fetchArgs);
  }, [length(values(data))]);
};
