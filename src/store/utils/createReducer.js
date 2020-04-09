import { ifElse, always, has, pipe, prop, curry, both } from 'ramda';

import { isFunction } from 'utils';

/**
 * Get action type
 *
 * @param {object}
 * @returns {string}
 */
const getActionType = prop('type');

/**
 * Is reducer function
 *
 * @param {object} action
 * @returns {boolean}
 */
const isReducerFunction = action => pipe(prop(getActionType(action)), isFunction);

/**
 * Has action
 *
 * Returns function to check whether the object has
 * an action or not
 *
 * @param {object}
 * @returns {Function}
 */
const hasAction = pipe(getActionType, has);

/**
 * Has reducer
 *
 * Function to check if the action exists and that
 * the reducer is a function
 *
 * @param {string} action
 * @returns {Function}
 */
const hasReducer = action => both(hasAction(action), isReducerFunction(action));

/**
 * Call reducer
 *
 * Curried function to call a reducer with the state and the action
 *
 * @param {object} state
 * @param {object} action
 * @param {Function} reducer
 * @returns {Function | object}
 */
const callReducer = curry((state, action, reducer) => reducer(state, action));

/**
 * Trigger reducer
 *
 * Function that calls reducer based on action
 *
 * @param {object} state
 * @param {object} action
 * @returns {object}
 */
const triggerReducer = (state, action) => pipe(prop(getActionType(action)), callReducer(state, action));

/**
 * Apply reducer or default
 *
 * Checks to see if the action triggered has a reducer, if not
 * returns the state as is
 *
 * @param {object} state
 * @param {object} action
 * @param {object} actionsMap
 * @returns {object}
 */
const applyReducerOrDefault = (state, action, actionsMap) =>
  ifElse(hasReducer(action), triggerReducer(state, action), always(state))(actionsMap);

/**
 * Create reducer
 *
 * Takes a key value object of actions and reducers e.g.
 *
 * ```js
 * {
 *  'ACTION_NAME': (state, action) => {}
 * }
 * ```
 *
 * Also takes an initial state for the redux key
 *
 * @param {object} actionsMap
 * @param {object} initialState
 * @returns {Function}
 */
const createReducer = (actionsMap, initialState) => (state = initialState, action) =>
  applyReducerOrDefault(state, action, actionsMap);

export default createReducer;
