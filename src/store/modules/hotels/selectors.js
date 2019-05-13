import { createSelector } from 'reselect';
import {
  __,
  curry,
  forEach,
  head,
  ifElse,
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
  values,
} from 'ramda';

import { getData, getStatus, getEntities, getResults } from 'store/common';

import { getMapped, reduceArrayByKey, isArray } from 'utils';

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

export const getHotelsUploads = curry((state, ids) =>
  pipe(
    getHotels,
    getEntities,
    prop('uploads'),
    pick(ids)
  )(state)
);

export const getHotelsUpload = curry((state, id) =>
  pipe(
    getHotels,
    getEntities,
    prop('uploads'),
    prop(id)
  )(state)
);

export const getHotelsRates = curry((state, ids) =>
  pipe(
    getHotels,
    getEntities,
    prop('rates'),
    pick(ids)
  )(state)
);

export const getHotelsRate = curry((state, id) =>
  pipe(
    getHotels,
    getEntities,
    prop('rates'),
    prop(id)
  )(state)
);

export const getHotelProducts = curry((state, id, type) => {
  const hotelProductsIds = pipe(
    getHotel(state),
    propOr([], type)
  )(id);

  const products = pipe(
    getHotels,
    getEntities,
    prop('products')
  )(state);

  return ifElse(isArray, pick(__, products), prop(__, products))(hotelProductsIds);
});

export const getHotelProduct = curry((state, id) =>
  pipe(
    getHotels,
    getEntities,
    prop('products'),
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

export const getHotelRooms = curry((state, id) => getHotelProducts(state, id, 'accommodationProducts'));

export const getHotelRoom = curry((state, hotelId, roomId) =>
  pipe(
    getHotelRooms(__, hotelId),
    prop(roomId)
  )(state)
);

export const getHotelFeaturedPhoto = curry((state, id) =>
  pipe(
    getHotel(__, id),
    prop('featuredPhotos'),
    head,
    getHotelsUpload(state)
  )(state)
);

export const getHotelProductAgeRanges = curry((state, id) =>
  pipe(
    getHotelProduct(state),
    extractAges
  )(id)
);

export const getHotelsFromSearchResults = (state, ids = []) =>
  map(id => set(lensProp('featuredPhoto'), getHotelFeaturedPhoto(state, id), getHotel(state, id)), ids);
