import { combineReducers } from 'redux';

// import { identity, pipe, defaultTo } from 'ramda';

import auth from './modules/auth/reducer';
import pages from './modules/pages/reducer';
import ui from './modules/ui/reducer';

// const reducerShim = pipe(
//   identity,
//   defaultTo({})
// );

const rootReducer = combineReducers({
  auth,
  pages,
  ui,
});

export default rootReducer;
