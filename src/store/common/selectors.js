import { prop, pipe } from 'ramda';

export const getStatus = prop('status');
export const getData = prop('data');
export const getErrors = prop('error');
export const getEntities = pipe(
  getData,
  prop('entities')
);
export const getResults = pipe(
  getData,
  prop('result')
);

export const getState = state => state;
export const getSecondArg = (state, arg1, arg2) => arg2;
export const getUnary = (state, arg) => arg;
