import produce from 'immer';
import { bookingBuilderReducer } from '../reducer';
import * as Actions from '../actions';
import { initialState, BookingBuilderDomain } from '../model';
import { CustomItemPayload } from 'services/BackendApi';
import { sampleResponse as bookingBuilderSampleResponse } from 'services/BackendApi/tests/fixtures/sampleResponse';

describe('Booking Builder Reducer', () => {
  it('Clears the TA Margin state', () => {
    const inputState: BookingBuilderDomain = {
      ...initialState,
      isTAMarginApplied: true,
      taMarginType: 'fixed',
      taMarginAmount: '100',
    };

    const action = Actions.resetBookingBuilderUiStateAction();

    const testState: BookingBuilderDomain = bookingBuilderReducer(inputState, action);
    expect(testState.isTAMarginApplied).toEqual(true);
    expect(testState.taMarginType).toEqual('percentage');
    expect(testState.taMarginAmount).toEqual('0');
  });

  it('handles SAVE_CUSTOM_ITEM correctly', () => {
    
    const customItemPayload: CustomItemPayload = {
      name: 'sample name',
      total: '10.00',
      description: 'sample description',
      countsAsMealPlan: true,
      countsAsTransfer: false
    };

    const hotelUuid = '123-456';

    const inputCurrentBookingBuilder = {
      request: {
        startDate: '12-04-2020',
        endDate: '15-04-2020',
        guestAges: { numberOfAdults: 2, agesOfAllChildren: [] },
        hotelUuid,
        Accommodation: [],
        Transfer: [],
        'Ground Service': [],
        Fine: [],
        Supplement: [],
        customItems: []
      },
      response: bookingBuilderSampleResponse.data.hotels[0].bookingBuilder.response
    };

    const inputState: BookingBuilderDomain = {
      ...initialState,
      currentBookingBuilder: inputCurrentBookingBuilder,
      customItem: {
        payload: customItemPayload
      }
    };
    
    const action = Actions.saveCustomItemAction(hotelUuid)
    const result = bookingBuilderReducer(inputState, action);
    
    const expected = produce(inputState, draftState => {
      if(!draftState.currentBookingBuilder) {
        return null;
      }

      draftState.currentBookingBuilder.request.customItems = [customItemPayload];
      draftState.customItem.payload = null;

      return draftState;
    });

    expect(result).toEqual(expected);
  });

});
