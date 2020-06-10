import {
  addIndex,
  always,
  curry,
  either,
  equals,
  identity,
  is,
  lensPath,
  map,
  mapObjIndexed,
  merge,
  pipe,
  prop,
  propOr,
  reduce,
  test,
  tryCatch,
  uniq,
  values,
} from 'ramda';

const currencyConfig = require('config/data/currencies.json');

export const noop = () => {};

export const isArray = is(Array);
export const isObject = is(Object);
export const isFunction = is(Function);
export const isString = is(String);

export const mapWithIndex = addIndex(map);
export const reduceWithIndex = addIndex(reduce);

/**
 * Array to key value object
 *
 * Returns an object from an array based on which prop
 * to use in the array as key and which prop to use as the value
 *
 * @param {string} keyProp
 * @param {string} valueProp
 * @returns {object}
 */
export const arrayToKeyValueObject = (keyProp, valueProp) =>
  reduce((accum, item) => merge(accum, { [prop(keyProp, item)]: prop(valueProp, item) }), {});

/**
 * Lens from object
 *
 * Curried function to create lenses from an object.  Handles deep objects
 * by recursing to infinite depth
 *
 * @param {array} previousKeys
 * @param {*} value
 * @param {string} key
 * @returns {Function}
 */
const lensFromObject = curry((previousKeys, value, key) => {
  // Keeps adding to the path as we recurse
  const currentPath = [...previousKeys, key];

  // If the value is an object, then recurse until we find a non-object
  if (isObject(value)) return mapObjIndexed(lensFromObject(currentPath), value);

  // Returns built lens
  return lensPath(currentPath);
});

/**
 * Build lenses from object
 *
 * @param {object}
 * @returns {object}
 */
export const buildLensesFromObject = mapObjIndexed(lensFromObject([]));

/**
 * Reduce by key
 *
 * Curried function to reduce by top level key
 *
 * @param {string} key
 * @param {array} accum
 * @param {*} value
 * @returns {Function | array}
 */
export const reduceByKey = curry((key, accum, value) => (value ? [...accum, prop(key, value)] : accum));

/**
 * Reduce by key
 *
 * Curried function to reduce by array level key
 *
 * @param {string} key
 * @param {array} accum
 * @param {*} value
 * @returns {Function | array}
 */
export const reduceArrayByKey = curry((key, accum, value) => (value ? [...accum, ...propOr([], key, value)] : accum));

/**
 * Get mapped
 *
 * Returns values mapped by specific key
 *
 * @param {string} key
 * @param {Function} reducer
 */
export const getMapped = (key, reducer = reduceByKey) => pipe(values, reduce(reducer(key), []), uniq);

/**
 * Test adult
 *
 * Tests to see if string contains adult
 *
 * @param {string}
 * @returns {boolean}
 */
export const testAdult = test(/^adult$/i);

/**
 * Is Adult
 *
 * @param {string}
 * @returns {boolean}
 */
export const isAdult = either(testAdult, equals('default'));

/**
 * Parse JSON
 *
 * Custom function that will add try catch round JSON.parse
 * returning the original data if it couldn't be parsed
 *
 * @param {string} data
 * @returns {string | object}
 */
export const parseJson = data => tryCatch(JSON.parse, always(identity(data)))(data);

export const compareObjectsByProperties = (A, B, properties) => {
  let match = true;

  properties.forEach(property => {
    if (A[property] !== B[property]) {
      match = false;
    }
  });

  return match;
};

export const filterByObjectProperties = (A, B, propertiesToMatch) => {
  return A.filter(elementA => {
    return B.some(elementB => {
      return compareObjectsByProperties(elementA, elementB, propertiesToMatch);
    });
  });
};

export const ageNameToHumanReadable = ageNameValue => {
  ageNameValue = ageNameValue.toUpperCase();
  const ageName = ageNameValue === 'DEFAULT' ? 'ADULT' : ageNameValue;
  return ageName.charAt(0).toUpperCase() + ageName.slice(1);
};

export const arrayOfObjectsToMapping = (arrayOfObjects, key, value) => {
  const mapping = {};

  arrayOfObjects.forEach(o => {
    mapping[o[key]] = o[value];
  });

  return mapping;
};

export const isBlank = value => {
  return value === '' || value === null || value === undefined;
};

export const currencyCodeToSymbol = currencyCode => {
  try {
    const symbol = currencyConfig[currencyCode].symbol;
    return symbol;
  } catch (e) {
    throw Error(`Cannot find currency symbol for "${currencyCode}"`);
  }
};
