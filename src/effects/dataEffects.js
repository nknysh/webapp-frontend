import { useEffect } from 'react';

export const useFetchData = (fetcher, data, fetchArgs) => {
  useEffect(() => {
    !data && fetcher(fetchArgs);
  }, [data]);
};
