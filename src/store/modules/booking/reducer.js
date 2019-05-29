import { propOr, pathOr, isEmpty } from 'ramda';

import { ProductTypes } from 'config/enums';
import { initialState, loadingReducer, successReducer, errorReducer, sendingReducer } from 'store/common';
import { createReducer, getErrorActionName, getSuccessActionName } from 'store/utils';

import { BOOKING_UPDATE, BOOKING_SUBMIT, BOOKING_CHECKS, BOOKING_ROOM_REMOVE } from './actions';

const roomRemove = (state, { payload: { id, ...payload } }) => ({
  ...state,
  data: {
    ...propOr({}, 'data', state),
    [id]: {
      ...pathOr({}, ['data', id], state),
      products: {
        [ProductTypes.ACCOMMODATION]: { ...payload },
      },
      ...(isEmpty(payload) && {
        errors: [],
        potentialBooking: {},
        availableProductSets: {},
        canBeBooked: false,
      }),
    },
  },
});

export default createReducer(
  {
    [BOOKING_UPDATE]: loadingReducer,
    [getSuccessActionName(BOOKING_UPDATE)]: successReducer,
    [getErrorActionName(BOOKING_UPDATE)]: errorReducer,
    [BOOKING_CHECKS]: loadingReducer,
    [getSuccessActionName(BOOKING_CHECKS)]: successReducer,
    [getErrorActionName(BOOKING_CHECKS)]: errorReducer,
    [BOOKING_SUBMIT]: sendingReducer,
    [getErrorActionName(BOOKING_SUBMIT)]: errorReducer,
    [getSuccessActionName(BOOKING_ROOM_REMOVE)]: roomRemove,
  },
  initialState
);
