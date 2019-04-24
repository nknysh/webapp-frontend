import { createSelector } from 'reselect';
import {
  __,
  curry,
  forEach,
  lensProp,
  map,
  mapObjIndexed,
  path,
  pathOr,
  pick,
  pipe,
  prop,
  propOr,
  reduce,
  set,
  uniq,
  values,
} from 'ramda';

import { getData, getStatus, getEntities, getResults } from 'store/common/selectors';

const reduceByKey = curry((key, accum, value) => (value ? [...accum, prop(key, value)] : accum));
const reduceArrayByKey = curry((key, accum, value) => (value ? [...accum, ...propOr([], key, value)] : accum));

const getMapped = (key, reducer = reduceByKey) =>
  pipe(
    values,
    reduce(reducer(key), []),
    uniq
  );

const extractAgeFromOptions = (accum, rate) => {
  const products = path(['entities', 'products'], rate);

  mapObjIndexed(product => {
    const ages = pathOr([], ['options', 'ages'], product);

    forEach(({ name, ...age }) => {
      const ageLens = lensProp(name);
      accum = set(ageLens, age, accum);
    }, ages);
  }, products);

  return accum;
};

const extractAges = pipe(
  prop('rates'),
  values,
  reduce(extractAgeFromOptions, {})
);

export const getHotels = prop('hotels');

export const getHotelsStatus = pipe(
  getHotels,
  getStatus
);

export const getHotelsData = state =>
  pipe(
    getHotels,
    getData
  )(state);

export const getHotelsResults = pipe(
  getHotels,
  getResults
);

export const getHotelsEntities = pipe(
  getHotels,
  getEntities,
  prop('hotels')
);

export const getHotelsPhotos = curry((state, ids) =>
  pipe(
    getHotelsEntities,
    propOr([], 'photos'),
    pick(ids)
  )(state)
);

export const getHotelsPhoto = curry((state, id) =>
  pipe(
    getHotelsEntities,
    propOr([], 'photos'),
    prop(id)
  )(state)
);

export const getHotelRegions = createSelector(
  getHotelsEntities,
  getMapped('region')
);

export const getHotelStarRatings = createSelector(
  getHotelsEntities,
  getMapped('starRating')
);

export const getHotelFeatures = createSelector(
  getHotelsEntities,
  getMapped('amenities', reduceArrayByKey)
);

export const getHotel = curry((state, id) =>
  pipe(
    getHotelsEntities,
    prop(id)
  )(state)
);

export const getHotelName = curry((state, id) =>
  pipe(
    getHotel(__, id),
    prop('name')
  )(state)
);

export const getHotelRooms = curry((state, id) =>
  pipe(
    getHotel(__, id),
    prop('accommodationProducts'),
    getAccommodationProducts(state)
  )(state)
);

export const getHotelRoom = curry((state, hotelId, roomId) =>
  pipe(
    getHotelRooms(__, hotelId),
    prop(roomId)
  )(state)
);

export const getHotelFeaturedPhoto = curry((state, id) =>
  pipe(
    getHotel(__, id),
    prop('featuredPhotoUploadUuid'),
    getHotelsPhoto(state)
  )(state)
);

export const getAccommodationProducts = curry((state, ids) =>
  pipe(
    getHotels,
    getEntities,
    prop('accommodationProducts'),
    pick(ids)
  )(state)
);

export const getAccommodationProduct = curry((state, id) =>
  pipe(
    getHotels,
    getEntities,
    prop('accommodationProducts'),
    prop(id)
  )(state)
);

export const getAccommodationProductAgeRanges = curry((state, id) =>
  pipe(
    getAccommodationProduct(state),
    extractAges
  )(id)
);

export const getHotelsFromSearchResults = (state, ids = []) =>
  map(id => set(lensProp('featuredPhoto'), getHotelFeaturedPhoto(state, id), getHotel(state, id)), ids);
