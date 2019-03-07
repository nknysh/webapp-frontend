import { combineReducers } from 'redux';

import auth from './modules/auth/reducer';
import destinations from './modules/destinations/reducer';
import hotels from './modules/hotels/reducer';
import pages from './modules/pages/reducer';
import search from './modules/search/reducer';
import ui from './modules/ui/reducer';
import offers from './modules/offers/reducer';

const rootReducer = combineReducers({
  auth,
  destinations,
  hotels,
  pages,
  search,
  ui,
  offers,
});

export default rootReducer;
