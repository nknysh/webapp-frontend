import { head, lensProp, map, mergeDeepRight, partial, pick, pipe, prop, propOr, set, isEmpty, filter } from 'ramda';

import { createSelector } from 'store/utils';
import { getData, getStatus, getEntities, getResults, getArg } from 'store/common';
import { extractAges } from 'store/modules/bookings/utils';

import { getMapped, reduceArrayByKey } from 'utils';

/**
 * Get hotels selector
 *
 * @param {object}
 * @returns {object}
 */
export const getHotels = prop('hotels');

/**
 * Get products selector
 *
 * Returns all products for all hotels
 *
 * @param {object}
 * @returns {object}
 */
const getProducts = pipe(
  getHotels,
  getEntities,
  prop('products')
);

/**
 * Get rates selector
 *
 * Returns all rates for all hotels
 *
 * @param {object}
 * @returns {object}
 */
const getRates = pipe(
  getHotels,
  getEntities,
  prop('rates')
);

/**
 * Get uploads selector
 *
 * Returns all uploads for all hotels
 *
 * @param {object}
 * @returns {object}
 */
const getUploads = pipe(
  getHotels,
  getEntities,
  prop('uploads')
);

/**
 * Get hotels status selector
 *
 * @param {object}
 * @returns {object}
 */
export const getHotelsStatus = pipe(
  getHotels,
  getStatus
);

/**
 * Get hotels data selector
 *
 * @param {object}
 * @returns {*}
 */
export const getHotelsData = state =>
  pipe(
    getHotels,
    getData
  )(state);

/**
 * Get hotels results selector
 *
 * @param {object}
 * @returns {string | Array}
 */
export const getHotelsResults = pipe(
  getHotels,
  getResults
);

export const getHotelsEntities = pipe(
  getHotels,
  getEntities,
  prop('hotels')
);

/**
 * Get hotels status selector
 *
 * @param {object}
 * @param {string}
 * @returns {object}
 */
export const getHotel = createSelector(
  [getArg(1), getHotelsEntities],
  prop
);

/**
 * Get hotels uploads selector
 *
 * Returns all uploads for given upload uuids
 *
 * @param {object}
 * @param {Array}
 * @returns {object}
 */
export const getHotelsUploads = createSelector(
  [getArg(1), getUploads],
  pick
);

/**
 * Get hotels upload selector
 *
 * Returns upload object for given upload uuid
 *
 * @param {object}
 * @param {string}
 * @returns {object}
 */
export const getHotelsUpload = createSelector(
  [getArg(1), getUploads],
  prop
);

/**
 * Get hotels rates selector
 *
 * Returns all rates for given rate uuids
 *
 * @param {object}
 * @param {Array}
 * @returns {object}
 */
export const getHotelsRates = createSelector(
  [getArg(1), getRates],
  pick
);

/**
 * Get hotels rate selector
 *
 * Returns rate object for given rate uuid
 *
 * @param {object}
 * @param {string}
 * @returns {object}
 */
export const getHotelsRate = createSelector(
  [getArg(1), getRates],
  prop
);

/**
 * Get product ids selector
 *
 * @param {object}
 * @param {string}
 * @return {Array}
 */
const getProductIds = createSelector(
  getHotel,
  propOr([])
);

/**
 * Get hotel products selector
 *
 * Returns all products for a given hotel
 *
 * @param {object}
 * @param {string}
 * @return {object}
 */
export const getHotelProducts = createSelector(
  getProductIds,
  getProducts,
  pick
);

/**
 * Get hotel products by ids selector
 *
 * Returns all products by their given ids
 *
 * @param {object}
 * @param {Array}
 * @returns {object}
 */
export const getHotelProductsByIds = createSelector(
  [getArg(1), getProducts],
  pick
);

/**
 * Get hotel product selector
 *
 * Returns a single product given it's ID
 *
 * @param {object}
 * @param {string}
 * @returns {object}
 */
export const getHotelProduct = createSelector(
  [getArg(1), getProducts],
  prop
);

/**
 * Get hotel regions selector
 *
 * Returns all regions for all hotels
 *
 * @param {object}
 * @returns {object}
 */
export const getHotelRegions = createSelector(
  getHotelsEntities,
  getMapped('region')
);

/**
 * Get hotel star ratings selector
 *
 * Returns all star ratings for all hotels
 *
 * @param {object}
 * @returns {object}
 */
export const getHotelStarRatings = createSelector(
  getHotelsEntities,
  getMapped('starRating')
);

/**
 * Get hotel features selector
 *
 * Returns all features for all hotels
 *
 * @param {object}
 * @returns {object}
 */
export const getHotelFeatures = createSelector(
  getHotelsEntities,
  getMapped('amenities', reduceArrayByKey)
);

/**
 * Get hotel name selector
 *
 * @param {object}
 * @param {string}
 * @returns {string}
 */
export const getHotelName = createSelector(
  getHotel,
  prop('name')
);

/**
 * Get hotel default currency
 *
 * Returns the currency symbol for the default currency attached to the hotel
 *
 * @param {object}
 * @param {string}
 * @returns {string}
 */
export const getHotelDefaultCurrency = createSelector(
  getHotel,
  prop('defaultCurrency')
);

/**
 * Get hotels acommodation products selector
 *
 * Returns all accommodation products for a given hotel
 *
 * @param {object}
 * @param {string}
 * @returns {object}
 */
export const getHotelsAccommodationProducts = createSelector(
  [getHotel, getProducts],
  (hotel, products) => pick(propOr([], 'accommodationProducts', hotel), products)
);

/**
 * Get hotel room selector
 *
 * Get the accommodation product from the hotels products
 * given the accommodation product uuid
 *
 * @param {object}
 * @param {string}
 * @param {string}
 * @returns {object}
 */
export const getHotelRoom = createSelector(
  [getArg(2), getHotelsAccommodationProducts],
  prop
);

/**
 * Get hotel room name selector
 *
 * @param {object}
 * @param {string}
 * @param {string}
 * @returns {string}
 */
export const getHotelRoomName = createSelector(
  getHotelRoom,
  prop('name')
);

/**
 * Get hotel room rates selector
 *
 * @param {object}
 * @param {string}
 * @param {string}
 * @returns {Array}
 */
export const getHotelRoomRates = createSelector(
  getHotelRoom,
  prop('rates')
);

/**
 * Get hotel room options selector
 *
 * @param {object}
 * @param {string}
 * @param {string}
 * @returns {object}
 */
export const getHotelRoomOptions = createSelector(
  getHotelRoom,
  prop('options')
);

/**
 * Get hotel featured photo selector
 *
 * @param {object}
 * @param {string}
 * @returns {string}
 */
export const getHotelFeaturedPhoto = createSelector(
  [getHotel, getArg(0)],
  (hotel, state) =>
    pipe(
      propOr([], 'featuredPhotos'),
      head,
      partial(getHotelsUpload, [state])
    )(hotel)
);

/**
 * Get hotel product age ranges selector
 *
 * @param {object}
 * @param {string}
 * @returns {string}
 */
export const getHotelProductAgeRanges = createSelector(
  getHotelProduct,
  extractAges
);

/**
 * Get hotels from search results selector
 *
 * @param {object} state
 * @param {Array} ids
 * @returns {string}
 */
export const getHotelsFromSearchResults = (state, ids = []) =>
  map(id => set(lensProp('featuredPhoto'), getHotelFeaturedPhoto(state, id), getHotel(state, id)), ids);

/**
 * Get hotels photos selector
 *
 * @param {object}
 * @param {string}
 * @returns {object}
 */
export const getHotelsPhotos = createSelector(
  [getHotel, getUploads],
  (hotel, uploads) => {
    if (!hotel || !uploads || isEmpty(hotel) || isEmpty(uploads)) {
      return {};
    }

    return filter(
      upload => upload.ownerType === 'Hotel' && upload.tag === 'photo' && upload.ownerUuid === hotel.uuid,
      uploads
    );
  }
);

/**
 * Get hotels rooms photos selector
 *
 * @param {object}
 * @param {string}
 * @returns {object}
 */
export const getHotelsRoomsPhotos = createSelector(
  [getHotelRoom, getUploads],
  (hotel, uploads) => pick(propOr([], 'uploads', hotel), uploads)
);

/**
 * Get hotels brochures selector
 *
 * @param {object}
 * @param {string}
 * @returns {object}
 */
export const getHotelsBrochures = createSelector(
  [getHotel, getUploads],
  (hotel, uploads) => pick(propOr([], 'brochures', hotel), uploads)
);

/**
 * Get hotels ground service products selector
 *
 * @param {object}
 * @param {string}
 * @returns {object}
 */
export const getHotelsGroundServiceProducts = createSelector(
  [getHotel, getProducts],
  (hotel, products) => pick(propOr([], 'groundServiceProducts', hotel), products)
);

/**
 * Get hotels transfer products selector
 *
 * @param {object}
 * @param {string}
 * @returns {object}
 */
export const getHotelsTransferProducts = createSelector(
  [getHotel, getProducts],
  (hotel, products) => pick(propOr([], 'transferProducts', hotel), products)
);

/**
 * Get hotels fine products selector
 *
 * @param {object}
 * @param {string}
 * @returns {object}
 */
export const getHotelsFineProducts = createSelector(
  [getHotel, getProducts],
  (hotel, products) => pick(propOr([], 'fineProducts', hotel), products)
);

/**
 * Get hotels supplement products selector
 *
 * @param {object}
 * @param {string}
 * @returns {object}
 */
export const getHotelsSupplementProducts = createSelector(
  [getHotel, getProducts],
  (hotel, products) => pick(propOr([], 'supplementProducts', hotel), products)
);

/**
 * Get hotels addons products selector
 *
 * Addons are combination of fines and supplements
 *
 * @param {object}
 * @param {string}
 * @returns {object}
 */
export const getHotelAddons = createSelector(
  [getHotelsFineProducts, getHotelsSupplementProducts],
  mergeDeepRight
);
