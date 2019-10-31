import {
  add,
  always,
  any,
  append,
  assoc,
  assocPath,
  complement,
  concat,
  defaultTo,
  equals,
  evolve,
  filter,
  find,
  groupBy,
  has,
  head,
  invoker,
  last,
  length,
  lensProp,
  map,
  mapObjIndexed,
  omit,
  over,
  partial,
  partialRight,
  path,
  pathEq,
  pathOr,
  pick,
  pickAll,
  pipe,
  prop,
  propEq,
  propOr,
  props,
  reduce,
  reject,
  tap,
  uniq,
  values,
  when,
  unnest,
  flatten,
} from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { createSelector } from 'store/utils';
import { addDays, subDays } from 'date-fns';

import { BOOKINGS_ON_REQUEST } from 'config';
import { ProductTypes, Occassions } from 'config/enums';
import { formatPrice, formatDate, toDate, reduceWithIndex, getCurrencySymbol } from 'utils';

import { getSearchDates } from 'store/modules/search/selectors';
import { isSR } from 'store/modules/auth/selectors';
import { getUser } from 'store/modules/users/selectors';
import { getHotelDefaultCurrency } from 'store/modules/hotels/selectors';

import { getArg, getStatus, getData } from 'store/common';

import { toTotal } from './utils';

/**
 * Reduce offers from products
 *
 * Takes a list of products and reduces all offers from
 * them. Will recurse into sub products infinitely
 *
 * @param {object} accum
 * @param {Array} products
 */
const reduceOffersFromProducts = (accum, products) => {
  // run through all the products
  map(({ offers = [], subProducts }) => {
    // Run through the list of offers
    map(offer => {
      // Add the offer as `offerUuid => data` so as not to duplicate
      accum = assoc(path(['offer', 'uuid'], offer), offer, accum);
    }, offers);

    // Recurse into sub products
    accum = subProducts ? reduce(reduceOffersFromProducts, accum, values(subProducts)) : accum;
  }, products);

  return accum;
};

/**
 * Reduce policies and terms
 *
 * Extracts all the policies and terms from the selected products
 * in the booking
 *
 * @param {Array}
 * @returns {object}
 */
const reducePoliciesAndTerms = reduce((accum, products) => {
  map(({ rateUuid, title, paymentTerms, cancellationPolicy, subProducts }) => {
    if (paymentTerms) {
      accum = assocPath(['paymentTerms', rateUuid], { title, paymentTerms }, accum);
    }

    if (cancellationPolicy) {
      accum = assocPath(['cancellationPolicy', rateUuid], { title, cancellationPolicy }, accum);
    }

    if (!isNilOrEmpty(subProducts)) {
      accum = reducePoliciesAndTerms(accum, values(subProducts));
    }
  }, products);

  return accum;
});

/**
 * Add last day
 *
 * Adds the last day to an array of dates
 *
 * @param {Array} dates * @returns {Array}
 */
const addLastDay = dates => {
  if (isNilOrEmpty(dates)) return dates;

  const lastDate = new Date(last(dates));
  return append(formatDate(addDays(lastDate, 1)), dates);
};

/**
 * Get room total
 *
 * Returns the total value by key (e.g. 'total' or 'totalBeforeDiscount') based
 * on the given room id in the potentail booking
 *
 * @param {string} key
 * @param {string} roomId
 * @param {object} potentialBooking
 * @returns {string}
 */
const getRoomTotal = (key, roomId, potentialBooking) => {
  // Gets all accommodation products for room id
  const productsForRoom = pipe(
    propOr([], ProductTypes.ACCOMMODATION),
    filter(pathEq(['product', 'uuid'], roomId))
  )(potentialBooking);

  // Extracts all the totals from those rooms
  // into one value
  const roomTotals = pipe(
    map(prop(key)),
    toTotal
  )(productsForRoom);

  // Extract all the totals from the sub products of the rooms
  const subProductsTotal = pipe(
    map(
      pipe(
        propOr({}, 'subProducts'),
        mapObjIndexed(
          pipe(
            map(prop(key)),
            toTotal
          )
        ),
        toTotal
      )
    ),
    toTotal
  )(productsForRoom);

  // Add everything up and format the price to string
  return pipe(
    add(roomTotals),
    add(subProductsTotal),
    formatPrice
  )(0);
};

/**
 * Get booking selector
 *
 * @param {object}
 * @returns {object}
 */
export const getBookings = prop('bookings');

/**
 * Get booking status selector
 *
 * @param {object}
 * @returns {string}
 */
export const getBookingStatus = pipe(
  getBookings,
  getStatus
);

/**
 * Get booking data selector
 *
 * @param {object}
 * @returns {*}
 */
export const getBookingData = pipe(
  getBookings,
  getData
);

/**
 * Get bookings created selector
 *
 * @param {object}
 * @returns {object}
 */
export const getBookingsCreated = pipe(
  getBookings,
  propOr({}, 'created')
);

/**
 * Get bookings holds selector
 *
 * @param {object}
 * @returns {object | undefined}
 */
export const getBookingsHolds = pipe(
  getBookings,
  prop('holds')
);

/**
 * Get booking created selector
 *
 * Gets created booking by ID
 *
 * @param {object}
 * @param {string}
 * @returns {object}
 */
export const getBookingCreated = createSelector(
  [getArg(1), getBookingsCreated],
  prop
);

/**
 * Get booking created by value selector
 *
 * Gets created booking by hotel ID
 *
 * @param {object}
 * @param {string}
 * @returns {object}
 */
export const getBookingCreatedByValue = createSelector(
  [getArg(1), getBookingsCreated],
  (id, created) =>
    pipe(
      values,
      find(equals(id))
    )(created)
);

/**
 * Get booking selector
 *
 * @param {object}
 * @param {string}
 * @returns {object}
 */
export const getBooking = createSelector(
  [getArg(1), getBookingData],
  prop
);

/**
 * Get booking breakdown selector
 *
 * @param {object}
 * @param {string}
 * @returns {object}
 */
export const getBookingBreakdown = createSelector(
  getBooking,
  prop('breakdown')
);

/**
 * Get booking uploads selector
 *
 * @param {object}
 * @param {string}
 * @returns {object}
 */
export const getBookingUploads = createSelector(
  getBookingBreakdown,
  prop('uploads')
);

/**
 * Get potential booking selector
 *
 * @param {object}
 * @param {string}
 * @returns {object}
 */
const getPotentialBooking = createSelector(
  getBookingBreakdown,
  prop('potentialBooking')
);

/**
 * Get booking hotel selector
 *
 * @param {object}
 * @param {string}
 * @returns {object}
 */
export const getBookingHotel = createSelector(
  getBookingBreakdown,
  prop('hotel')
);

/**
 * Get booking hotel default currency
 *
 * @param {object}
 * @param {string}
 * @return {string}
 */
export const getBookingHotelDefaultCurrency = createSelector(
  getBookingHotel,
  prop('defaultCurrency')
);

/**
 * Get booking requested build selector
 *
 * @param {object}
 * @param {string}
 * @returns {object}
 */
export const getBookingRequestedBuild = createSelector(
  getBookingBreakdown,
  prop('requestedBuild')
);

/**
 * Get booking product sets selector
 *
 * Returns all products availble to a booking
 *
 * @param {object}
 * @param {string}
 * @returns {object}
 */
export const getBookingProductSets = createSelector(
  getBookingBreakdown,
  prop('availableProductSets')
);

/**
 * Get booking build totals selector
 *
 * @param {object}
 * @param {string}
 * @returns {object}
 */
export const getBookingBuildTotals = createSelector(
  getBookingBreakdown,
  prop('totals')
);

/**
 * Get booking build currency selector
 *
 * @param {object}
 * @param {string}
 * @returns {object}
 */
export const getBookingBuildCurrency = createSelector(
  getBookingBreakdown,
  prop('currency')
);

/**
 * Get booking currency symbol
 *
 * Returns the currency symbol for the booking, starting with the
 * booking currency, if empty then the hotel default currency in the booking,
 * if empty the default currency from the hotel in state
 *
 * @param {object}
 * @param {string}
 * @returns {string}
 */
export const getBookingCurrencySymbol = createSelector(
  [getBookingBuildCurrency, getBookingHotelDefaultCurrency, getHotelDefaultCurrency],
  (bookingCurrencyCode, bookingHotelCurrencyCode, hotelCurrencyCode) =>
    getCurrencySymbol(bookingCurrencyCode || bookingHotelCurrencyCode || hotelCurrencyCode) || ''
);

/**
 * Get booking hash selector
 *
 * @param {object}
 * @param {string}
 * @returns {string}
 */
export const getBookingHash = createSelector(
  getBookingBreakdown,
  prop('bookingHash')
);

/**
 * Get booking available to hold selector
 *
 * @param {object}
 * @param {string}
 * @returns {boolean}
 */
export const getBookingAvailableToHold = createSelector(
  getBookingBreakdown,
  prop('availableToHold')
);

/**
 * Get all booking errors selector
 *
 * @param {object}
 * @param {string}
 * @returns {Array}
 */
export const getAllBookingErrors = createSelector(
  getBookingBreakdown,
  propOr([], 'errors')
);

/**
 * Get booking rooms selector
 *
 * All the selected acommodation products in a booking
 *
 * @param {object}
 * @param {string}
 * @returns {Array}
 */
export const getBookingRooms = createSelector(
  getBookingRequestedBuild,
  propOr([], ProductTypes.ACCOMMODATION)
);

/**
 * Get booking rooms by id selector
 *
 * Get all the accommodation products with the supplied uuid
 *
 * @param {object}
 * @param {string}
 * @param {string}
 * @returns {Array}
 */
export const getBookingRoomsById = createSelector(
  [getBookingRooms, getArg(2)],
  (rooms, uuid) => filter(propEq('uuid', uuid), rooms)
);

/**
 * Get booking room dates by id selector
 *
 * Returns the dates for all accommodation products of the given id
 *
 * @param {object}
 * @param {string}
 * @param {string}
 * @returns {Array}
 */
export const getBookingRoomDatesById = createSelector(
  [getBookingRoomsById, getSearchDates],
  (rooms, searchDates) =>
    map(
      pipe(
        // Extracts start and end date
        pick(['startDate', 'endDate']),

        // Evolve the dates so that if they are empty, they will always
        // default back to the dates supplied to the search
        evolve({
          startDate: pipe(
            when(isNilOrEmpty, always(prop('startDate', searchDates))),
            toDate
          ),
          endDate: pipe(
            when(isNilOrEmpty, always(prop('endDate', searchDates))),
            toDate
          ),
        })
      ),
      rooms
    )
);

/**
 * Get potential booking rooms selector
 *
 * Returns the accommodation products from a potential booking
 *
 * @param {object}
 * @param {string}
 * @returns {Array}
 */
const getPotentialBookingRooms = createSelector(
  getPotentialBooking,
  propOr([], ProductTypes.ACCOMMODATION)
);

/**
 * Get potential booking rooms by id selector
 *
 * Returns the accommodation products from a potential booking for
 * the given ID
 *
 * @param {object}
 * @param {string}
 * @param {string}
 * @returns {Array}
 */
export const getPotentialBookingRoomsById = createSelector(
  [getPotentialBookingRooms, getArg(2)],
  (potentialBookingRooms, roomId) => filter(pathEq(['product', 'uuid'], roomId), potentialBookingRooms)
);

/**
 * Get booking stop errors selector
 *
 * Returns all errors that are of type stop (i.e. fatal)
 *
 * @param {object}
 * @param {string}
 * @returns {Array}
 */
export const getBookingStopErrors = createSelector(
  getAllBookingErrors,
  filter(propEq('type', 'stop'))
);

/**
 * Get booking errors selector
 *
 * Returns all errors that are of type booking (i.e. validation)
 *
 * @param {object}
 * @param {string}
 * @returns {Array}
 */
export const getBookingErrors = createSelector(
  getAllBookingErrors,
  filter(propEq('type', 'booking'))
);

/**
 * Get booking errors selector
 *
 * Returns all errors that are not accomodation product errors
 *
 * @param {object}
 * @param {string}
 * @returns {Array}
 */
export const getBookingNonAccommodationErrors = createSelector(
  getAllBookingErrors,
  reject(has('accommodationProductUuid'))
);

/**
 * Get booking errors by room id selector
 *
 * Returns all errors for a given room ID
 *
 * @param {object}
 * @param {string}
 * @param {string}
 * @returns {Array}
 */
export const getBookingErrorsByRoomId = createSelector(
  [getBookingErrors, getArg(2)],
  (errors, roomId) => filter(propEq('accommodationProductUuid', roomId), errors)
);

/**
 * Get potential dates by room id selector
 *
 * Return dates from potential booking with given ID
 *
 * @param {object}
 * @param {string}
 * @param {string}
 * @returns {Array}
 */
export const getPotentialDatesByRoomId = createSelector(
  getPotentialBookingRoomsById,
  pipe(
    reduce((accum, accom) => concat(accum, propOr([], 'dates', accom)), []),
    addLastDay,
    invoker(0, 'sort')
  )
);

/**
 * Is booking on request selector
 *
 * @param {object}
 * @param {string}
 * @returns {boolean}
 */
export const isBookingOnRequest = createSelector(
  getBookingBuildTotals,
  totals => BOOKINGS_ON_REQUEST || propOr(false, 'oneOrMoreItemsOnRequest', totals)
);

/**
 * Get can booking hold selector
 *
 * Whether abooking is avilable to hold or not
 *
 * @param {object}
 * @param {string}
 * @returns {boolean}
 */
export const getBookingCanHold = createSelector(
  getBooking,
  path(['breakdown', 'availableToHold'])
);

/**
 * Get booking room meal plans selector
 *
 * Returns all meal plans for a given room
 *
 * @param {object}
 * @param {string}
 * @param {string}
 * @returns {Array}
 */
export const getBookingRoomMealPlans = createSelector(
  [getBookingProductSets, getArg(2)],
  (productSets, roomId) =>
    pipe(
      propOr([], ProductTypes.ACCOMMODATION),
      filter(
        pipe(
          prop('products'),
          any(propEq('uuid', roomId))
        )
      ),
      map(path(['availableSubProductSets', ProductTypes.MEAL_PLAN]))
    )(productSets)
);

/**
 * Get booking addons selector
 *
 * Returns all meal plans for a given room
 *
 * @param {object}
 * @param {string}
 * @param {string}
 * @returns {Array}
 */
export const getBookingAddons = createSelector(
  getBookingProductSets,
  pipe(
    defaultTo({}),
    // Addons are products of types specified in the array below
    props([ProductTypes.SUPPLEMENT, ProductTypes.FINE]),

    // Combines all into one object
    reduce((accum, products) => (isNilOrEmpty(products) ? accum : concat(products, accum)), [])
  )
);

/**
 * Get booking travel agent selector
 *
 * Returns the travel agent uuid on the booking
 *
 * @param {object}
 * @param {string}
 * @returns {string}
 */
export const getBookingTravelAgent = createSelector(
  getBooking,
  prop('travelAgentUserUuid')
);

/**
 * Get booking transfers selector
 *
 * Returns all the transfer products available to a booking
 *
 * @param {object}
 * @param {string}
 * @returns {Array}
 */
export const getBookingTransfers = createSelector(
  getBookingProductSets,
  pipe(
    defaultTo({}),
    propOr([], ProductTypes.TRANSFER)
  )
);

/**
 * Get booking requested transfers selector
 *
 * Returns all the selected transfer products in a booking
 *
 * @param {object}
 * @param {string}
 * @returns {Array}
 */
export const getBookingRequestedTransfers = createSelector(
  getBookingRequestedBuild,
  pipe(
    defaultTo({}),
    propOr([], ProductTypes.TRANSFER)
  )
);

/**
 * Get booking requested ground services selector
 *
 * Returns all the selected ground service products in a  booking
 *
 * @param {object}
 * @param {string}
 * @returns {Array}
 */
export const getBookingRequestedGroundServices = createSelector(
  getBookingRequestedBuild,
  pipe(
    defaultTo({}),
    propOr([], ProductTypes.GROUND_SERVICE)
  )
);

/**
 * Get booking requested supplements selector
 *
 * Returns all the selected supplement products in a booking
 *
 * @param {object}
 * @param {string}
 * @returns {Array}
 */
export const getBookingRequestedSupplements = createSelector(
  getBookingRequestedBuild,
  pipe(
    defaultTo({}),
    propOr([], ProductTypes.SUPPLEMENT)
  )
);

/**
 * Get booking requested fines selector
 *
 * Returns all the selected fine products in a booking
 *
 * @param {object}
 * @param {string}
 * @returns {Array}
 */
export const getBookingRequestedFines = createSelector(
  getBookingRequestedBuild,
  pipe(
    defaultTo({}),
    propOr([], ProductTypes.FINE)
  )
);

/**
 * Get booking ground services selector
 *
 * Returns all the ground services products available to a booking
 *
 * @param {object}
 * @param {string}
 * @returns {Array}
 */
export const getBookingGroundServices = createSelector(
  getBookingProductSets,
  pipe(
    defaultTo({}),
    propOr([], ProductTypes.GROUND_SERVICE)
  )
);

/**
 * Get potential booking room supplements selector
 *
 * Returns all the supplement products types for the given room ID
 *
 * @param {object}
 * @param {string}
 * @param {string}
 * @returns {Array}
 */
export const getPotentialBookingRoomSupplements = createSelector(
  getPotentialBookingRoomsById,
  map(pathOr([], ['subProducts', ProductTypes.SUPPLEMENT]))
);

/**
 * Get potential booking room meal plans selector
 *
 * Returns all the meal plan products types for the given room ID
 *
 * @param {object}
 * @param {string}
 * @param {string}
 * @returns {Array}
 */
export const getPotentialBookingRoomMealPlans = createSelector(
  getPotentialBookingRoomsById,
  map(pathOr([], ['subProducts', ProductTypes.MEAL_PLAN]))
);

/**
 * Get booking room meal plan selector
 *
 * Returns the meal plans for a room with given ID in a string
 * format of `"['uuid1', 'uuid2', 'uuid3']"` so that it can be used
 * as a single checkbox or radio button value
 *
 * @param {object}
 * @param {string}
 * @param {string}
 * @returns {string}
 */
export const getBookingRoomMealPlan = createSelector(
  getBookingRoomsById,
  pipe(
    reduce(
      (accum, room) =>
        pipe(
          pathOr([], ['subProducts', ProductTypes.MEAL_PLAN]),
          map(prop('uuid')),
          concat(accum)
        )(room),
      []
    ),
    uniq,
    JSON.stringify
  )
);

/**
 * Get booking room total selector
 *
 * Returns the total for a given room type ID
 *
 * @param {object}
 * @param {string}
 * @param {string}
 * @returns {string}
 */
export const getBookingRoomTotal = createSelector(
  [getArg(2), getPotentialBooking],
  partial(getRoomTotal, ['total'])
);

/**
 * Get booking room total before discount selector
 *
 * Returns the total before discount for a given room type ID
 *
 * @param {object}
 * @param {string}
 * @param {string}
 * @returns {string}
 */
export const getBookingRoomTotalBeforeDiscount = createSelector(
  [getArg(2), getPotentialBooking],
  partial(getRoomTotal, ['totalBeforeDiscount'])
);

/**
 * Get booking text offers selector
 *
 * Returns text only offers for the booking
 *
 * @param {object}
 * @param {string}
 * @param {string}
 * @returns {Array}
 */
export const getBookingTextOffers = createSelector(
  getBookingBreakdown,
  propOr([], 'textOnlyOffersPerLodging')
);

/**
 * Get booking room offers selector
 *
 * Returns all the offers applied to the current booking, including
 * sub product offers
 *
 * @param {object}
 * @param {string}
 * @param {string}
 * @returns {Array}
 */
export const getBookingRoomOffers = createSelector(
  [getArg(2), getPotentialBooking, getBookingTextOffers],
  (roomId, potentialBooking, textOffers) =>
    pipe(
      propOr([], ProductTypes.ACCOMMODATION),

      // Get only the products for the given ID
      filter(pathEq(['product', 'uuid'], roomId)),

      // Collect all the offers
      reduceWithIndex((accum, product, i) => {
        // Run through top level product
        map(
          offer => {
            accum = assoc(path(['offer', 'uuid'], offer), offer, accum);
          },

          // Combine all the text offers for this rooms with the offers from the product
          [...propOr([], i, textOffers), ...propOr([], 'offers', product)]
        );

        // Run through all the sub products of a product
        map(
          map(subProduct => {
            map(offer => {
              accum = assoc(path(['offer', 'uuid'], offer), offer, accum);
            }, propOr([], 'offers', subProduct));
          }),
          propOr([], 'subProducts', product)
        );

        return accum;
      }, {}),
      values
    )(potentialBooking)
);

/**
 * Get booking totals selector
 *
 * Returns the totals object from the booking breakdown
 *
 * @param {object}
 * @param {string}
 * @returns {object}
 */
export const getBookingTotals = createSelector(
  getBooking,
  propOr({ total: formatPrice(0) }, 'totals')
);

/**
 * Get booking total selector
 *
 * Returns the final total for the entire booking
 *
 * @param {object}
 * @param {string}
 * @returns {string}
 */
export const getBookingTotal = createSelector(
  getBookingBreakdown,
  pipe(
    pathOr(0, ['totals', 'total']),
    formatPrice
  )
);

/**
 * Get booking total before discount selector
 *
 * Returns the final total before discount for the entire booking
 *
 * @param {object}
 * @param {string}
 * @returns {string}
 */
export const getBookingTotalBeforeDiscount = createSelector(
  getBookingBreakdown,
  pipe(
    pathOr(0, ['totals', 'totalBeforeDiscount']),
    formatPrice
  )
);

/**
 * Get booking builder selector
 *
 * Gets a booking builder object from the booking in state
 *
 * @param {object}
 * @param {string}
 * @returns {object}
 */
export const getBookingForBuilder = createSelector(
  getBooking,
  booking => {
    const hotelUuid = prop('hotelUuid', booking);

    let dates = [];
    let guestAges = {};

    // Run through the accommodation products and sanitize
    const sanitizeAccommodationProducts = pipe(
      evolve({
        // Formats the date to be accepted by backend
        startDate: when(complement(isNilOrEmpty), formatDate),

        // Removes the final day so backend accepts the days
        endDate: when(
          complement(isNilOrEmpty),
          pipe(
            partialRight(subDays, [1]),
            formatDate
          )
        ),
      }),

      // Push dates to the total dates array
      tap(
        pipe(
          props(['startDate', 'endDate']),
          accomDates => (dates = concat(dates, accomDates))
        )
      ),

      // Push ages to guestAges total object
      tap(
        pipe(
          prop('guestAges'),
          ages => {
            if (prop('numberOfAdults', ages)) {
              guestAges = over(
                lensProp('numberOfAdults'),
                pipe(
                  defaultTo(0),
                  add(prop('numberOfAdults', ages))
                ),
                guestAges
              );
            }
            if (prop('agesOfAllChildren', ages)) {
              guestAges = over(
                lensProp('agesOfAllChildren'),
                pipe(
                  defaultTo([]),
                  concat(prop('agesOfAllChildren', ages))
                ),
                guestAges
              );
            }
          }
        )
      ),

      // Temp remove occasions from guestAges
      over(lensProp('guestAges'), omit([...values(Occassions), 'repeatCustomer']))
    );

    // Finally, rebuild all the products into a new array
    const products = {
      [ProductTypes.ACCOMMODATION]: map(
        sanitizeAccommodationProducts,
        pathOr([], ['breakdown', 'requestedBuild', ProductTypes.ACCOMMODATION], booking)
      ),
      [ProductTypes.TRANSFER]: pathOr([], ['breakdown', 'requestedBuild', ProductTypes.TRANSFER], booking),
      [ProductTypes.GROUND_SERVICE]: pathOr([], ['breakdown', 'requestedBuild', ProductTypes.GROUND_SERVICE], booking),
      [ProductTypes.SUPPLEMENT]: pathOr([], ['breakdown', 'requestedBuild', ProductTypes.SUPPLEMENT], booking),
      [ProductTypes.FINE]: pathOr([], ['breakdown', 'requestedBuild', ProductTypes.FINE], booking),
    };

    // Sort the final dates
    dates.sort();

    // Final booking builder payload
    return {
      hotelUuid,
      startDate: head(dates),
      endDate: last(dates),
      ...products,
      ...(!isNilOrEmpty(guestAges) && { guestAges }),
    };
  }
);

/**
 * Get booking holds selector
 *
 * Returns all holds in a booking
 *
 * @param {object}
 * @param {string}
 * @returns {object}
 */
export const getBookingHolds = createSelector(
  [getArg(1), getBookingsHolds],
  prop
);

/**
 * Get booking room holds selector
 *
 * Returns all holds for a given room type
 *
 * @param {object}
 * @param {string}
 * @returns {Array}
 */
export const getBookingRoomHolds = createSelector(
  [getArg(2), getBookingHolds],
  (uuid, hold) =>
    pipe(
      propOr([], 'breakdown'),
      filter(propEq('productUuid', uuid))
    )(hold)
);

/**
 * Get booking room photo selector
 *
 * Returns the first photo for an accommodation product
 *
 * @param {object}
 * @param {string}
 * @param {string}
 * @returns {object}
 */
export const getBookingRoomPhoto = createSelector(
  [getArg(2), getBookingUploads],
  (uuid, uploads) =>
    pipe(
      defaultTo([]),
      filter(propEq('ownerUuid', uuid)),
      head
    )(uploads)
);

/**
 * Get booking meal plan for room by type selector
 *
 * Returns all meal plans of a certain type for the given room
 *
 * @param {object}
 * @param {string}
 * @param {string}
 * @param {string}
 * @returns {object}
 */
export const getBookingMealPlanForRoomByType = createSelector(
  [getArg(3), getBookingRoomMealPlans],
  (categoryType, mealPlans) => {
    // Run through all the meal plans for categroy type and collect them
    // This will run through the entire breakdown to  make sure we have the right
    // products
    const mealPlansOfType = map(
      reduce((accum, mealPlan) => {
        const breakdown = propOr([], 'breakdown', mealPlan);
        map(bdProduct => {
          if (pathEq(['product', 'meta', 'categoryType'], categoryType, bdProduct)) {
            accum = append(mealPlan, accum);
          }
        }, breakdown);

        return accum;
      }, []),
      mealPlans
    );

    return mealPlansOfType;
  }
);

/**
 * Get booking ready selector
 *
 * Returns whether a booking is ready to be submitted or not
 *
 * @param {object}
 * @param {string}
 * @returns {boolean}
 */
export const getBookingReady = createSelector(
  [getBooking, isSR, getBookingTravelAgent],
  (booking, isSr, travelAgent) => {
    // Returned from the API whether we can book or must stop
    const canBeBooked = path(['breakdown', 'canBeBooked'], booking);
    const mustStop = path(['breakdown', 'mustStop'], booking);

    // SRs can only book if they have attached a travel agent to the booking
    const hasTravelAgent = Boolean(!isSr || travelAgent);

    return !mustStop && canBeBooked && hasTravelAgent;
  }
);

/**
 * Get bookings for dashboard selector
 *
 * @param {object}
 * @returns {object}
 */
export const getBookingsForDashboard = createSelector(
  [getArg(0), getBookingData],
  (state, bookings) =>
    pipe(
      defaultTo({}),
      // Gets all bookings for travel agents for users that the current user looks after
      mapObjIndexed(over(lensProp('travelAgentUserUuid'), partial(getUser, [state]))),
      values,
      groupBy(prop('status'))
    )(bookings)
);

/**
 * Get booking applied offers selector
 *
 * Returns all offers that have been applied to a booking by the API
 *
 * @param {object}
 * @param {string}
 * @returns {object}
 */
export const getBookingAppliedOffers = createSelector(
  [getPotentialBooking, getBookingTextOffers],
  (potentialBooking, textOffers) => {
    // Gets all offers on products
    const productOffers = pipe(
      values,
      reduce(reduceOffersFromProducts, {}),
      values
    )(potentialBooking);

    // Adds text offers to all product offers
    const allOffers = reduce(
      (accum, offers) => {
        map(offer => {
          if (!offer) return;
          accum = append(offer, accum);
        }, offers);

        return accum;
      },
      productOffers,
      textOffers
    );

    return allOffers;
  }
);

/**
 * Get booking applied offers count selector
 *
 * Returns how many offers have been applied to a booking
 *
 * @param {object}
 * @param {string}
 * @returns {number}
 */
export const getBookingAppliedOffersCount = createSelector(
  getBookingAppliedOffers,
  length
);

/**
 * Get booking applied offers terms selector
 *
 * Returns all the tterms and conditions attached to the offers
 * that have been applied to a booking
 *
 * @param {object}
 * @param {string}
 * @returns {Array}
 */
export const getBookingAppliedOffersTerms = createSelector(
  getBookingAppliedOffers,
  map(
    pipe(
      prop('offer'),
      pickAll(['name', 'termsAndConditions'])
    )
  )
);

/**
 * Get booking policies and terms selector
 *
 * Returns all terms and policies for all products and offers
 * applied to this booking
 *
 * @param {object}
 * @param {string}
 * @returns {object}
 */
export const getBookingPoliciesAndTerms = createSelector(
  [getPotentialBooking, getBookingAppliedOffersTerms],
  (potentialBooking, offersTerms) =>
    pipe(
      values,
      reducePoliciesAndTerms({ cancellationPolicy: {}, paymentTerms: {} }),
      assoc('offersTerms', offersTerms)
    )(potentialBooking)
);

/**
 * Get booking rooms by id is on request selector
 *
 * Checks to see if any of the selected rooms of given id type
 * are on request
 *
 * @param {object}
 * @param {string}
 * @param {string}
 * @returns {boolean}
 */
export const getBookingRoomsByIdIsOnRequest = createSelector(
  getPotentialBookingRoomsById,
  any(propEq('isOnRequest', true))
);

export const isRelevantAccommodationError = error => {
  return error.type === 'stop' && error.meta === 'Accommodation';
};

export const getAccommodationEditModalErrors = (state, hotelUuid, accommodationProductId) => {
  const bookings = getBookings(state, hotelUuid, accommodationProductId);
  if (!bookings.data) {
    return;
  }

  const errorsForHotel = bookings.data[hotelUuid].breakdown.errors;
  const errors = {
    occupancyCheckErrors: [],
    bookingBuilderErrors: [],
  };

  // if we have occupancy check errors, use them
  if (bookings.occupancyCheckErrors) {
    errors.occupancyCheckErrors = bookings.occupancyCheckErrors;
  }

  if (errorsForHotel.some(isRelevantAccommodationError)) {
    // temporary for 811 until we re-think booking builder experience
    // @see https://pureescapes.atlassian.net/browse/OWA-811
    errors.bookingBuilderErrors.push(
      'There are one or more errors with the accommodation booking. Please check your inputted occupancy and dates and try again.'
    );
  }

  if (errors.occupancyCheckErrors.length || errors.bookingBuilderErrors.length) {
    return errors;
  }

  return null;
};

export const getHasUnusedAvailableMealPlanOffers = (state, hotelUuid) => {
  // get all the possible offers for meal plans
  const availableOffers = pipe(
    pathOr([], ['bookings', 'data', hotelUuid, 'breakdown', 'availableProductSets', 'Accommodation']),
    map(pathOr(null, ['availableSubProductSets', 'Meal Plan'])),
    unnest,
    map(pathOr(null, ['breakdown'])),
    unnest,
    map(pathOr(null, ['offers'])),
    flatten,
    map(path(['offer', 'name']))
  )(state);

  // get the offers currently applied to this booking
  const currentlyAppliedOffers = pathOr([], ['bookings', 'data', hotelUuid, 'breakdown', 'appliedOfferNames'], state);

  // return true if we have available offers that are currently not applied
  const availableOffersNotApplied = availableOffers.filter(ao => !currentlyAppliedOffers.includes(ao));
  return availableOffersNotApplied.length >= 1;
};
