import { useEffect, useState } from 'react';

export const useLoading = (action, changed, initialState = false) => {
  const [loading, setLoading] = useState(initialState);

  useEffect(() => {
    if (action) action(loading);
    setLoading(false);
    return () => setLoading(initialState);
  }, changed);

  return loading;
};
