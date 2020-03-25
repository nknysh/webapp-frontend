import { initialState, CustomItemSubdomain } from '../../model';
import * as Actions from './actions';

export const customItemReducer = (state: CustomItemSubdomain = initialState.customItem, action: Actions.CustomItemAction): CustomItemSubdomain => {
  switch (action.type) {

    case Actions.SHOW_CUSTOM_ITEM_FORM:
      return {
        ...state,
        payload: {}
      };
    
    case Actions.HIDE_CUSTOM_ITEM_FORM:
      return {
        ...state,
        payload: null
      };
    
    case Actions.UPDATE_CUSTOM_ITEM_NAME:
      return {
        ...state,
        payload: {
          ...state.payload,
          name: action.value
        }
      };
    
    case Actions.UPDATE_CUSTOM_ITEM_TOTAL:
      return {
        ...state,
        payload: {
          ...state.payload,
          total: action.value
        }
      };
    
    case Actions.UPDATE_CUSTOM_ITEM_DESCRIPTION:
      return {
        ...state,
        payload: {
          ...state.payload,
          description: action.value
        }
      };
    
    case Actions.UPDATE_CUSTOM_ITEM_COUNTS_AS_MEAL_PLAN:
      return {
        ...state,
        payload: {
          ...state.payload,
          countsAsMealPlan: action.value
        }
      };
    
    case Actions.UPDATE_CUSTOM_ITEM_COUNTS_AS_TRANSFER:
      return {
        ...state,
        payload: {
          ...state.payload,
          countsAsTransfer: action.value
        }
      };
    
    default:
      return state;

  }
};
