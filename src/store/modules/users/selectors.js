import { prop, pipe, props, join, propOr } from 'ramda';

import { getStatus, getData, getEntities, getArg } from 'store/common';
import { createSelector } from 'store/utils';

export const getUsers = prop('users');

export const getUsersStatus = createSelector(
  getUsers,
  getStatus
);

export const getUsersData = createSelector(
  getUsers,
  getData
);

export const getUsersEntities = createSelector(
  getUsers,
  pipe(
    getEntities,
    prop('users')
  )
);

export const getUser = createSelector(
  [getArg(1), getUsersEntities],
  propOr({})
);

export const getUserFullName = createSelector(
  getUser,
  pipe(
    props(['title', 'firstName', 'lastName']),
    join(' ')
  )
);
