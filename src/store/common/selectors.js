import { prop, pipe } from 'ramda';

export const getStatus = prop('status');
export const getData = prop('data');
export const getEntities = pipe(
  getData,
  prop('entities')
);
export const getResults = pipe(
  getData,
  prop('result')
);
