import { useEffect } from 'react';
import { length, values } from 'ramda';

import { isEmptyOrNil } from 'utils';

export const useFetchData = (fetcher, data, fetchArgs) => {
  useEffect(() => {
    isEmptyOrNil(data) && fetcher(fetchArgs);
  }, [length(values(data))]);
};
