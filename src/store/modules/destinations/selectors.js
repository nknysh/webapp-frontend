import { __, prop, pipe, curry } from 'ramda';

export const getDestinations = prop('destinations');

export const getDestinationsData = pipe(
  getDestinations,
  prop('data')
);

export const getDestination = curry((state, index) =>
  pipe(
    getDestinationsData,
    prop(index)
  )(state)
);

export const getDestinationTitle = curry((state, index) =>
  pipe(
    getDestination(__, index),
    prop('title')
  )(state)
);
