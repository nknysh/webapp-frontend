import { prop, path, values } from 'ramda';

import client from 'api/users';
import { successAction, errorFromResponse, genericAction } from 'store/common';
import { index } from 'store/modules/indexes';
import { authCheck } from 'store/modules/auth/actions';
import { enqueueNotification } from 'store/modules/ui/actions';

import schema from './schema';

export const USERS_FETCH = 'USERS_FETCH';
export const USER_UPDATE = 'USER_UPDATE';

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

export const updateUser = (id, body, params) => async dispatch => {
  dispatch(genericAction(USER_UPDATE, { id, ...body }));

  try {
    const {
      data: { data },
    } = await client.updateUser(id, { data: { attributes: body } }, params);

    dispatch(authCheck());
    dispatch(successAction(USER_UPDATE, data));
    dispatch(enqueueNotification({ message: 'User updated successfully.', options: { variant: 'success' } }));
  } catch (e) {
    dispatch(errorFromResponse(USER_UPDATE, e, 'There was a problem updating user.'));
  }
};
