import {
  __,
  add,
  all,
  always,
  append,
  concat,
  cond,
  curry,
  defaultTo,
  equals,
  evolve,
  filter,
  find,
  flatten,
  gt,
  head,
  identity,
  ifElse,
  includes,
  invoker,
  keys,
  last,
  length,
  lensProp,
  map,
  mapObjIndexed,
  mergeDeepRight,
  multiply,
  omit,
  over,
  partial,
  path,
  pathOr,
  pickBy,
  pipe,
  prop,
  propEq,
  propOr,
  props,
  propSatisfies,
  reduce,
  T,
  times,
  uniq,
  values,
  when,
} from 'ramda';
import { renameKeys } from 'ramda-adjunct';
import { createSelector } from 'store/utils';
import { addDays } from 'date-fns';

import { isEmptyOrNil, formatPrice, formatDate, getDaysBetween, isArray, minusDays } from 'utils';

import { getHotelProduct, getHotelsRates, getHotelsRate } from 'store/modules/hotels/selectors';
import { getSearchDates } from 'store/modules/search/selectors';

import { getState, getSecondArg, getUnary } from 'store/common';

import { canBook, getGuestsTotals, categoryEquals, totalShim, toTotal } from './utils';

export const ProductType = Object.freeze({
  PER_NIGHT: 'perNight',
  PER_BOOKING: 'perBooking',
  PER_PERSON: 'perPerson',
  PER_PERSON_PER_NIGHT: 'perPersonPerNight',
  PER_ACCOMMODATION_PRODUCT: 'perAccommodationProduct',
});

const datesForBookingBuild = renameKeys({ from: 'startDate', to: 'endDate' });

const formatDatesForProductObj = evolve({
  from: formatDate,
  to: pipe(
    minusDays(1),
    formatDate
  ),
});

const preMap = cond([[equals('Accommodation'), always(uniq)], [T, always(identity)]]);

const perAccommodationProduct = curry((state, product) => {
  const rate = getHotelsRate(state, propOr({}, 'rate', product));
  const defaultRate = find(propEq('default', true), propOr([], 'rates', rate));
  const hotelUuid = prop('ownerUuid', product);
  const booking = getBookingByHotelId(state, hotelUuid);

  if (!rate || !defaultRate || !booking) return totalShim();

  const noOfRooms = pipe(
    prop('Accommodation'),
    keys,
    length
  );

  return [multiply(propOr(0, 'rate', defaultRate), noOfRooms(booking))];
});

const perBooking = curry((state, product) => {
  const rate = getHotelsRate(state, propOr({}, 'rate', product));
  const defaultRate = find(propEq('default', true), propOr([], 'rates', rate));

  if (!rate || !defaultRate) return totalShim();

  return [propOr(0, 'rate', defaultRate)];
});

const perPerson = curry((state, product) => {
  const rate = getHotelsRate(state, propOr({}, 'rate', product));
  const hotelUuid = prop('ownerUuid', product);
  const booking = getBookingByHotelId(state, hotelUuid);

  if (!rate || !booking) return totalShim();

  const totalForRoom = (data, uuid) => {
    const roomBooking = getBookingRoomById(state, hotelUuid, uuid);
    const guests = prop('guests', roomBooking);
    const rates = prop('rates', rate);

    if (!rates || !guests) return toTotal(totalShim());

    return getGuestsTotals(rates, guests);
  };

  const getTotalsForRooms = pipe(
    prop('Accommodation'),
    mapObjIndexed(totalForRoom)
  );

  return getTotalsForRooms(booking);
});

const perPersonPerNight = curry((state, product) => {
  const hotelUuid = prop('ownerUuid', product);
  const totalsPerPerson = perPerson(state, product);

  const totalForNights = (amount, uuid) => {
    const { from, to } = getBookingRoomDatesById(state, hotelUuid, uuid);
    const days = getDaysBetween(from, to);

    return multiply(amount, length(days));
  };

  const getTotalsPerNight = mapObjIndexed(totalForNights);

  return getTotalsPerNight(totalsPerPerson);
});

const perNight = curry((state, product) => {
  const rate = getHotelsRate(state, propOr({}, 'rate', product));
  const hotelUuid = prop('ownerUuid', product);
  const booking = getBookingByHotelId(state, hotelUuid);
  const defaultRate = find(propEq('default', true), propOr([], 'rates', rate));

  if (!rate || !booking) return totalShim();

  const totalForRoom = (data, uuid) => {
    const { from, to } = getBookingRoomDatesById(state, hotelUuid, uuid);
    const days = getDaysBetween(from, to);

    return multiply(propOr(0, 'rate', defaultRate), length(days));
  };

  const getTotalsForRooms = pipe(
    prop('Accommodation'),
    mapObjIndexed(totalForRoom)
  );

  return getTotalsForRooms(booking);
});

const getProductTotal = curry((state, uuid) => {
  const product = getHotelProduct(state, uuid);

  if (!product) return totalShim();

  const byCategory = cond([
    [categoryEquals(ProductType.PER_BOOKING), perBooking(state)],
    [categoryEquals(ProductType.PER_PERSON), perPerson(state)],
    [categoryEquals(ProductType.PER_NIGHT), perNight(state)],
    [categoryEquals(ProductType.PER_PERSON_PER_NIGHT), perPersonPerNight(state)],
    [categoryEquals(ProductType.PER_ACCOMMODATION_PRODUCT), perAccommodationProduct(state)],
    [T, always(0)],
  ]);

  return byCategory(product);
});

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
  (hotel, roomId) => path(['Accommodation', roomId], hotel)
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
      propOr([], 'Accommodation'),
      filter(propEq('product', roomId))
    )(potentialBooking)
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
    propOr({}, 'Accommodation'),
    values,
    ifElse(isEmptyOrNil, always(false), all(canBook))
  )(booking);

  return hasGuests || canBeBooked;
};

export const getBookingRoomMealPlans = createSelector(
  [getBookingProductSets, getSecondArg],
  (productSets, roomId) => {
    const mealPlans = pipe(
      propOr([], 'Accommodation'),
      filter(propSatisfies(includes(roomId), 'products')),
      map(path(['availableSubProductSets', 'Meal Plan']))
    );

    return mealPlans(productSets);
  }
);

export const getBookingRoomSupplements = createSelector(
  getPotentialBookingByRoomId,
  map(pathOr([], ['subProducts', 'Supplement']))
);

export const getBookingRoomMealPlan = createSelector(
  [getBookingRoomById, getBookingRoomMealPlans],
  (booking, mealPlans) => prop(prop('mealPlan', booking), mealPlans)
);

export const getTransferProductsTotal = createSelector(
  [getState, getBookingByHotelId],
  (state, booking) =>
    pipe(
      path(['products', 'Transfer']),
      getProductTotal(state),
      toTotal
    )(booking)
);

export const getGroundServiceProductsTotal = createSelector(
  [getState, getBookingByHotelId],
  (state, booking) =>
    pipe(
      path(['products', 'Ground Service']),
      getProductTotal(state),
      toTotal
    )(booking)
);

export const getAddonsTotals = createSelector(
  [getState, getBookingByHotelId],
  (state, booking) => {
    const fineProducts = pathOr([], ['products', 'Fine'], booking);
    const supplementProducts = pathOr([], ['products', 'Supplement'], booking);

    const addons = uniq(concat(fineProducts, supplementProducts));

    const getAddonTotal = (accum, uuid) => mergeDeepRight(accum, { [uuid]: head(getProductTotal(state, uuid)) });

    return reduce(getAddonTotal, {}, addons);
  }
);

export const getBookingRoomTotal = createSelector(
  [getState, getSecondArg, getPotentialBooking, getBookingRoomById, getBookingRoomDatesById],
  (state, roomId, potentialBooking, roomBooking, { to, from }) => {
    const product = getHotelProduct(state, roomId);
    const rates = prop('rates', product);
    const guests = prop('guests', roomBooking);

    const days = getDaysBetween(from, to);

    const ratesForDays = pipe(
      map(formatDate),
      props(__, rates)
    )(days);

    const getTotalMealPlans = (accum, rate) => {
      const selectedMealPlan = prop('mealPlan', roomBooking);

      const mealPlan = pipe(
        pathOr([], ['addons', 'Meal Plan']),
        partial(getHotelsRates, [state]),
        pickBy(propEq('product', selectedMealPlan)),
        values,
        head
      )(rate);

      const mealPlanRates = propOr([], 'rates', mealPlan);

      return isEmptyOrNil(mealPlan) ? accum : append(getGuestsTotals(mealPlanRates, guests), accum);
    };

    const productsForRoom = pipe(
      propOr([], 'Accommodation'),
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

    const mealPlansTotal = pipe(
      reduce(getTotalMealPlans, []),
      toTotal
    )(ratesForDays);

    return pipe(
      add(roomTotals),
      add(mealPlansTotal),
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
  [getState, getUnary, getBookingByHotelId, getPotentialBooking],
  (state, id, booking, potentialBooking = {}) => {
    const products = prop('products', booking);

    const byProductType = (uuids, type) => {
      const byType = cond([[T, always(getProductTotal(state))]]);

      return pipe(
        preMap(type),
        ifElse(isArray, map(byType(type)), byType(type)),
        map(Number),
        toTotal
      )(uuids);
    };

    const accommodationTotal = pipe(
      prop('Accommodation'),
      defaultTo({}),
      map(prop('product')),
      values,
      uniq,
      map(productId => getBookingRoomTotal(state, id, productId))
    );

    const deriveTotalsFromProducts = pipe(
      mapObjIndexed(byProductType),
      toTotal
    );

    return pipe(
      add(accommodationTotal(potentialBooking)),
      add(deriveTotalsFromProducts(products)),
      formatPrice
    )(0);
  }
);

export const getBookingForBuilder = createSelector(
  [getState, getUnary, getBookingByHotelId],
  (state, hotelId, booking) => {
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

    const getProductObj = curry((uuid, { guests }, i) => {
      const product = getHotelProduct(state, uuid);

      if (!product) return;

      const guestsForIndex = propOr({}, i, guests);

      const includeDates = propEq('type', 'Accommodation', product);
      const bookingDates = (includeDates && getBookingRoomDatesById(state, hotelId, uuid)) || {};

      const numberOfAdults = length(propOr([], 'adult', guestsForIndex));
      const agesOfAllChildren = pipe(
        omit(['adult']),
        values,
        flatten
      )(guestsForIndex);

      const hasAdults = gt(numberOfAdults, 0);
      const hasChildren = !isEmptyOrNil(agesOfAllChildren);

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
        }),
        ...(includeDates && datesForProductObj(bookingDates)),
      };
    });

    const accommodationProducts = pipe(
      propOr({}, 'Accommodation'),
      mapObjIndexed((room, uuid) => times(getProductObj(uuid, room), length(propOr([], 'guests', room)))),
      values,
      flatten
    );

    dates.sort();

    return {
      Accommodation: accommodationProducts(booking),
      startDate: head(dates),
      endDate: last(dates),
      ...(!isEmptyOrNil(guestAges) && { guestAges }),
    };
  }
);
