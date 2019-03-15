import { useEffect } from 'react';

/**
 * @see https://github.com/facebook/react/issues/14369
 */
export const useEffectBoundary = (effect, params) =>
  useEffect(() => {
    // eslint-disable-next-line
    let didCancel = false;

    effect();

    return () => {
      didCancel = true;
    };
  }, params);
