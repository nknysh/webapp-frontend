import { initialState, loadingReducer, successReducer, errorReducer, sendingReducer } from 'store/common';
import * as Actions from './actions';

export default function taReducer(state = initialState, action){
  switch(action.type) {
    case Actions.TRAVEL_AGENTS_FETCH: 
      return loadingReducer(state);
    case Actions.TRAVEL_AGENTS_FETCH_SUCCESS:
      return successReducer(state, action)
      case Actions.TRAVEL_AGENTS_FETCH_ERROR:
      return errorReducer(state, action);
    default:
      return state;
  }
}
