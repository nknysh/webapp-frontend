import { IBootstrapModule, initialState } from './model';
import { BoostrapDomainAction, BOOTSTRAP_APP_REQUEST, BOOTSTRAP_APP_SUCCESS, BOOTSTRAP_APP_FAILURE } from './actions';
import produce from 'immer';

export const bootstrap = (state: IBootstrapModule = initialState, action: BoostrapDomainAction): IBootstrapModule => {
  switch (action.type) {
    case BOOTSTRAP_APP_SUCCESS:
      return produce(state, draftState => {
        draftState.countries = action.countries;
        draftState.hotels = action.hotels;
        return draftState;
      });
    default:
      return state;
  }
};
