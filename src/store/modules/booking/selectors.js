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
  head,
  identity,
  ifElse,
  includes,
  invoker,
  keys,
  last,
  length,
  lensPath,
  map,
  mapObjIndexed,
  mergeDeepRight,
  multiply,
  partial,
  path,
  pathOr,
  pick,
  pickBy,
  pipe,
  prop,
  propEq,
  propOr,
  props,
  propSatisfies,
  reduce,
  repeat,
  set,
  T,
  toPairs,
  uniq,
  values,
  view,
  when,
} from 'ramda';
import { renameKeys } from 'ramda-adjunct';
import { createSelector } from 'store/utils';
import { addDays } from 'date-fns';

import { isEmptyOrNil, formatPrice, formatDate, getDaysBetween, isAdult, isArray, minusDays } from 'utils';

import { getHotelRoom, getHotelProduct, getHotelsRates, getHotelsRate } from 'store/modules/hotels/selectors';
import { getSearchDates } from 'store/modules/search/selectors';

import { getState, getSecondArg, getUnary } from 'store/common';

import { canBook, getGuestsTotals, getTotalExtraSupplements, categoryEquals, totalShim, toTotal } from './utils';

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

export const getBookingRoomExtraSupplements = createSelector(
  [getState, getHotelRoom, getBookingRoomById, getBookingRoomDatesById],
  (state, hotelRoom, roomBooking, { to, from }) => {
    const rooms = propOr([], 'checks', roomBooking);
    const rates = prop('rates', hotelRoom);
    const days = getDaysBetween(from, to);

    const supplementsNamesNeeded = pipe(
      map(
        pipe(
          prop('extraPersonSupplements'),
          keys
        )
      ),
      flatten,
      uniq
    )(rooms);

    const reduceToAmounts = (accum, { extraPersonSupplements }) => {
      mapObjIndexed((amount, type) => {
        accum = mergeDeepRight(accum, { [type]: add(amount, propOr(0, type, accum)) });
      })(extraPersonSupplements);

      return accum;
    };

    const supplementAmounts = reduce(reduceToAmounts, {}, rooms);

    const filterToNeededSupplements = ({ name }) =>
      includes(name, supplementsNamesNeeded) || (isAdult(name) && includes('default', supplementsNamesNeeded));

    const reduceToSupplements = (accum, [date, rate]) => {
      const reduceToRatesAndDates = ({ name, rate }) => {
        const amountLens = lensPath([name, rate, 'amount']);
        const datesLens = lensPath([name, rate, 'dates']);

        accum = pipe(
          set(amountLens, propOr(isAdult(name) ? propOr(0, 'default', supplementAmounts) : 0, name, supplementAmounts)),
          set(datesLens, append(date, defaultTo([], view(datesLens, accum))).sort())
        )(accum);
      };

      pipe(
        propOr('', 'extraPersonSupplement'),
        partial(getHotelsRate, [state]),
        propOr([], 'rates'),
        filter(filterToNeededSupplements),
        map(reduceToRatesAndDates)
      )(rate);

      return accum;
    };

    return pipe(
      map(formatDate),
      pick(__, rates),
      toPairs,
      reduce(reduceToSupplements, {})
    )(days);
  }
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
  [
    getState,
    getSecondArg,
    getPotentialBooking,
    getBookingRoomById,
    getBookingRoomExtraSupplements,
    getBookingRoomDatesById,
  ],
  (state, roomId, potentialBooking, roomBooking, extras, { to, from }) => {
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

    const roomTotals = pipe(
      propOr([], 'Accommodation'),
      filter(propEq('product', roomId)),
      map(prop('total')),
      toTotal
    );

    const mealPlansTotal = pipe(
      reduce(getTotalMealPlans, []),
      toTotal
    )(ratesForDays);

    const extraPersonSupplementsTotal = reduce(getTotalExtraSupplements, 0, values(extras));

    return pipe(
      add(roomTotals(potentialBooking)),
      add(mealPlansTotal),
      multiply(length(guests)),
      add(extraPersonSupplementsTotal),
      formatPrice
    )(0);
  }
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

    const totalFromPotentailBooking = pipe(
      // @todo: Temporary only take the accom. Will remove eventually
      pick(['Accommodation']),
      defaultTo([]),
      map(
        pipe(
          // We would ideally get the total here, but need extra supplement etc. so pass off to the selectors
          // map(propOr(0, 'total')),

          // TEMP until phase 2
          map(({ product }) => getBookingRoomTotal(state, id, product)),
          toTotal
        )
      ),
      toTotal
    );

    const deriveTotalsFromProducts = pipe(
      mapObjIndexed(byProductType),
      toTotal
    );

    return pipe(
      add(totalFromPotentailBooking(potentialBooking)),
      add(deriveTotalsFromProducts(products)),
      formatPrice
    )(0);
  }
);

export const getBookingForBuilder = createSelector(
  [getState, getUnary, getBookingByHotelId],
  (state, hotelId, booking) => {
    let dates = [];

    const addToDates = pipe(
      formatDatesForProductObj,
      values,
      concat(dates)
    );

    const datesForProductObj = pipe(
      formatDatesForProductObj,
      datesForBookingBuild
    );

    const getProductObj = uuid => {
      const product = getHotelProduct(state, uuid);

      if (!product) return;

      const includeDates = propEq('type', 'Accommodation', product);
      const bookingDates = (includeDates && getBookingRoomDatesById(state, hotelId, uuid)) || {};

      dates = addToDates(bookingDates);

      return { uuid, ...(includeDates && datesForProductObj(bookingDates)) };
    };

    const accommodationProducts = pipe(
      propOr({}, 'Accommodation'),
      mapObjIndexed((room, uuid) => repeat(getProductObj(uuid), length(propOr([], 'guests', room)))),
      values,
      flatten
    );

    dates.sort();

    return { Accommodation: accommodationProducts(booking), startDate: head(dates), endDate: last(dates) };
  }
);
