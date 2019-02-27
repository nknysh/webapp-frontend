import { combineReducers } from 'redux';

import auth from './modules/auth/reducer';
import pages from './modules/pages/reducer';
import ui from './modules/ui/reducer';

const rootReducer = combineReducers({
  auth,
  pages,
  ui,
});

export default rootReducer;
