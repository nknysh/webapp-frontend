import { useEffect } from 'react';

/**
 * @see https://github.com/facebook/react/issues/14369
 */
export const useEffectBoundary = (effect, params) =>
  useEffect(() => {
    let didCancel = false;

    if(!didCancel){
        effect();
    }

    return () => {
      didCancel = true;
    };
  }, params);
