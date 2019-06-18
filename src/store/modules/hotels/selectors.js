import {
  forEach,
  head,
  partial,
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
  mergeDeepRight,
} from 'ramda';

import { createSelector } from 'store/utils';
import { getData, getStatus, getEntities, getResults, getArg } from 'store/common';

import { getMapped, reduceArrayByKey } from 'utils';

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

const getProducts = pipe(
  getHotels,
  getEntities,
  prop('products')
);

const getRates = pipe(
  getHotels,
  getEntities,
  prop('rates')
);

const getUploads = pipe(
  getHotels,
  getEntities,
  prop('uploads')
);

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

export const getHotel = createSelector(
  [getArg(1), getHotelsEntities],
  prop
);

export const getHotelsUploads = createSelector(
  [getArg(1), getUploads],
  pick
);

export const getHotelsUpload = createSelector(
  [getArg(1), getUploads],
  prop
);

export const getHotelsRates = createSelector(
  [getArg(1), getRates],
  pick
);

export const getHotelsRate = createSelector(
  [getArg(1), getRates],
  prop
);

const getProductIds = createSelector(
  [getHotel],
  propOr([])
);

export const getHotelProducts = createSelector(
  getProductIds,
  getProducts,
  pick
);

export const getHotelProductsByIds = createSelector(
  [getArg(1), getProducts],
  pick
);

export const getHotelProduct = createSelector(
  [getArg(1), getProducts],
  prop
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

export const getHotelName = createSelector(
  getHotel,
  prop('name')
);

export const getHotelsAccommodationProducts = createSelector(
  [getHotel, getProducts],
  (hotel, products) => pick(propOr([], 'accommodationProducts', hotel), products)
);

export const getHotelRoom = createSelector(
  [getHotelsAccommodationProducts],
  prop
);

export const getHotelRoomName = createSelector(
  getHotelRoom,
  prop('name')
);

export const getHotelRoomRates = createSelector(
  getHotelRoom,
  prop('rates')
);

export const getHotelRoomOptions = createSelector(
  getHotelRoom,
  prop('options')
);

export const getHotelFeaturedPhoto = createSelector(
  [getHotel, getArg(0)],
  (hotel, state) =>
    pipe(
      propOr([], 'featuredPhotos'),
      head,
      partial(getHotelsUpload, [state])
    )(hotel)
);

export const getHotelProductAgeRanges = createSelector(
  getHotelProduct,
  extractAges
);

export const getHotelsFromSearchResults = (state, ids = []) =>
  map(id => set(lensProp('featuredPhoto'), getHotelFeaturedPhoto(state, id), getHotel(state, id)), ids);

export const getHotelsPhotos = createSelector(
  [getHotel, getUploads],
  (hotel, uploads) => pick(propOr([], 'photos', hotel), uploads)
);

export const getHotelsRoomsPhotos = createSelector(
  [getHotelRoom, getUploads],
  (hotel, uploads) => pick(propOr([], 'uploads', hotel), uploads)
);

export const getHotelsBrochures = createSelector(
  [getHotel, getUploads],
  (hotel, uploads) => pick(propOr([], 'brochures', hotel), uploads)
);

export const getHotelsGroundServiceProducts = createSelector(
  [getHotel, getProducts],
  (hotel, products) => pick(propOr([], 'groundServiceProducts', hotel), products)
);

export const getHotelsTransferProducts = createSelector(
  [getHotel, getProducts],
  (hotel, products) => pick(propOr([], 'transferProducts', hotel), products)
);

export const getHotelsFineProducts = createSelector(
  [getHotel, getProducts],
  (hotel, products) => pick(propOr([], 'fineProducts', hotel), products)
);

export const getHotelsSupplementProducts = createSelector(
  [getHotel, getProducts],
  (hotel, products) => pick(propOr([], 'supplementProducts', hotel), products)
);

export const getHotelAddons = createSelector(
  [getHotelsFineProducts, getHotelsSupplementProducts],
  mergeDeepRight
);
