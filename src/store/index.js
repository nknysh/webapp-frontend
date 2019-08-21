import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import { APP_ENV } from 'config';

import authMiddleware from './modules/auth/middleware';
import searchMiddleware from './modules/search/middleware';
import trackingMiddleware from './modules/tracking/middleware';

import rootReducer from './rootReducer';

const composedMiddleware = [
  applyMiddleware(thunk),
  applyMiddleware(authMiddleware),
  applyMiddleware(searchMiddleware),
  applyMiddleware(trackingMiddleware),
];

// Add Redux dev tools if available in non-production environments
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
if (APP_ENV !== 'production') {
  window.__REDUX_DEVTOOLS_EXTENSION__ && composedMiddleware.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}
/* eslint-enable */

const composedEnhancers = compose(...composedMiddleware);

export default createStore(rootReducer, composedEnhancers);
