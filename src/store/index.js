import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware as createRouterMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

import { APP_ENV } from 'config';

import authMiddleware from './modules/auth/middleware';
import searchMiddleware from './modules/search/middleware';

import rootReducerFactory from './rootReducer';

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();
const routerMiddleware = createRouterMiddleware(history);

const composedMiddleware = [
  applyMiddleware(thunk),
  applyMiddleware(routerMiddleware),
  applyMiddleware(authMiddleware),
  applyMiddleware(searchMiddleware),
  applyMiddleware(sagaMiddleware),
];

// Add Redux dev tools if available in non-production environments
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
if (APP_ENV !== 'production') {
  window.__REDUX_DEVTOOLS_EXTENSION__ && composedMiddleware.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}
/* eslint-enable */

const composedEnhancers = compose(...composedMiddleware);

export default createStore(rootReducerFactory(history), composedEnhancers);

sagaMiddleware.run(rootSaga);
