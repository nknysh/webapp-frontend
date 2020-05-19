import { initialState, AppState } from './model';
import * as Actions from './actions';
import produce from 'immer';

export const appReducer = (
  state: AppState = initialState,
  action: Actions.AppAction
) => {
  switch (action.type) {
    case Actions.SET_LATEST_APP_VERSION:
      return updateLatestAppVersionReducer(state, action);

    default:
      return state;
  }
};

export const updateLatestAppVersionReducer = (
  state: AppState,
  action: Actions.SetLatestAppVersion
): AppState => {
  return produce(state, draftState => {
    draftState.latestAppVersion = action.latestAppVersion;
    return draftState;
  });
};
