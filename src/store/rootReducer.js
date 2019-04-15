import { combineReducers } from 'redux';

import auth from './modules/auth/reducer';
import booking from './modules/booking/reducer';
import countries from './modules/countries/reducer';
import hotel from './modules/hotel/reducer';
import hotels from './modules/hotels/reducer';
import indexes from './modules/indexes/reducer';
import offers from './modules/offers/reducer';
import pages from './modules/pages/reducer';
import search from './modules/search/reducer';
import ui from './modules/ui/reducer';

import { STATUS_TO_IDLE, resetStoreStatuses } from './common';

const rootReducer = combineReducers({
  auth,
  booking,
  countries,
  hotel,
  hotels,
  indexes,
  offers,
  pages,
  search,
  ui,
});

export default (state, action) => {
  const { type } = action;

  if (type === STATUS_TO_IDLE) {
    state = resetStoreStatuses(state, action);
  }

  return rootReducer(state, action);
};
