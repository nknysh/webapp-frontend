import { ifElse, always, has, pipe, prop, curry, both } from 'ramda';

import { isFunction } from 'utils';

const getActionType = prop('type');

const isReducerFunction = action =>
  pipe(
    prop(getActionType(action)),
    isFunction
  );

const hasAction = pipe(
  getActionType,
  has
);

const hasReducer = action => both(hasAction(action), isReducerFunction(action));
const callReducer = curry((state, action, reducer) => reducer(state, action));
const triggerReducer = (state, action) =>
  pipe(
    prop(getActionType(action)),
    callReducer(state, action)
  );

const applyReducerOrDefault = (state, action, actionsMap) =>
  ifElse(hasReducer(action), triggerReducer(state, action), always(state))(actionsMap);

const createReducer = (actionsMap, initialState) => (state = initialState, action) =>
  applyReducerOrDefault(state, action, actionsMap);

export default createReducer;
