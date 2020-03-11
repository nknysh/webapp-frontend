import { IDateRange } from 'interfaces';
import { IOffer } from 'services/BackendApi';
import { initialState, IOfferModel } from '../../../model';
import { offerReducer as reducer } from '../reducer';
import { getOfferRequestAction, getOfferSuccessAction, getOfferFailureAction } from '../../../actions';
import {
  offerHotelUuidChangeAction,
  offerNameChangeAction,
  offerTermsChangeAction,
  offerFurtherInformationChangeAction,
  offerAddStayBetweenPrerequisiteAction,
  offerChangeStayBetweenPrerequisiteAction,
  offerRemoveStayBetweenPrerequisiteAction,
  offerSetBooleanPrerequisiteAction,
  offerSetPreDiscountAction,
} from '../actions';

describe('Offer reducer', () => {
  it('handles GET_OFFER_SUCCESS correctly', () => {
    const action = getOfferSuccessAction({ uuid: '1234' } as IOffer, {}, {}, [], true);
    const result = reducer(initialState.offer, action);
    const expected = { uuid: '1234' } as IOffer;
    expect(result).toEqual(expected);
  });

  describe('Offer reducer edit', () => {
    it('handles OFFER_HOTEL_UUID_CHANGE correctly', () => {
      const action = offerHotelUuidChangeAction('abc123');

      const expected = {
        ...initialState.offer,
        hotelUuid: 'abc123',
      };

      const state = reducer(initialState.offer, action);

      expect(state).toMatchObject(expected);
    });

    it('handles OFFER_NAME_CHANGE correctly', () => {
      const action = offerNameChangeAction('new name');

      const state = reducer(initialState.offer, action);
      const expected = {
        ...initialState.offer,
        name: 'new name',
      };

      expect(state).toMatchObject(expected);
    });

    it('handles OFFER_TERMS_CHANGE correctly', () => {
      const action = offerTermsChangeAction('new ts and cs');

      const state = reducer(initialState.offer, action);
      const expected = {
        ...initialState.offer,
        termsAndConditions: 'new ts and cs',
      };
      expect(state).toMatchObject(expected);
    });

    it('handles OFFER_FURTHER_INFORMATION_CHANGE correctly', () => {
      const action = offerFurtherInformationChangeAction('new further information');

      const state = reducer(initialState.offer, action);

      const expected = {
        ...initialState.offer,
        furtherInformation: 'new further information',
      };
      expect(state).toMatchObject(expected);
    });

    it('handles OFFER_ADD_STAY_BETWEEN_PREREQUISITE correctly with initial state', () => {
      const action = offerAddStayBetweenPrerequisiteAction();

      const expected = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          dates: [
            {
              startDate: '',
              endDate: '',
            },
          ],
        },
      };

      const state = reducer(initialState.offer, action);
      expect(state).toMatchObject(expected);
    });

    it('handles OFFER_CHANGE_STAY_BETWEEN_PREREQUISITE correctly with 1 date', () => {
      const changeAction = offerChangeStayBetweenPrerequisiteAction([['01-01-2020']]);

      const testState: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          dates: [
            {
              startDate: '',
              endDate: '',
            },
          ],
        },
      };

      const expected: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          dates: [
            {
              startDate: '01-01-2020',
              endDate: '01-01-2020',
            },
          ],
        },
      };

      const newState = reducer(testState, changeAction);
      expect(newState).toMatchObject(expected);
    });

    it('handles OFFER_CHANGE_STAY_BETWEEN_PREREQUISITE correctly with multiple dates', () => {
      const changeAction = offerChangeStayBetweenPrerequisiteAction([
        ['01-01-2020', '02-01-2020', '03-01-2020', '04-01-2020'],
      ]);
      const testState = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          dates: [
            {
              startDate: '',
              endDate: '',
            },
          ] as IDateRange[],
        },
      };

      const expected: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          dates: [
            {
              startDate: '01-01-2020',
              endDate: '04-01-2020',
            },
          ],
        },
      };

      const newState = reducer(testState, changeAction);
      expect(newState).toMatchObject(expected);
    });

    it('handles OFFER_CHANGE_STAY_BETWEEN_PREREQUISITE correctly with multiple date arrays', () => {
      const changeAction = offerChangeStayBetweenPrerequisiteAction([
        ['01-01-2020', '02-01-2020', '03-01-2020', '04-01-2020'],
        ['06-02-2020', '07-02-2020', '08-02-2020'],
      ]);

      const testState = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          dates: [
            {
              startDate: '',
              endDate: '',
            },
            {
              startDate: '',
              endDate: '',
            },
          ] as IDateRange[],
        },
      };

      const expected: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          dates: [
            {
              startDate: '01-01-2020',
              endDate: '04-01-2020',
            },
            {
              startDate: '06-02-2020',
              endDate: '08-02-2020',
            },
          ],
        },
      };

      const newState = reducer(testState, changeAction);
      expect(newState).toMatchObject(expected);
    });

    it('handles OFFER_REMOVE_STAY_BETWEEN_PREREQUISITE with only 1 prerequisite', () => {
      const removeAction = offerRemoveStayBetweenPrerequisiteAction(0);
      const testState: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          dates: [
            {
              startDate: '',
              endDate: '',
            },
          ],
        },
      };

      const newState = reducer(testState, removeAction);

      expect(newState.prerequisites.dates.length).toEqual(0);
    });

    it('handles OFFER_REMOVE_STAY_BETWEEN_PREREQUISITE with only multiple prerequisites', () => {
      const removeAction = offerRemoveStayBetweenPrerequisiteAction(1);

      const testState: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          dates: [
            {
              startDate: 'a1',
              endDate: 'a2',
            },
            {
              startDate: 'b1',
              endDate: 'b2',
            },
            {
              startDate: 'c1',
              endDate: 'c2',
            },
          ],
        },
      };

      const newState = reducer(testState, removeAction);
      expect(newState.prerequisites.dates.length).toEqual(2);
      expect(newState.prerequisites.dates[0].startDate).toEqual('a1');
      expect(newState.prerequisites.dates[0].endDate).toEqual('a2');
      expect(newState.prerequisites.dates[1].startDate).toEqual('c1');
      expect(newState.prerequisites.dates[1].endDate).toEqual('c2');
    });

    it('handles OFFER_SET_BOOLEAN_PREREQUISITES with all of them as null', () => {
      const action = offerSetBooleanPrerequisiteAction('anniversary', null);

      const testState: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          payload: {
            anniversary: true,
            wedding: true,
          },
        },
      };

      const expected = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          payload: {
            wedding: true,
          },
        },
      };

      const newState = reducer(testState, action);
      expect(newState).toMatchObject(expected);
    });

    it('handles OFFER_SET_BOOLEAN_PREREQUISITES with setting one as true when a different one is true', () => {
      const action = offerSetBooleanPrerequisiteAction('honeymoon', true);

      const testState: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          payload: {
            wedding: true,
          },
        },
      };

      const expected: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          payload: {
            honeymoon: true,
            wedding: true,
          },
        },
      };

      const newState = reducer(testState, action);
      expect(newState).toMatchObject(expected);
    });

    it('handles OFFER_SET_BOOLEAN_PREREQUISITES with setting one as false when a different one is false', () => {
      const action = offerSetBooleanPrerequisiteAction('birthday', false);

      const testState: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          payload: {
            anniversary: true,
          },
        },
      };

      const expected: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          payload: {
            anniversary: true,
            birthday: false,
          },
        },
      };

      const newState = reducer(testState, action);
      expect(newState).toMatchObject(expected);
    });

    it('handles OFFER_SET_BOOLEAN_PREREQUISITES setting the only payload to null', () => {
      const action = offerSetBooleanPrerequisiteAction('wedding', null);

      const testState: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          payload: {
            wedding: true,
          },
        },
      };
      const expected: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
        },
      };

      const newState = reducer(testState, action);
      expect(newState).toMatchObject(expected);
    });

    it('handles OFFER_SET_BOOLEAN_PREREQUISITES setting a payload value with no previous payload', () => {
      const action = offerSetBooleanPrerequisiteAction('wedding', true);

      const testState: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
        },
      };

      const expected: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          payload: {
            wedding: true,
          },
        },
      };

      const newState = reducer(testState, action);
      expect(newState).toMatchObject(expected);
    });

    it('handles OFFER_SET_PRE_DISCOUNT correctly and sets the value to true', () => {
      const action = offerSetPreDiscountAction(true);

      const testState: IOffer = {
        ...initialState.offer,
        preDiscount: false,
      };

      const expected: IOffer = {
        ...initialState.offer,
        preDiscount: true,
      };

      const newState = reducer(testState, action);
      expect(newState).toMatchObject(expected);
    });

    it('handles OFFER_SET_PRE_DISCOUNT correctly and sets the value to true', () => {
      const action = offerSetPreDiscountAction(false);

      const testState: IOffer = {
        ...initialState.offer,
        preDiscount: true,
      };

      const expected: IOffer = {
        ...initialState.offer,
        preDiscount: false,
      };

      const newState = reducer(testState, action);
      expect(newState).toMatchObject(expected);
    });
  });
});
