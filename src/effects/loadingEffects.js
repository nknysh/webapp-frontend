import { useState } from 'react';
import { useEffectBoundary } from './genericEffects';

/**
 * useLoading
 *
 * Loading functionality for pages
 *
 * @param {Function} action
 * @param {Array} changed
 * @param {object} initialState
 * @returns {boolean}
 */
export const useLoading = (action, changed, initialState = false) => {
  const [loading, setLoading] = useState(initialState);

  useEffectBoundary(() => {
    if (action) action(loading);
    setLoading(false);
    return () => setLoading(initialState);
  }, changed);

  return loading;
};
