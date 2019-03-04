import { isArray } from 'utils';
import { getErrorActionName, getSuccessActionName } from 'store/utils';

export const successAction = (type, data) => ({
  type: getSuccessActionName(type),
  payload: isArray(data) ? [...data] : { ...data },
});

export const errorAction = (type, data) => ({
  type: getErrorActionName(type),
  payload: isArray(data) ? [...data] : { ...data },
});
