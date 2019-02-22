import { identity, pipe, defaultTo } from 'ramda';
import { combineReducers } from 'redux';
import { adminReducer } from 'react-admin';

import auth from './modules/auth/reducers';
import bookings from './modules/bookings/reducers';
import comments from './modules/comments/reducers';
import companies from './modules/companies/reducers';
import hotels from './modules/hotels/reducers';
import offers from './modules/offers/reducers';
import options from './modules/options/reducers';
import proposals from './modules/proposals/reducers';
import rates from './modules/rates/reducers';
import rooms from './modules/rooms/reducers';
import travelAgents from './modules/travelAgents/reducers';
import users from './modules/users/reducers';

const reducerShim = pipe(
  identity,
  defaultTo({})
);

const rootReducer = combineReducers({
  admin: adminReducer,
  app: reducerShim({}),
  auth,
  bookings,
  comments,
  companies,
  hotels,
  offers,
  options,
  proposals,
  rates,
  rooms,
  travelAgents,
  users,
});

export default rootReducer;
