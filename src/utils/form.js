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
  map,
  T,
  values,
  inc,
} from 'ramda';

import i18n from 'config/i18n';
import { isObject, mapWithIndex } from 'utils/helpers';

/**
 * Equals literal true
 *
 * Equality comparison for true string that does no conversion
 *
 * @param {string} value
 * @returns {boolean}
 */
const equalsLiteralTrue = value => value == 'true';

/**
 * Equals literal false
 *
 * Equality comparison for false string that does no conversion
 *
 * @param {string} value
 * @returns {boolean}
 */
const equalsLiteralFalse = value => value == 'false';

/**
 * Sanitize
 *
 * @param {*} value
 * @returns {*}
 */
const santitize = value =>
  cond([
    [isEmpty, always(undefined)],
    [equalsLiteralTrue, always(true)],
    [equalsLiteralFalse, always(false)],
    [both([!equalsLiteralTrue, T]), always(value)],
  ])(value);

/**
 * Santizie gate
 *
 * Function to fail fast on nil
 *
 * @param {*} value
 * @returns {*}
 */
const santitizeGate = value => {
  if (isNil(value)) return;
  return santitize(value);
};

/**
 * Sanitize values
 *
 * Sanitizes form value so they will be accepted
 * by the middlewares and backend
 *
 * @param {object}
 * @returns {object}
 */
export const sanitizeValues = mapObjIndexed(santitizeGate);

/**
 * Get server error
 *
 * Extract the required error from response
 * errors object
 *
 * @param {object} errors
 * @param {string} error
 */
export const getServerError = (errors, error) => {
  if (!error || isEmpty(error)) return;

  const errorData = propOr(pathOr(prop('default', errors), ['data', 'message'], error), prop('status', error), errors);
  return error && !isEmpty(error) && errorData;
};

/**
 * Extracts defaults from form config
 *
 * @param {string} key
 * @returns {Function}
 */
const fieldConfigExtractor = key => {
  /**
   * Check if has nested keys
   *
   * @param {string}
   * @returns {boolean}
   */
  const hasNested = both(isObject, complement(has(key)));

  /**
   * Returns property of data
   *
   * @param {object}
   * @returns {*}
   */
  const extractDefault = prop(key);

  /**
   * Extract defaults
   *
   * Checks if defaults have nested defaults and returns
   * Recurse if nested e.g.
   * ```js
   * {
   *   foo: {
   *     default: ''
   *   },
   *   bar: {
   *     boo: {
   *       default: ''
   *     }
   *   }
   * }
   * ```
   *
   * @param {object}
   * @returns {*}
   */
  const extractDefaults = ifElse(hasNested, field => getProperties(field), extractDefault);

  /**
   * Get properties
   *
   * Extracts defaults for all field properties
   *
   * @param {object}
   * @returns {object}
   */
  const getProperties = mapObjIndexed(extractDefaults);

  return getProperties;
};

/**
 * Extract field defaults
 *
 * @param {object}
 * @returns {object}
 */
export const extractFieldDefaults = fieldConfigExtractor('default');

/**
 * Get form path
 *
 * Allows us to get string form path as array, e.g.
 *
 * ```js
 * getFormPath('values[foo][bar]') // ['values', 'foo', 'bar']
 * ```
 *
 * @param {string}
 * @returns {array}
 */
export const getFormPath = pipe(
  replace(']', ''),
  split('[')
);

/**
 * Group fields by section
 *
 * Returns config of fields in sections based on the `section` prop, e.g.
 *
 * ```js
 * {
 *   foo: {
 *     section: 'Section1'
 *   },
 *   bar: {
 *     section: 'Section2'
 *   },
 * }
 * ```
 * becomes
 * ```js
 * {
 *  Section1: {
 *    foo: {
 *   },
 *  }
 *  Section2: {
 *    bar: {
 *   },
 *  }
 * }
 * ```
 *
 * @param {object}
 * @returns {object}
 */
export const groupFieldsBySection = pipe(
  values,
  groupBy(propOr('', 'section'))
);

/**
 * Group errors by room index
 *
 * Groups form errors from the backend by accommodation
 * product room index.  For example, if one room type has 2
 * rooms then it will group errors like
 *
 * ```js
 * {
 *  0: [{ error: 'room 1 error' }],
 *  1: [{ error: 'room 2 error' }]
 * }
 * ```
 *
 * @param {object}
 * @returns {object}
 */
export const groupErrorsByRoomIndex = pipe(
  groupBy(prop('accommodationProductRequestIndex')),
  values
);

/**
 * Replace accommodation with room
 *
 * Replace the word accommodation with the
 * word 'room'
 *
 * @param {array}
 * @return {array}
 */
export const replaceAccommodationWithRoom = mapWithIndex((data, i) =>
  map(
    pipe(
      prop('message'),
      replace(/Accommodation #[0-9]/g, `${i18n.t('room')} ${inc(i)}`)
    ),
    data
  )
);
