import { combineReducers } from 'redux';

import auth from './modules/auth/reducer';
import countries from './modules/countries/reducer';
import hotels from './modules/hotels/reducer';
import hotel from './modules/hotel/reducer';
import pages from './modules/pages/reducer';
import search from './modules/search/reducer';
import ui from './modules/ui/reducer';
import offers from './modules/offers/reducer';
import { STATUS_TO_IDLE } from './common/actions';
import { resetStatuses } from './common/reducer';

const rootReducer = combineReducers({
  auth,
  countries,
  hotels,
  hotel,
  pages,
  search,
  ui,
  offers,
});

export default (state, action) => {
  const { type } = action;

  if (type === STATUS_TO_IDLE) {
    state = resetStatuses(state, action);
  }

  return rootReducer(state, action);
};
