import { createSelector } from 'reselect';
import { __, prop, pipe, curry, propOr, map, when, complement, isNil, reduce, uniq, values } from 'ramda';

import { selectRelationships } from 'store/common/selectors';

import schema from './schema';

const reduceByKey = curry((key, accum, value) => (value ? [...accum, prop(key, value)] : accum));

const getMapped = key =>
  pipe(
    values,
    reduce(reduceByKey(key), []),
    uniq
  );

export const getHotels = prop('hotels');

export const getHotelsStatus = pipe(
  getHotels,
  prop('status')
);

export const getHotelsData = state =>
  pipe(
    getHotels,
    prop('data'),
    when(complement(isNil), map(selectRelationships(state, propOr({}, 'relationships', schema))))
  )(state);

export const getHotelRegions = createSelector(
  getHotelsData,
  getMapped('region')
);

export const getHotelStarRatings = createSelector(
  getHotelsData,
  getMapped('starRating')
);

export const getHotel = curry((state, id) =>
  pipe(
    getHotelsData,
    prop(id)
  )(state)
);

export const getHotelName = curry((state, id) =>
  pipe(
    getHotel(__, id),
    prop('name')
  )(state)
);
