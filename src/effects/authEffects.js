import { useEffect, useState } from 'react';

import { getToken } from 'utils/auth';
import { windowExists } from 'utils/window';

export const useTokenFromWindow = () => {
  const [token, setToken] = useState(undefined);

  useEffect(() => {
    const newToken = getToken(windowExists);
    if (newToken !== token) {
      setToken(newToken);
    }
  });

  return token;
};
