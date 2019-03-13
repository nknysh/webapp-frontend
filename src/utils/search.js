import {
  __,
  always,
  cond,
  curry,
  defaultTo,
  either,
  equals,
  gt,
  head,
  isEmpty,
  isNil,
  join,
  keys,
  lt,
  map,
  pickBy,
  pipe,
  prop,
  reduce,
  replace,
  T,
  tail,
  values,
  without,
} from 'ramda';

export const IndexTypes = Object.freeze({
  HOTELS: 'hotels',
  COUNTRIES: 'countries',
});

export const RegionSelectTypes = Object.freeze({
  ALL: 'all',
  SPECIFY: 'specify',
});

export const querySearchType = ({ value, type }) =>
  cond([
    [equals(IndexTypes.COUNTRIES), always(`+country:${replace(/[- ]/g, ' +country:', value || '')}`)],
    [equals(IndexTypes.HOTELS), always(`+name:${replace(/ /g, ' AND +name:', value || '')}`)],
    [T, always(undefined)],
  ])(type);

const buildSearchField = curry((presence, field, value) => ` ${presence}${field}:${value}`);

export const queryFilterRegions = ({ selected, type }, regions) =>
  equals(RegionSelectTypes.SPECIFY, type)
    ? pipe(
        pickBy(equals(true)),
        keys,
        without(__, regions),
        map(buildSearchField('-', 'region')),
        values,
        join(' OR ')
      )(selected)
    : undefined;

export const queryPreferred = () => buildSearchField('', 'preferred', 'true');
export const queryHoneymooners = ({ honeymooners }) =>
  honeymooners ? buildSearchField('', 'suitableForHoneymooners', 'true^5') : undefined;
export const queryAvailable = () => buildSearchField('+', 'availableForOnlineBooking', 'true^5');

export const searchByQueries = curry((index, queries = []) => index.search(join(' ', queries)));

const reduceByRange = curry((selector, range, key, accum, result) => {
  if (isEmpty(range)) return [...accum, result];

  const ref = prop('ref', result);
  const resultObject = selector(ref);
  const min = head(range);
  const max = head(tail(range));
  const propValue = prop(key, resultObject);

  const returnAccum = always(accum);

  const checkRange = cond([
    // Empty
    [either(isNil, isEmpty), returnAccum],

    // Less than min
    [lt(__, min), returnAccum],

    // Greater than max
    [gt(__, max), returnAccum],

    // Add to reduced
    [T, always([...accum, result])],
  ]);

  return checkRange(propValue);
});

export const filterByRange = curry((selector, range, key, results) =>
  reduce(reduceByRange(selector, range, key), [], defaultTo([], results))
);
