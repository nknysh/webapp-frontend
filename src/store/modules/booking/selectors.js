import {
  __,
  add,
  all,
  always,
  append,
  cond,
  curry,
  defaultTo,
  equals,
  filter,
  find,
  flatten,
  head,
  identity,
  ifElse,
  includes,
  keys,
  length,
  lensPath,
  lensProp,
  map,
  mapObjIndexed,
  mergeDeepRight,
  multiply,
  path,
  pathOr,
  pick,
  pickBy,
  pipe,
  prop,
  propEq,
  propOr,
  props,
  reduce,
  set,
  T,
  toPairs,
  uniq,
  values,
  view,
  when,
} from 'ramda';
import { createSelector } from 'reselect';

import { isEmptyOrNil, formatPrice, formatDate, getDaysBetween, isAdult, isArray } from 'utils';

import { getHotelRoom, getHotelProduct, getHotelsRates, getHotelsRate } from 'store/modules/hotels/selectors';
import { getSearchDates } from 'store/modules/search/selectors';

import {
  canBook,
  getTotalRate,
  getGuestsTotals,
  getTotalExtraSupplements,
  categoryEquals,
  totalShim,
  toTotal,
} from './utils';

export const ProductType = Object.freeze({
  PER_NIGHT: 'perNight',
  PER_BOOKING: 'perBooking',
  PER_PERSON: 'perPerson',
  PER_PERSON_PER_NIGHT: 'perPersonPerNight',
  PER_ACCOMMODATION_PRODUCT: 'perAccommodationProduct',
});

const preMap = cond([[equals('Accommodation'), always(uniq)], [T, always(identity)]]);

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
    prop('rooms'),
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
    prop('rooms'),
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
    [T, totalShim],
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

export const getBookingByHotelId = curry((state, id) =>
  pipe(
    getBookingData,
    prop(id)
  )(state)
);

export const getBookingRoomById = curry((state, hotelId, roomId) =>
  pipe(
    getBookingByHotelId(__, hotelId),
    path(['rooms', roomId])
  )(state)
);

export const getBookingRoomDatesById = curry((state, hotelId, roomId) =>
  createSelector(
    getSearchDates,
    getBookingByHotelId,
    (searchDates, booking) => {
      return pipe(
        path(['rooms', roomId, 'dates']),
        when(isEmptyOrNil, always(searchDates))
      )(booking);
    }
  )(state, hotelId)
);

export const getBookingRoomTotal = curry((state, hotelId, roomId) => {
  const roomBooking = getBookingRoomById(state, hotelId, roomId);
  const product = getHotelProduct(state, roomId);
  const rates = prop('rates', product);
  const guests = prop('guests', roomBooking);

  const extras = getBookingRoomExtraSupplements(state, hotelId, roomId);

  const { to, from } = getBookingRoomDatesById(state, hotelId, roomId);
  const days = getDaysBetween(from, to);

  const ratesForDays = pipe(
    map(formatDate),
    props(__, rates)
  )(days);

  const getTotalMealPlans = (accum, rate) => {
    const selectedMealPlan = prop('mealPlan', roomBooking);

    const mealPlan = pipe(
      pathOr([], ['addons', 'Meal Plan']),
      getHotelsRates(state),
      pickBy(propEq('product', selectedMealPlan)),
      values,
      head
    )(rate);

    const mealPlanRates = propOr([], 'rates', mealPlan);

    return isEmptyOrNil(mealPlan) ? accum : append(getGuestsTotals(mealPlanRates, guests), accum);
  };

  const roomTotals = pipe(
    reduce(getTotalRate, []),
    toTotal
  )(ratesForDays);

  const mealPlansTotal = pipe(
    reduce(getTotalMealPlans, []),
    toTotal
  )(ratesForDays);

  const extraPersonSupplementsTotal = reduce(getTotalExtraSupplements, 0, values(extras));

  return pipe(
    add(roomTotals),
    add(mealPlansTotal),
    multiply(length(guests)),
    add(extraPersonSupplementsTotal),
    formatPrice
  )(0);
});

export const getBookingReady = pipe(
  getBookingByHotelId,
  propOr({}, 'rooms'),
  values,
  ifElse(isEmptyOrNil, always(false), all(canBook))
);

export const getBookingRoomMealPlans = curry((state, hotelId, roomId) => {
  const hotelRoom = getHotelRoom(state, hotelId, roomId);
  const { to, from } = getBookingRoomDatesById(state, hotelId, roomId);

  const getMealPlans = (hotelRoom, from, to) => {
    const rates = prop('rates', hotelRoom);
    const days = getDaysBetween(from, to);

    const reduceToMealPlanDates = (accum, [date, rate]) => {
      const mealPlans = pathOr([], ['addons', 'Meal Plan'], rate);
      const rateUuid = prop('uuid', rate);

      mapObjIndexed(({ product: productUuid, currency, rates }) => {
        const product = getHotelProduct(state, productUuid);
        const productLens = lensProp(productUuid);
        const ratesLens = lensPath([productUuid, 'rates', rateUuid]);
        const datesLens = lensPath([productUuid, 'rates', rateUuid, 'dates']);

        accum = pipe(
          set(productLens, { name: prop('name', product) }),
          set(ratesLens, { rates, currency }),
          set(datesLens, append(date, defaultTo([], view(datesLens, accum))).sort())
        )(accum);
      }, getHotelsRates(state, mealPlans));

      return accum;
    };

    return pipe(
      map(formatDate),
      pick(__, rates),
      toPairs,
      reduce(reduceToMealPlanDates, {})
    )(days);
  };

  return getMealPlans(hotelRoom, from, to);
});

export const getBookingRoomExtraSupplements = curry((state, hotelId, roomId) => {
  const hotelRoom = getHotelRoom(state, hotelId, roomId);
  const roomBooking = getBookingRoomById(state, hotelId, roomId);
  const { to, from } = getBookingRoomDatesById(state, hotelId, roomId);

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
      getHotelsRate(state),
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
});

export const getBookingRoomMealPlan = curry((state, hotelId, roomId) => {
  const booking = getBookingRoomById(state, hotelId, roomId);
  const mealPlans = getBookingRoomMealPlans(state, hotelId, roomId);

  return prop(prop('mealPlan', booking), mealPlans);
});

export const getTransferProductsTotal = curry((state, hotelId) => {
  const booking = getBookingByHotelId(state, hotelId);

  return pipe(
    path(['products', 'Transfer']),
    getProductTotal(state),
    toTotal
  )(booking);
});

export const getGroundServiceProductsTotal = curry((state, hotelId) => {
  const booking = getBookingByHotelId(state, hotelId);

  return pipe(
    path(['products', 'Ground Service']),
    getProductTotal(state),
    toTotal
  )(booking);
});

export const getBookingTotal = curry((state, hotelId) => {
  const booking = getBookingByHotelId(state, hotelId);
  const products = prop('products', booking);

  const byProductType = (uuids, type) => {
    const byType = cond([
      // Pass off accommodation to the room total selector
      [equals('Accommodation'), always(getBookingRoomTotal(state, hotelId))],
      [T, always(getProductTotal(state))],
    ]);

    return pipe(
      preMap(type),
      ifElse(isArray, map(byType(type)), byType(type)),
      map(Number),
      toTotal
    )(uuids);
  };

  const deriveTotalsFromProducts = pipe(
    mapObjIndexed(byProductType),
    toTotal
  );

  return pipe(
    add(deriveTotalsFromProducts(products)),
    formatPrice
  )(0);
});
