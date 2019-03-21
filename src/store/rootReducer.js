import { combineReducers } from 'redux';

import auth from './modules/auth/reducer';
import countries from './modules/countries/reducer';
import hotels from './modules/hotels/reducer';
import hotel from './modules/hotel/reducer';
import pages from './modules/pages/reducer';
import search from './modules/search/reducer';
import ui from './modules/ui/reducer';
import offers from './modules/offers/reducer';
import indexes from './modules/indexes/reducer';

import { STATUS_TO_IDLE } from './common/actions';
import { resetStoreStatuses } from './common/reducer';

const rootReducer = combineReducers({
  auth,
  countries,
  hotels,
  hotel,
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
