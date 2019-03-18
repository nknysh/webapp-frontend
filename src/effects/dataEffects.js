import { useEffectBoundary } from './genericEffects';

export const useFetchData = (fetcher, data, fetchArgs, force = false) => {
  useEffectBoundary(() => {
    (force || !data) && fetcher(fetchArgs);
  });
};
