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

// Libraries
import { combineReducers } from 'redux';
import { adminReducer } from 'react-admin';

// Reducers
import auth from './auth';
import bookings from './bookings';
import companies from './companies';
import hotels from './hotels';
import offers from './offers';
import options from './options';
import proposals from './proposals';
import rates from './rates';
import rooms from './rooms';
import travelAgents from './travelAgents';
import users from './users';
import comments from './comments';

const rootReducer = combineReducers({
  admin: adminReducer,
  app: (state = {}) => state,
  auth,
  bookings,
  companies,
  hotels,
  offers,
  options,
  proposals,
  rates,
  rooms,
  travelAgents,
  users,
  comments,
});

export default rootReducer;

