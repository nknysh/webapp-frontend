import {
  __,
  add,
  all,
  always,
  append,
  concat,
  defaultTo,
  equals,
  evolve,
  filter,
  flatten,
  gt,
  head,
  ifElse,
  includes,
  invoker,
  last,
  length,
  lensProp,
  map,
  mapObjIndexed,
  mergeDeepRight,
  objOf,
  omit,
  over,
  partial,
  path,
  pathOr,
  pipe,
  prop,
  propEq,
  propOr,
  props,
  propSatisfies,
  reduce,
  times,
  toPairs,
  values,
  when,
} from 'ramda';
import { renameKeys } from 'ramda-adjunct';
import { createSelector } from 'store/utils';
import { addDays } from 'date-fns';

import { ProductTypes } from 'config/enums';
import { isEmptyOrNil, formatPrice, formatDate, isObject, minusDays, parseJson } from 'utils';

import { getHotelProduct } from 'store/modules/hotels/selectors';
import { getSearchDates } from 'store/modules/search/selectors';

import { getState, getSecondArg, getUnary } from 'store/common';

import { canBook, toTotal } from './utils';

const datesForBookingBuild = renameKeys({ from: 'startDate', to: 'endDate' });

const formatDatesForProductObj = evolve({
  from: formatDate,
  to: pipe(
    minusDays(1),
    formatDate
  ),
});

const reduceOneWayProducts = (accum, [direction, products]) => {
  mapObjIndexed((selected, uuid) => {
    if (!selected) return;

    accum = append({ uuid, direction }, accum);
  }, products);
  return accum;
};

const getOneWayProducts = pipe(
  toPairs,
  reduce(reduceOneWayProducts, [])
);

const getSingularProduct = ifElse(
  isEmptyOrNil,
  always([]),
  pipe(
    objOf('uuid'),
    append(__, [])
  )
);

export const getBooking = prop('booking');

export const getBookingStatus = pipe(
  getBooking,
  prop('status')
);

export const getBookingData = pipe(
  getBooking,
  prop('data')
);

export const getBookingByHotelId = createSelector(
  [getUnary, getBookingData],
  prop
);

export const getBookingRoomById = createSelector(
  [getBookingByHotelId, getSecondArg],
  (hotel, roomId) => path(['products', ProductTypes.ACCOMMODATION, roomId], hotel)
);

export const getBookingRoomDatesById = createSelector(
  [getSearchDates, getBookingRoomById],
  (searchDates, booking) => {
    return pipe(
      prop('dates'),
      when(isEmptyOrNil, always(searchDates))
    )(booking);
  }
);

export const getPotentialBooking = createSelector(
  getBookingByHotelId,
  prop('potentialBooking')
);

export const getPotentialBookingByRoomId = createSelector(
  [getPotentialBooking, getSecondArg],
  (potentialBooking, roomId) =>
    pipe(
      propOr([], ProductTypes.ACCOMMODATION),
      filter(propEq('product', roomId))
    )(potentialBooking)
);

export const getAllBookingErrors = createSelector(
  getBookingByHotelId,
  propOr([], 'errors')
);

export const getBookingStopErrors = createSelector(
  getAllBookingErrors,
  filter(propEq('type', 'stop'))
);

export const getBookingErrors = createSelector(
  getAllBookingErrors,
  filter(propEq('type', 'booking'))
);

export const getBookingErrorsByRoomId = createSelector(
  [getBookingErrors, getSecondArg],
  (errors, roomId) => filter(propEq('accommodationProductUuid', roomId), errors)
);

const addLastDay = dates => {
  if (isEmptyOrNil(dates)) return dates;

  const lastDate = new Date(last(dates));
  return append(formatDate(addDays(lastDate, 1)), dates);
};

export const getPotentialDatesByRoomId = createSelector(
  getPotentialBookingByRoomId,
  pipe(
    reduce((accum, accom) => concat(accum, propOr([], 'dates', accom)), []),
    addLastDay,
    invoker(0, 'sort')
  )
);

export const getBookingProductSets = createSelector(
  getBookingByHotelId,
  prop('availableProductSets')
);

export const getBookingReady = (state, hotelId) => {
  const booking = getBookingByHotelId(state, hotelId);
  const canBeBooked = prop('canBeBooked', booking);

  const hasGuests = pipe(
    pathOr({}, ['products', ProductTypes.ACCOMMODATION]),
    values,
    ifElse(isEmptyOrNil, always(false), all(canBook))
  )(booking);

  return hasGuests || canBeBooked;
};

export const getBookingRoomMealPlans = createSelector(
  [getBookingProductSets, getSecondArg],
  (productSets, roomId) => {
    const mealPlans = pipe(
      propOr([], ProductTypes.ACCOMMODATION),
      filter(propSatisfies(includes(roomId), 'products')),
      map(path(['availableSubProductSets', ProductTypes.MEAL_PLAN]))
    );

    return mealPlans(productSets);
  }
);

export const getBookingAddons = createSelector(
  getBookingProductSets,
  pipe(
    defaultTo({}),
    props([ProductTypes.SUPPLEMENT, ProductTypes.FINE]),
    reduce((accum, products) => (isEmptyOrNil(products) ? accum : concat(products, accum)), [])
  )
);

export const getBookingTransfers = createSelector(
  getBookingProductSets,
  pipe(
    defaultTo({}),
    propOr([], ProductTypes.TRANSFER)
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
  getPotentialBookingByRoomId,
  map(pathOr([], ['subProducts', ProductTypes.SUPPLEMENT]))
);

export const getPotentialBookingRoomMealPlans = createSelector(
  getPotentialBookingByRoomId,
  map(pathOr([], ['subProducts', ProductTypes.MEAL_PLAN]))
);

export const getBookingRoomMealPlan = createSelector(
  getBookingRoomById,
  pipe(
    propOr('[]', 'mealPlan'),
    parseJson
  )
);

export const getBookingRoomTotal = createSelector(
  [getState, getSecondArg, getPotentialBooking],
  (state, roomId, potentialBooking) => {
    const productsForRoom = pipe(
      propOr([], ProductTypes.ACCOMMODATION),
      filter(propEq('product', roomId))
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
  getBookingByHotelId,
  propOr({ total: formatPrice(0) }, 'totals')
);

export const getBookingTotal = createSelector(
  getBookingByHotelId,
  pipe(
    pathOr(0, ['totals', 'total']),
    formatPrice
  )
);

export const getBookingForBuilder = createSelector(
  [getState, getUnary, getBookingByHotelId],
  (state, hotelUuid, booking) => {
    let dates = [];
    let guestAges = {};

    const addToDates = pipe(
      formatDatesForProductObj,
      values,
      concat(dates)
    );

    const datesForProductObj = pipe(
      formatDatesForProductObj,
      datesForBookingBuild
    );

    const getAccommodationObject = (uuid, { guests }, i) => {
      const product = getHotelProduct(state, uuid);

      if (!uuid || !product) return;

      if (!guests) return { uuid };

      const guestsForIndex = propOr({}, i, guests);

      const includeDates = propEq('type', ProductTypes.ACCOMMODATION, product);
      const bookingDates = (includeDates && getBookingRoomDatesById(state, hotelUuid, uuid)) || {};

      const mealPlans = getBookingRoomMealPlan(state, hotelUuid, uuid) || [];
      const mealPlan = reduce((accum, uuid) => (uuid ? append(objOf('uuid', uuid), accum) : accum), [], mealPlans);

      const numberOfAdults = length(propOr([], 'adult', guestsForIndex));
      const agesOfAllChildren = pipe(
        omit(['adult']),
        values,
        flatten
      )(guestsForIndex);

      const hasAdults = gt(numberOfAdults, 0);
      const hasChildren = !isEmptyOrNil(agesOfAllChildren);
      const hasMealPlan = !isEmptyOrNil(mealPlan);

      const hasSubProducts = hasMealPlan;

      dates = addToDates(bookingDates);

      if (hasAdults) {
        guestAges = over(
          lensProp('numberOfAdults'),
          pipe(
            defaultTo(0),
            add(numberOfAdults)
          ),
          guestAges
        );
      }

      if (hasChildren) {
        guestAges = over(
          lensProp('agesOfAllChildren'),
          pipe(
            defaultTo([]),
            concat(agesOfAllChildren)
          ),
          guestAges
        );
      }

      return {
        uuid,
        ...((hasAdults || hasChildren) && {
          guestAges: {
            ...(hasAdults && { numberOfAdults }),
            ...(hasChildren && { agesOfAllChildren }),
          },
          ...(hasSubProducts && {
            subProducts: {
              ...(hasMealPlan && { [ProductTypes.MEAL_PLAN]: mealPlan }),
            },
          }),
        }),
        ...(includeDates && datesForProductObj(bookingDates)),
      };
    };

    const getProductObj = (accum, [uuid]) => {
      const product = getHotelProduct(state, uuid);

      if (!product || !uuid) return accum;

      const productLens = lensProp([prop('type', product)]);

      return over(productLens, append({ uuid }), accum);
    };

    const accommodationProducts = pipe(
      pathOr({}, ['products', ProductTypes.ACCOMMODATION]),
      mapObjIndexed((room, uuid) =>
        times(partial(getAccommodationObject, [uuid, room]), length(propOr([], 'guests', room)))
      ),
      values,
      flatten
    );

    const transferProducts = pipe(
      pathOr('', ['products', ProductTypes.TRANSFER]),
      ifElse(isObject, getOneWayProducts, getSingularProduct)
    );

    const groundServiceProducts = pipe(
      pathOr('', ['products', ProductTypes.GROUND_SERVICE]),
      ifElse(isObject, getOneWayProducts, getSingularProduct)
    );

    const extraProducts = pipe(
      propOr({}, 'products'),
      omit([ProductTypes.ACCOMMODATION, ProductTypes.TRANSFER, ProductTypes.GROUND_SERVICE]),
      values,
      reduce((accum, values) => {
        mapObjIndexed((selected, uuid) => {
          accum = mergeDeepRight(accum, { [uuid]: selected });
        }, values);

        return accum;
      }, {}),
      toPairs,
      filter(
        pipe(
          last,
          equals(true)
        )
      ),
      reduce(getProductObj, {})
    );

    const products = {
      [ProductTypes.ACCOMMODATION]: accommodationProducts(booking),
      [ProductTypes.TRANSFER]: transferProducts(booking),
      [ProductTypes.GROUND_SERVICE]: groundServiceProducts(booking),
      ...extraProducts(booking),
    };

    dates.sort();

    return {
      hotelUuid,
      startDate: head(dates),
      endDate: last(dates),
      ...products,
      ...(!isEmptyOrNil(guestAges) && { guestAges }),
    };
  }
);
