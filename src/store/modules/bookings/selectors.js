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
} from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { createSelector } from 'store/utils';
import { addDays, subDays } from 'date-fns';

import { BOOKINGS_ON_REQUEST } from 'config';
import { ProductTypes, Occassions } from 'config/enums';
import { formatPrice, formatDate, toDate, reduceWithIndex } from 'utils';

import { getSearchDates } from 'store/modules/search/selectors';
import { isSR } from 'store/modules/auth/selectors';
import { getUser } from 'store/modules/users/selectors';

import { getArg, getStatus, getData } from 'store/common';

import { toTotal } from './utils';

const reduceOffersFromProducts = (accum, products) => {
  map(({ offers = [], subProducts }) => {
    map(offer => {
      accum = assoc(path(['offer', 'uuid'], offer), offer, accum);
    }, offers);

    accum = subProducts ? reduce(reduceOffersFromProducts, accum, values(subProducts)) : accum;
  }, products);

  return accum;
};

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

export const getBookings = prop('bookings');

export const getBookingStatus = pipe(
  getBookings,
  getStatus
);

export const getBookingData = pipe(
  getBookings,
  getData
);

export const getBookingsCreated = pipe(
  getBookings,
  propOr({}, 'created')
);

export const getBookingsHolds = pipe(
  getBookings,
  prop('holds')
);

export const getBookingCreated = createSelector(
  [getArg(1), getBookingsCreated],
  prop
);

export const getBookingCreatedByValue = createSelector(
  [getArg(1), getBookingsCreated],
  (id, created) =>
    pipe(
      values,
      find(equals(id))
    )(created)
);

export const getBooking = createSelector(
  [getArg(1), getBookingData],
  prop
);

export const getBookingBreakdown = createSelector(
  getBooking,
  prop('breakdown')
);

export const getBookingUploads = createSelector(
  getBookingBreakdown,
  prop('uploads')
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
  [getBookingRooms, getArg(2)],
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
  [getPotentialBookingRooms, getArg(2)],
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
  [getBookingErrors, getArg(2)],
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

export const getBookingCanHold = createSelector(
  getBooking,
  path(['breakdown', 'availableToHold'])
);

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

export const getBookingAddons = createSelector(
  getBookingProductSets,
  pipe(
    defaultTo({}),
    props([ProductTypes.SUPPLEMENT, ProductTypes.FINE]),
    reduce((accum, products) => (isNilOrEmpty(products) ? accum : concat(products, accum)), [])
  )
);

export const getBookingTravelAgent = createSelector(
  getBooking,
  prop('travelAgentUserUuid')
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

const getRoomTotal = (key, roomId, potentialBooking) => {
  const productsForRoom = pipe(
    propOr([], ProductTypes.ACCOMMODATION),
    filter(pathEq(['product', 'uuid'], roomId))
  )(potentialBooking);

  const roomTotals = pipe(
    map(prop(key)),
    toTotal
  )(productsForRoom);

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

  return pipe(
    add(roomTotals),
    add(subProductsTotal),
    formatPrice
  )(0);
};

export const getBookingRoomTotal = createSelector(
  [getArg(2), getPotentialBooking],
  partial(getRoomTotal, ['total'])
);

export const getBookingRoomTotalBeforeDiscount = createSelector(
  [getArg(2), getPotentialBooking],
  partial(getRoomTotal, ['totalBeforeDiscount'])
);

export const getBookingTextOffers = createSelector(
  getBookingBreakdown,
  propOr([], 'textOnlyOffersPerLodging')
);

export const getBookingRoomOffers = createSelector(
  [getArg(2), getPotentialBooking, getBookingTextOffers],
  (roomId, potentialBooking, textOffers) => {
    const offersForRoom = pipe(
      propOr([], ProductTypes.ACCOMMODATION),
      filter(pathEq(['product', 'uuid'], roomId)),

      reduceWithIndex((accum, product, i) => {
        map(
          offer => {
            accum = assoc(path(['offer', 'uuid'], offer), offer, accum);
          },
          [...propOr([], i, textOffers), ...propOr([], 'offers', product)]
        );

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
    )(potentialBooking);

    return offersForRoom;
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

export const getBookingTotalBeforeDiscount = createSelector(
  getBookingBreakdown,
  pipe(
    pathOr(0, ['totals', 'totalBeforeDiscount']),
    formatPrice
  )
);

export const getBookingForBuilder = createSelector(
  getBooking,
  booking => {
    const hotelUuid = prop('hotelUuid', booking);

    let dates = [];
    let guestAges = {};

    const sanitizeAccommodationProducts = pipe(
      evolve({
        startDate: when(complement(isNilOrEmpty), formatDate),
        endDate: when(
          complement(isNilOrEmpty),
          pipe(
            partialRight(subDays, [1]),
            formatDate
          )
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
      ),

      // Temp remove occasions from guestAges
      over(lensProp('guestAges'), omit([...values(Occassions), 'repeatCustomer']))
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

export const getBookingHolds = createSelector(
  [getArg(1), getBookingsHolds],
  prop
);

export const getBookingRoomHolds = createSelector(
  [getArg(2), getBookingHolds],
  (uuid, hold) =>
    pipe(
      propOr([], 'breakdown'),
      filter(propEq('productUuid', uuid))
    )(hold)
);

export const getBookingRoomPhoto = createSelector(
  [getArg(2), getBookingUploads],
  (uuid, uploads) =>
    pipe(
      defaultTo([]),
      filter(propEq('ownerUuid', uuid)),
      head
    )(uploads)
);

export const getBookingMealPlanForRoomByType = createSelector(
  [getArg(3), getBookingRoomMealPlans],
  (categoryType, mealPlans) => {
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

export const getBookingReady = createSelector(
  [getBooking, isSR, getBookingTravelAgent],
  (booking, isSr, travelAgent) => {
    const canBeBooked = path(['breakdown', 'canBeBooked'], booking);
    const mustStop = path(['breakdown', 'mustStop'], booking);

    const hasTravelAgent = Boolean(!isSr || travelAgent);

    return !mustStop && canBeBooked && hasTravelAgent;
  }
);

export const getBookingsForDashboard = createSelector(
  [getArg(0), getBookingData],
  (state, bookings) =>
    pipe(
      defaultTo({}),
      mapObjIndexed(over(lensProp('travelAgentUserUuid'), partial(getUser, [state]))),
      values,
      groupBy(prop('status'))
    )(bookings)
);

export const getBookingAppliedOffers = createSelector(
  [getPotentialBooking, getBookingTextOffers],
  (potentialBooking, textOffers) => {
    const productOffers = pipe(
      values,
      reduce(reduceOffersFromProducts, {}),
      values
    )(potentialBooking);

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

export const getBookingAppliedOffersCount = createSelector(
  getBookingAppliedOffers,
  length
);

export const getBookingAppliedOffersTerms = createSelector(
  getBookingAppliedOffers,
  map(
    pipe(
      prop('offer'),
      pickAll(['name', 'termsAndConditions'])
    )
  )
);

export const getBookingPoliciesAndTerms = createSelector(
  [getPotentialBooking, getBookingAppliedOffersTerms],
  (potentialBooking, offersTerms) =>
    pipe(
      values,
      reducePoliciesAndTerms({ cancellationPolicy: {}, paymentTerms: {} }),
      assoc('offersTerms', offersTerms)
    )(potentialBooking)
);
