/**
 * Copyright © 2018 Gigster, Inc. All Rights Reserved.
 *
 * This software and/or related documentation, is protected by copyright and
 * other intellectual property laws, and Gigster and/or its licensors, as
 * applicable, own all right, title and interest in and to its content, and all
 * derivatives, translations, adaptations and combinations of the foregoing. You
 * are not permitted to copy, distribute, transmit, store, display, perform,
 * reproduce, publish, license, create derivative works from, transfer, sell, or
 * make any other use of this software and/or related documentation unless you
 * have entered into a written agreement with Gigster regarding such usage. You
 * agree that all such usage of the software and/or related documentation shall
 * be subject to the terms and conditions of such written agreement, including
 * all applicable license restrictions.
 */

import createReducer from './createReducer';
import utils from './utils';

import { COMPANIES_REQUEST, COMPANIES_OK, COMPANIES_ERROR, COMPANIES_RESET } from '../actions/companies';

const initialState = {
  loading: false,
  request: undefined,
  data: {},
  error: undefined,
};

const handlers = {
  [COMPANIES_REQUEST]: (state, { payload }) => ({
    ...state,
    loading: true,
    request: payload,
  }),
  [COMPANIES_OK]: (state, { payload }) => ({
    ...state,
    loading: false,
    data: {
      ...state.data,
      ...utils.arrayToMap(payload.response),
    },
  }),
  [COMPANIES_ERROR]: (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload.error,
  }),
  [COMPANIES_RESET]: () => ({
    ...initialState,
  }),
};

export default createReducer(handlers, initialState);
