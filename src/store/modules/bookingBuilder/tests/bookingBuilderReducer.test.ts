import produce from 'immer';
import { pick } from 'ramda';
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

  it('handles UPDATE_AGREEE_TO_TERMS correctly', () => {
    const action = Actions.updateAgreeToTermsAction(true);
    const testState: BookingBuilderDomain = bookingBuilderReducer(initialState, action);
    
    expect(testState.agreeToTerms).toEqual(true);
  });

  it('handles SET_IS_PRISTINE correctly', () => {
    const action = Actions.setIsPristineAction(false);
    const testState: BookingBuilderDomain = bookingBuilderReducer(initialState, action);
    
    expect(testState.isPristine).toEqual(false);
  });

  it('handles UPDATE_BOOKING_GUEST_INFORMATION_ACTION correctly', () => {
    const payload = {
      guestTitle: 'mr',
      guestFirstName: 'John',
      guestLastName: 'Smith',
      isRepeatGuest: true,
      specialRequests: ['adjacentRooms'],
      comments: 'sample comment',
    };

    const action = Actions.updateBookingGuestInformationAction(payload)
    const testState: BookingBuilderDomain = bookingBuilderReducer(initialState, action);
    
    expect(pick(Object.keys(payload), testState)).toMatchObject(payload);
  });

  describe('Booking Builder Custom Item Actions', () => {
   
    const customItemPayload: CustomItemPayload = {
      name: 'sample name',
      total: '10.00',
      description: 'sample description',
      countsAsMealPlan: true,
      countsAsTransfer: false
    };
  
    const hotelUuid = '123-456';

    const produceInputState = (customItems: CustomItemPayload[], payload: CustomItemPayload | null): BookingBuilderDomain => ({
      ...initialState,
      currentBookingBuilder: {
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
          customItems
        },
        response: bookingBuilderSampleResponse.data.hotels[0].bookingBuilder.response
      },
      customItem: { payload }
    });  
  
    it('handles SAVE_CUSTOM_ITEM correctly', () => {
      const inputState = produceInputState([], customItemPayload);
      
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

    it('handles REMOVE_CUSTOM_ITEM correctly', () => {
      const inputState = produceInputState([customItemPayload], null);
      
      const action = Actions.removeCustomItemAction(0, hotelUuid)
      const result = bookingBuilderReducer(inputState, action);
      
      const expected = produce(inputState, draftState => {
        if(!draftState.currentBookingBuilder) {
          return null;
        }

        draftState.currentBookingBuilder.request.customItems = [];

        return draftState;
      });

      expect(result).toEqual(expected);
    });
  });
});
