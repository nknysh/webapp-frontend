import {
  __,
  add,
  all,
  always,
  append,
  concat,
  curry,
  defaultTo,
  filter,
  flatten,
  head,
  ifElse,
  includes,
  isEmpty,
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
  sum,
  toPairs,
  uniq,
  values,
  view,
  when,
} from 'ramda';
import { createSelector } from 'reselect';

import { isEmptyOrNil, formatPrice, formatDate, getDaysBetween, isAdult } from 'utils';

import { getHotelRoom, getHotelProduct } from 'store/modules/hotels/selectors';
import { getSearchDates } from 'store/modules/search/selectors';

import { canBook, getTotalRate, getGuestsTotals, getTotalExtraSupplements } from './utils';

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
    path(['accommodationProducts', roomId])
  )(state)
);

export const getBookingRoomDatesById = curry((state, hotelId, roomId) =>
  createSelector(
    getSearchDates,
    getBookingByHotelId,
    (searchDates, booking) => {
      return pipe(
        path(['accommodationProducts', roomId, 'dates']),
        when(isEmptyOrNil, always(searchDates))
      )(booking);
    }
  )(state, hotelId)
);

export const getBookingRoomTotal = curry((state, hotelId, roomId) => {
  const hotelRoom = getHotelRoom(state, hotelId, roomId);
  const roomBooking = getBookingRoomById(state, hotelId, roomId);
  const extras = getBookingRoomExtraSupplements(state, hotelId, roomId);

  const { to, from } = getBookingRoomDatesById(state, hotelId, roomId);
  const quantity = length(propOr([], 'quantity', roomBooking));

  const rates = prop('rates', hotelRoom);
  const days = getDaysBetween(from, to);

  const ratesForDays = pipe(
    map(formatDate),
    props(__, rates)
  )(days);

  const getTotalMealPlans = (accum, rate) => {
    const quantity = propOr([], 'quantity', roomBooking);
    const selectedMealPlan = prop('mealPlan', roomBooking);

    const mealPlans = path(['entities', 'Meal Plan'], rate);
    const mealPlan = pipe(
      pickBy(propEq('product', selectedMealPlan)),
      values,
      head
    )(mealPlans);
    const mealPlanRates = propOr([], 'rates', mealPlan);

    return !isEmptyOrNil(mealPlan) ? append(getGuestsTotals(mealPlanRates, quantity), accum) : accum;
  };

  const ratesTotals = reduce(getTotalRate, []);
  const mealPlansTotal = reduce(getTotalMealPlans, [], ratesForDays);
  const extraPersonSupplementsTotal = reduce(getTotalExtraSupplements, 0, values(extras));

  return pipe(
    ratesTotals,
    concat(mealPlansTotal),
    sum,
    multiply(quantity),
    add(extraPersonSupplementsTotal),
    formatPrice
  )(ratesForDays);
});

export const getBookingReady = pipe(
  getBookingByHotelId,
  propOr({}, 'accommodationProducts'),
  values,
  ifElse(isEmpty, always(false), all(canBook))
);

export const getBookingRoomMealPlans = curry((state, hotelId, roomId) => {
  const hotelRoom = getHotelRoom(state, hotelId, roomId);
  const { to, from } = getBookingRoomDatesById(state, hotelId, roomId);

  const getMealPlans = (hotelRoom, from, to) => {
    const rates = prop('rates', hotelRoom);
    const days = getDaysBetween(from, to);

    const reduceToMealPlanDates = (accum, [date, rate]) => {
      const uuids = path(['entities', 'Meal Plan'], rate);
      const rateUuid = prop('result', rate);

      mapObjIndexed(({ product: productUuid, currency, rates }) => {
        const product = path(['entities', 'products', productUuid], rate);
        const productLens = lensProp(productUuid);
        const ratesLens = lensPath([productUuid, 'rates', rateUuid]);
        const datesLens = lensPath([productUuid, 'rates', rateUuid, 'dates']);

        accum = pipe(
          set(productLens, { name: prop('name', product) }),
          set(ratesLens, { rates, currency }),
          set(datesLens, append(date, defaultTo([], view(datesLens, accum))).sort())
        )(accum);
      }, uuids);

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
  const roomBooking = getBookingRoomById(state, hotelId, roomId);
  const quantity = pathOr([], ['checks', 'quantity'], roomBooking);
  const hotelRoom = getHotelRoom(state, hotelId, roomId);
  const { to, from } = getBookingRoomDatesById(state, hotelId, roomId);
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
  )(quantity);

  const reduceToAmounts = (accum, { extraPersonSupplements }) => {
    mapObjIndexed((amount, type) => {
      accum = mergeDeepRight(accum, { [type]: add(amount, propOr(0, type, accum)) });
    })(extraPersonSupplements);

    return accum;
  };

  const supplementAmounts = reduce(reduceToAmounts, {}, quantity);

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
      pathOr([], ['entities', 'extraPersonSupplement']),
      values,
      head,
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

const getProductTotals = curry((booking, product) => {
  const mapAccommodationToProduct = ({ quantity }) => {
    const rates = pathOr([], ['rate', 'rates'], product);

    return getGuestsTotals(rates, quantity);
  };

  return pipe(
    prop('accommodationProducts'),
    mapObjIndexed(mapAccommodationToProduct),
    values,
    sum
  )(booking);
});

export const getTransferProductsTotal = curry((state, hotelId) => {
  const booking = getBookingByHotelId(state, hotelId);

  return pipe(
    prop('transfer'),
    getHotelProduct('transferProducts', state),
    getProductTotals(booking)
  )(booking);
});

export const getGroundServiceProductsTotal = curry((state, hotelId) => {
  const booking = getBookingByHotelId(state, hotelId);

  return pipe(
    prop('groundService'),
    getHotelProduct('groundServiceProducts', state),
    getProductTotals(booking)
  )(booking);
});

export const getBookingTotal = curry((state, hotelId) => {
  const booking = getBookingByHotelId(state, hotelId);

  const accommodationProductsTotal = pipe(
    prop('accommodationProducts'),
    keys,
    map(getBookingRoomTotal(state, hotelId)),
    sum
  )(booking);

  return pipe(
    add(accommodationProductsTotal),
    add(getTransferProductsTotal(state, hotelId)),
    add(getGroundServiceProductsTotal(state, hotelId)),
    formatPrice
  )(0);
});
