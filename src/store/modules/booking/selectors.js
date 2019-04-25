import {
  __,
  add,
  all,
  always,
  append,
  concat,
  curry,
  defaultTo,
  equals,
  F,
  find,
  gt,
  head,
  identity,
  ifElse,
  isEmpty,
  keys,
  length,
  lensPath,
  lensProp,
  map,
  mapObjIndexed,
  memoizeWith,
  mergeDeepRight,
  multiply,
  path,
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
  test,
  toPairs,
  values,
  view,
  when,
} from 'ramda';
import { createSelector } from 'reselect';
import { eachDay, subDays } from 'date-fns';

import { isEmptyOrNil, formatPrice, formatDate } from 'utils';

import { getHotelRoom, getHotelProduct } from 'store/modules/hotels/selectors';
import { getSearchDates } from 'store/modules/search/selectors';

const noQuantity = pipe(
  length,
  equals(0)
);

const hasOccupancy = pipe(
  map(
    pipe(
      values,
      sum
    )
  ),
  all(gt(__, 0))
);

const canBook = pipe(
  prop('quantity'),
  ifElse(noQuantity, F, hasOccupancy)
);

const getRateAmount = pipe(
  path(['entities', 'rates']),
  values,
  head,
  propOr(0, 'rate'),
  Number
);

const getTotalRate = (accum, rate) => append(getRateAmount(rate), accum);

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

  const { to, from } = getBookingRoomDatesById(state, hotelId, roomId);
  const quantity = length(propOr([], 'quantity', roomBooking));

  const rates = prop('rates', hotelRoom);
  const days = eachDay(from, subDays(to, 1));

  const ratesForDays = pipe(
    map(formatDate),
    props(__, rates)
  )(days);

  const getTotalMealPlans = (accum, rate) => {
    const quantity = propOr([], 'quantity', roomBooking);
    const selectedMealPlan = prop('mealPlan', roomBooking);

    const mealPlans = path(['entities', 'Meal Plan'], rate);
    const mealPlan = head(values(pickBy(propEq('product', selectedMealPlan), mealPlans)));
    const mealPlanRates = propOr([], 'rates', mealPlan);

    const getGuestTotal = (amount, type) => {
      const rate = find(propEq('name', type), mealPlanRates);
      return multiply(propOr(0, 'rate', rate), amount);
    };

    const getGuestsTotals = reduce((accum, guestQuantity = {}) => {
      const validGuests = pick(map(prop('name'), mealPlanRates), guestQuantity);

      return append(
        pipe(
          mapObjIndexed(getGuestTotal),
          values,
          sum
        )(validGuests),
        accum
      );
    }, []);

    return !isEmptyOrNil(mealPlan) ? append(Number(sum(getGuestsTotals(quantity))), accum) : accum;
  };

  const ratesTotals = reduce(getTotalRate, []);
  const mealPlansTotal = reduce(getTotalMealPlans, [], ratesForDays);

  return pipe(
    ratesTotals,
    concat(mealPlansTotal),
    sum,
    multiply(quantity),
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

  const getMealPlans = memoizeWith(identity, (hotelRoom, from, to) => {
    const rates = prop('rates', hotelRoom);
    const days = eachDay(from, subDays(to, 1));

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
  });

  return getMealPlans(hotelRoom, from, to);
});

export const getBookingRoomMealPlan = curry((state, hotelId, roomId) => {
  const booking = getBookingRoomById(state, hotelId, roomId);
  const mealPlans = getBookingRoomMealPlans(state, hotelId, roomId);

  return prop(prop('mealPlan', booking), mealPlans);
});

const reduceGuests = (accum, quantity) => {
  map(
    mapObjIndexed((amount, type) => {
      accum = mergeDeepRight(accum, { [type]: add(amount, defaultTo(0, accum[type])) });
    }),
    quantity
  );

  return accum;
};

export const getBookingGuestTotals = pipe(
  getBookingByHotelId,
  prop('accommodationProducts'),
  values,
  map(prop('quantity')),
  reduce(reduceGuests, {})
);

export const getBookingTotal = curry((state, hotelId) => {
  const booking = getBookingByHotelId(state, hotelId);
  const guestTotals = getBookingGuestTotals(state, hotelId);

  const getProductTotal = (accum, product) => {
    const name = prop('name', product);

    const quantity =
      test(/^adult$/i, name) && !prop(name, guestTotals) ? prop('default', guestTotals) : prop(name, guestTotals);

    if (!quantity) return accum;

    const rate = prop('rate', product);
    return add(multiply(quantity, Number(rate)), accum);
  };

  const getProductTotals = pipe(
    path(['rate', 'rates']),
    defaultTo([]),
    reduce(getProductTotal, 0)
  );

  const accommodationProductsTotal = pipe(
    prop('accommodationProducts'),
    keys,
    map(getBookingRoomTotal(state, hotelId)),
    sum
  )(booking);

  const transferProductsTotal = pipe(
    prop('transfer'),
    getHotelProduct('transferProducts', state),
    getProductTotals
  )(booking);

  const groundServiceProductsTotal = pipe(
    prop('groundService'),
    getHotelProduct('groundServices', state),
    getProductTotals
  )(booking);

  return pipe(
    add(accommodationProductsTotal),
    add(transferProductsTotal),
    add(groundServiceProductsTotal),
    formatPrice
  )(0);
});
