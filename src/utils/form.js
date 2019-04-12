import {
  always,
  both,
  complement,
  cond,
  groupBy,
  has,
  ifElse,
  isEmpty,
  isNil,
  mapObjIndexed,
  pathOr,
  pipe,
  prop,
  propOr,
  replace,
  split,
  T,
  values,
} from 'ramda';

import { isObject } from 'utils';

const equalsLiteralTrue = value => value == 'true';
const equalsLiteralFalse = value => value == 'false';

const santitize = value =>
  cond([
    [isEmpty, always(undefined)],
    [equalsLiteralTrue, always(true)],
    [equalsLiteralFalse, always(false)],
    [both([!equalsLiteralTrue, T]), always(value)],
  ])(value);

const santitizeGate = value => {
  if (isNil(value)) return;
  return santitize(value);
};

export const sanitizeValues = mapObjIndexed(santitizeGate);

export const getServerError = (errors, error) => {
  if (!error || isEmpty(error)) return;
  const errorData = propOr(pathOr(prop('default', errors), ['data', 'message'], error), prop('status', error), errors);
  return error && !isEmpty(error) && errorData;
};

const fieldConfigExtractor = key => {
  const hasNested = both(isObject, complement(has(key)));
  const extractDefault = prop(key);
  const extractDefaults = ifElse(hasNested, field => getProperties(field), extractDefault);
  const getProperties = mapObjIndexed(extractDefaults);

  return getProperties;
};

export const extractFieldDefaults = fieldConfigExtractor('default');

export const getFormPath = pipe(
  replace(']', ''),
  split('[')
);

export const groupFieldsBySection = pipe(
  values,
  groupBy(propOr('', 'section'))
);
