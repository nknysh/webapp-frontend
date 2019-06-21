import { prop, path, values } from 'ramda';

import client from 'api/users';
import { successAction, errorFromResponse, genericAction } from 'store/common';
import { index } from 'store/modules/indexes/actions';

import schema from './schema';

export const USERS_FETCH = 'USERS_FETCH';

export const fetchUsers = params => async dispatch => {
  dispatch(genericAction(USERS_FETCH, {}));

  try {
    const {
      data: { data },
    } = await client.getUsers(params);

    dispatch(
      index({
        index: 'users',
        ref: prop('id', schema),
        fields: prop('index', schema),
        data: values(path(['entities', 'users'], data)),
      })
    );

    dispatch(successAction(USERS_FETCH, data));
  } catch (e) {
    dispatch(errorFromResponse(USERS_FETCH, e, 'There was a problem fetching users.'));
  }
};
