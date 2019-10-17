import { equals, mapObjIndexed, always } from 'ramda';
import { combineReducers } from 'redux';

import { STATUS_TO_IDLE, STORE_RESET, resetStoreStatuses } from './common';

import auth from './modules/auth/reducer';
import bookings from './modules/bookings/reducer';
import countries from './modules/countries/reducer';
import hotel from './modules/hotel/reducer';
import hotels from './modules/hotels/reducer';
import indexes from './modules/indexes/reducer';
import offers from './modules/offers/reducer';
import pages from './modules/pages/reducer';
import proposals from './modules/proposals/reducer';
import search from './modules/search/reducer';
import ui from './modules/ui/reducer';
import users from './modules/users/reducer';
import hotelAccommodationProducts from './modules/hotelAccommodationProducts/reducer';

const clearState = mapObjIndexed(always(undefined));

const rootReducer = combineReducers({
  auth,
  bookings,
  countries,
  hotel,
  hotels,
  indexes,
  offers,
  pages,
  proposals,
  search,
  ui,
  users,
  hotelAccommodationProducts,
});

export default (state, action) => {
  const { type } = action;

  if (equals(type, STATUS_TO_IDLE)) {
    state = resetStoreStatuses(state, action);
  }

  if (equals(type, STORE_RESET)) {
    state = clearState(state);
  }

  return rootReducer(state, action);
};
