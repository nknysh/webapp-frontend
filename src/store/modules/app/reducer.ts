import { initialState, IAppState } from './model';
import * as Actions from './actions';
import produce from 'immer';

export const appReducer = (
  state: IAppState = initialState,
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
  state: IAppState,
  action: Actions.SetLatestAppVersion
): IAppState => {
  return produce(state, draftState => {
    draftState.latestAppVersion = action.latestAppVersion;
    draftState.isAppDeprecated = action.isAppDeprecated;
    return draftState;
  });
};


export default appReducer;
