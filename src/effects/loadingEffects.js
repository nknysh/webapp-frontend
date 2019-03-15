import { useState } from 'react';
import { useEffectBoundary } from './genericEffects';

export const useLoading = (action, changed, initialState = false) => {
  const [loading, setLoading] = useState(initialState);

  useEffectBoundary(() => {
    if (action) action(loading);
    setLoading(false);
    return () => setLoading(initialState);
  }, changed);

  return loading;
};
