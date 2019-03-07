import { __, prop, pipe, curry, propOr, map, when, complement, isNil } from 'ramda';

import { selectRelationships } from 'store/common/selectors';

import schema from './schema';

export const getHotels = prop('hotels');

export const getHotelsData = state =>
  pipe(
    getHotels,
    prop('data'),
    when(complement(isNil), map(selectRelationships(state, propOr({}, 'relationships', schema))))
  )(state);

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
