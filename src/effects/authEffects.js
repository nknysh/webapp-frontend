import { useState } from 'react';

import { getToken, windowExists } from 'utils';

import { useEffectBoundary } from './genericEffects';

export const useTokenFromWindow = callback => {
  const [token, setToken] = useState(getToken(windowExists));

  useEffectBoundary(() => {
    const newToken = getToken(windowExists);
    setToken(newToken);
    callback(token);
  }, [token]);

  return token;
};
