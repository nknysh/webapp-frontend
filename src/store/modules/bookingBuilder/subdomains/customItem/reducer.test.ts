import * as Actions from './actions';
import { initialState } from '../../model';
import { customItemReducer as reducer } from './reducer';

const customItemInitialState = initialState.customItem;
const customItemEditingState = {
  ...customItemInitialState,
  payload: {}
};

describe('Booking Builder Custom Item reducer', () => {

  it('handles SHOW_CUSTOM_ITEM_FORM correctly', () => {
    const action = Actions.showCustomItemFormAction();
    const result = reducer(customItemInitialState, action);
    
    const expected = {
      ...customItemInitialState,
      payload: {}
    };

    expect(result).toEqual(expected);
  });

  it('handles HIDE_CUSTOM_ITEM_FORM correctly', () => {
    const action = Actions.hideCustomItemFormAction();
    const result = reducer(customItemInitialState, action);
    
    const expected = {
      ...customItemInitialState,
      payload: null
    };

    expect(result).toEqual(expected);
  });

  it('handles UPDATE_CUSTOM_ITEM_NAME correctly', () => {
    const val = 'sample val';
    const action = Actions.updateCustomItemNameAction(val)
    const result = reducer(customItemEditingState, action);
    
    const expected = {
      ...customItemEditingState,
      payload: { name: val }
    };

    expect(result).toEqual(expected);
  });

  it('handles UPDATE_CUSTOM_ITEM_TOTAL correctly', () => {
    const val = '10.00';
    const action = Actions.updateCustomItemTotalAction(val)
    const result = reducer(customItemEditingState, action);
    
    const expected = {
      ...customItemEditingState,
      payload: { total: val }
    };

    expect(result).toEqual(expected);
  });

  it('handles UPDATE_CUSTOM_ITEM_DESCRIPTION correctly', () => {
    const val = 'sample val';
    const action = Actions.updateCustomItemDescriptionAction(val)
    const result = reducer(customItemEditingState, action);
    
    const expected = {
      ...customItemEditingState,
      payload: { description: val }
    };

    expect(result).toEqual(expected);
  });

  it('handles UPDATE_CUSTOM_ITEM_COUNTS_AS_MEAL_PLAN correctly', () => {
    const val = true;
    const action = Actions.updateCustomItemCountsAsMealPlanAction(val)
    const result = reducer(customItemEditingState, action);
    
    const expected = {
      ...customItemEditingState,
      payload: { countsAsMealPlan: val }
    };

    expect(result).toEqual(expected);
  });

  it('handles UPDATE_CUSTOM_ITEM_COUNTS_AS_TRANSFER correctly', () => {
    const val = true;
    const action = Actions.updateCustomItemCountsAsTransferAction(val)
    const result = reducer(customItemEditingState, action);
    
    const expected = {
      ...customItemEditingState,
      payload: { countsAsTransfer: val }
    };

    expect(result).toEqual(expected);
  });

});