import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from 'reducers';

const composedMiddleware = [applyMiddleware(thunk)];

// Add Redux dev tools if available in non-production environments
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
if (process.env.NODE_ENV !== 'production') {
  window.__REDUX_DEVTOOLS_EXTENSION__ && composedMiddleware.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}
/* eslint-enable */

const composedEnhancers = compose(...composedMiddleware);

export default createStore(rootReducer, composedEnhancers);
