import { useEffect, useState } from 'react';

import { getToken } from 'utils/auth';
import { windowExists } from 'utils/window';

export const useTokenFromWindow = callback => {
  const [token, setToken] = useState(getToken(windowExists));

  useEffect(() => {
    const newToken = getToken(windowExists);
    setToken(newToken);
    callback(token);
  }, [token]);

  return token;
};
