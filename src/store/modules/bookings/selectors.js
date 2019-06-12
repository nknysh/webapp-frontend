import {
  add,
  always,
  any,
  append,
  concat,
  defaultTo,
  evolve,
  filter,
  has,
  head,
  invoker,
  last,
  lensProp,
  map,
  mapObjIndexed,
  over,
  partialRight,
  path,
  pathEq,
  pathOr,
  pick,
  pipe,
  prop,
  propEq,
  propOr,
  props,
  reduce,
  reject,
  tap,
  uniq,
  when,
} from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { createSelector } from 'store/utils';
import { addDays, subDays } from 'date-fns';

import { BOOKINGS_ON_REQUEST } from 'config';
import { ProductTypes } from 'config/enums';
import { formatPrice, formatDate, toDate } from 'utils';

import { getSearchDates } from 'store/modules/search/selectors';

import { getState, getSecondArg, getUnary } from 'store/common';

import { toTotal } from './utils';

export const getBookings = prop('bookings');

export const getBookingStatus = pipe(
  getBookings,
  prop('status')
);

export const getBookingData = pipe(
  getBookings,
  prop('data')
);

export const getBookingsCreated = pipe(
  getBookings,
  prop('created')
);

export const getBookingCreated = createSelector(
  [getUnary, getBookingsCreated],
  prop
);

export const getBooking = createSelector(
  [getUnary, getBookingData],
  prop
);

export const getBookingBreakdown = createSelector(
  getBooking,
  prop('breakdown')
);

const getPotentialBooking = createSelector(
  getBookingBreakdown,
  prop('potentialBooking')
);

export const getBookingHotel = createSelector(
  getBookingBreakdown,
  prop('hotel')
);

export const getBookingRequestedBuild = createSelector(
  getBookingBreakdown,
  prop('requestedBuild')
);

export const getBookingProductSets = createSelector(
  getBookingBreakdown,
  prop('availableProductSets')
);

export const getBookingBuildTotals = createSelector(
  getBookingBreakdown,
  prop('totals')
);

export const getBookingBuildCurrency = createSelector(
  getBookingBreakdown,
  prop('currency')
);

export const getBookingHash = createSelector(
  getBookingBreakdown,
  prop('bookingHash')
);

export const getBookingAvailableToHold = createSelector(
  getBookingBreakdown,
  prop('availableToHold')
);

export const getAllBookingErrors = createSelector(
  getBookingBreakdown,
  propOr([], 'errors')
);

export const getBookingRooms = createSelector(
  getBookingRequestedBuild,
  propOr([], ProductTypes.ACCOMMODATION)
);

export const getBookingRoomsById = createSelector(
  [getBookingRooms, getSecondArg],
  (rooms, uuid) => filter(propEq('uuid', uuid), rooms)
);

export const getBookingRoomDatesById = createSelector(
  [getBookingRoomsById, getSearchDates],
  (rooms, searchDates) =>
    map(
      pipe(
        pick(['startDate', 'endDate']),
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

const getPotentialBookingRooms = createSelector(
  getPotentialBooking,
  propOr([], ProductTypes.ACCOMMODATION)
);

export const getPotentialBookingRoomsById = createSelector(
  [getPotentialBookingRooms, getSecondArg],
  (potentialBookingRooms, roomId) => filter(pathEq(['product', 'uuid'], roomId), potentialBookingRooms)
);

export const getBookingStopErrors = createSelector(
  getAllBookingErrors,
  filter(propEq('type', 'stop'))
);

export const getBookingErrors = createSelector(
  getAllBookingErrors,
  filter(propEq('type', 'booking'))
);

export const getBookingNonAccommodationErrors = createSelector(
  getAllBookingErrors,
  reject(has('accommodationProductUuid'))
);

export const getBookingErrorsByRoomId = createSelector(
  [getBookingErrors, getSecondArg],
  (errors, roomId) => filter(propEq('accommodationProductUuid', roomId), errors)
);

const addLastDay = dates => {
  if (isNilOrEmpty(dates)) return dates;

  const lastDate = new Date(last(dates));
  return append(formatDate(addDays(lastDate, 1)), dates);
};

export const getPotentialDatesByRoomId = createSelector(
  getPotentialBookingRoomsById,
  pipe(
    reduce((accum, accom) => concat(accum, propOr([], 'dates', accom)), []),
    addLastDay,
    invoker(0, 'sort')
  )
);

export const isBookingOnRequest = createSelector(
  getBookingBuildTotals,
  totals => BOOKINGS_ON_REQUEST || pathOr(false, ['totals', 'oneOrMoreItemsOnRequest'], totals)
);

export const getBookingReady = (state, hotelId) => {
  const booking = getBooking(state, hotelId);
  const canBeBooked = path(['breakdown', 'canBeBooked'], booking);
  const mustStop = path(['breakdown', 'mustStop'], booking);

  return !mustStop && canBeBooked;
};

export const getBookingRoomMealPlans = createSelector(
  [getBookingProductSets, getSecondArg],
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

export const getBookingAddons = createSelector(
  getBookingProductSets,
  pipe(
    defaultTo({}),
    props([ProductTypes.SUPPLEMENT, ProductTypes.FINE]),
    reduce((accum, products) => (isNilOrEmpty(products) ? accum : concat(products, accum)), [])
  )
);

export const getBookingTransfers = createSelector(
  getBookingProductSets,
  pipe(
    defaultTo({}),
    propOr([], ProductTypes.TRANSFER)
  )
);

export const getBookingRequestedTransfers = createSelector(
  getBookingRequestedBuild,
  pipe(
    defaultTo({}),
    propOr([], ProductTypes.TRANSFER)
  )
);

export const getBookingRequestedGroundServices = createSelector(
  getBookingRequestedBuild,
  pipe(
    defaultTo({}),
    propOr([], ProductTypes.GROUND_SERVICE)
  )
);

export const getBookingRequestedSupplements = createSelector(
  getBookingRequestedBuild,
  pipe(
    defaultTo({}),
    propOr([], ProductTypes.SUPPLEMENT)
  )
);

export const getBookingRequestedFines = createSelector(
  getBookingRequestedBuild,
  pipe(
    defaultTo({}),
    propOr([], ProductTypes.FINE)
  )
);

export const getBookingGroundServices = createSelector(
  getBookingProductSets,
  pipe(
    defaultTo({}),
    propOr([], ProductTypes.GROUND_SERVICE)
  )
);

export const getPotentialBookingRoomSupplements = createSelector(
  getPotentialBookingRoomsById,
  map(pathOr([], ['subProducts', ProductTypes.SUPPLEMENT]))
);

export const getPotentialBookingRoomMealPlans = createSelector(
  getPotentialBookingRoomsById,
  map(pathOr([], ['subProducts', ProductTypes.MEAL_PLAN]))
);

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

export const getBookingRoomTotal = createSelector(
  [getState, getSecondArg, getPotentialBooking],
  (state, roomId, potentialBooking) => {
    const productsForRoom = pipe(
      propOr([], ProductTypes.ACCOMMODATION),
      filter(pathEq(['product', 'uuid'], roomId))
    )(potentialBooking);

    const roomTotals = pipe(
      map(prop('total')),
      toTotal
    )(productsForRoom);

    const subProductsTotal = pipe(
      map(
        pipe(
          propOr({}, 'subProducts'),
          mapObjIndexed(
            pipe(
              map(prop('total')),
              toTotal
            )
          ),
          toTotal
        )
      ),
      toTotal
    )(productsForRoom);

    return pipe(
      add(roomTotals),
      add(subProductsTotal),
      formatPrice
    )(0);
  }
);

export const getBookingTotals = createSelector(
  getBooking,
  propOr({ total: formatPrice(0) }, 'totals')
);

export const getBookingTotal = createSelector(
  getBookingBreakdown,
  pipe(
    pathOr(0, ['totals', 'total']),
    formatPrice
  )
);

export const getBookingForBuilder = createSelector(
  [getState, getBooking],
  (state, booking) => {
    const hotelUuid = prop('hotelUuid', booking);

    let dates = [];
    let guestAges = {};

    const sanitizeAccommodationProducts = pipe(
      evolve({
        startDate: formatDate,
        endDate: pipe(
          partialRight(subDays, [1]),
          formatDate
        ),
      }),
      // Push dates to dates array
      tap(
        pipe(
          props(['startDate', 'endDate']),
          accomDates => (dates = concat(dates, accomDates))
        )
      ),
      // Push ages to guestAges object
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
      )
    );

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

    dates.sort();

    return {
      hotelUuid,
      startDate: head(dates),
      endDate: last(dates),
      ...products,
      ...(!isNilOrEmpty(guestAges) && { guestAges }),
    };
  }
);