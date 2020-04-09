import {
  add,
  append,
  both,
  concat,
  defaultTo,
  find,
  gte,
  head,
  inc,
  invoker,
  length,
  lensProp,
  lte,
  map,
  over,
  pathOr,
  pipe,
  prop,
  propSatisfies,
  reduce,
  uniq,
} from 'ramda';

import { ProductTypes } from 'config/enums';

const adultLens = lensProp('adult');
const incrementBy1 = pipe(defaultTo(0), inc);

export const getTotalGuests = reduce(
  (accum, room) =>
    pipe(
      add(pathOr(0, ['guestAges', 'numberOfAdults'], room)),
      add(length(pathOr([], ['guestAges', 'agesOfAllChildren'], room)))
    )(accum),
  0
);

export const getAgeSplits = (product, rooms, asArray = false) => {
  const ageOptions = pathOr([], ['options', 'ages'], product);

  const overallSplits = reduce((accum, room) => {
    const adults = pathOr(0, ['guestAges', 'numberOfAdults'], room);
    const nonAdults = pathOr([], ['guestAges', 'agesOfAllChildren'], room);

    map(age => {
      const findByAge = both(propSatisfies(gte(age), 'ageFrom'), propSatisfies(lte(age), 'ageTo'));
      const ageGroup = find(findByAge, ageOptions);

      const nonAdultLens = lensProp(prop('name', ageGroup));
      const lens = ageGroup ? nonAdultLens : adultLens;

      const handler = asArray ? pipe(defaultTo([]), append(age)) : incrementBy1;

      accum = over(lens, handler, accum);
    }, nonAdults);

    return over(adultLens, pipe(defaultTo(0), add(adults)), accum);
  }, {});

  return overallSplits(rooms);
};

export const getDates = pipe(
  reduce((accum, room) => concat(prop('dates', room), accum), []),
  uniq,
  invoker(0, 'sort')
);

export const getProduct = pipe(head, prop('product'));

export const getSupplements = reduce(
  (accum, room) => concat(pathOr([], ['subProducts', 'Supplement'], room), accum),
  []
);

export const getMealPlans = reduce(
  (accum, room) => concat(pathOr([], ['subProducts', ProductTypes.MEAL_PLAN], room), accum),
  []
);
