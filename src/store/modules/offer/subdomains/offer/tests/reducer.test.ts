import { IDateRange } from 'interfaces';
import { IOffer } from 'services/BackendApi';
import { initialState, IOfferModel } from '../../../model';
import { offerReducer as reducer, offerSetStayLengthMinimumPrerequisiteReducer } from '../reducer';
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
  offerSetCountryCodePrerequisiteAction,
  offerClearAllCountryCodePrerequisiteAction,
  offerSetAccommodationProductPrerequisiteAction,
  offerClearAllAccommodationProductPrerequisiteAction,
  offerSetAdvanceBookByPrerequisiteAction,
  offerSetAdvanceMinimumPrerequisiteAction,
  offerSetAdvanceMaximumPrerequisiteAction,
  offerClearAllAdvancePrerequisiteAction,
  offerSetStayLengthMaximumPrerequisiteAction,
  offerSetStayLengthMinimumPrerequisiteAction,
  offerSetStayLengthStrictPrerequisiteAction,
  offerClearAllStayLengthPrerequisiteAction,
  offerSetSteppingEveryXNightsApplicationAction,
  offerSetSteppingApplyToApplicationAction,
  offerSetSteppingMaximumNightsApplicationAction,
  offerSetSteppingDiscountCheapestApplicationAction,
  offerClearAllSteppingApplicationAction,
  offerSetAccommodationDiscountDiscountPercentageAction,
  offerSetAccommodationDiscountGreenTaxApproachAction,
  offerClearAllAccommodationDiscountAction,
} from '../actions';

describe('Offer reducer', () => {
  it('handles GET_OFFER_SUCCESS correctly', () => {
    const action = getOfferSuccessAction({ uuid: '1234' } as IOffer, {}, {}, [], true, []);
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

  describe('offer reducer country codes', () => {
    it('handles OFFER_SET_COUNTRY_CODE_PREREQUISITE correctly to add a country', () => {
      const action = offerSetCountryCodePrerequisiteAction('AZ', true);

      const testState: IOffer = {
        ...initialState.offer,
      };

      const expected: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          countryCodes: ['AZ'],
        },
      };

      const newState = reducer(testState, action);
      expect(newState).toMatchObject(expected);
    });

    it('handles OFFER_SET_COUNTRY_CODE_PREREQUISITE correctly to remove a country', () => {
      const action = offerSetCountryCodePrerequisiteAction('UK', false);

      const testState: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          countryCodes: ['UK'],
        },
      };

      const expected: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          countryCodes: [],
        },
      };

      const newState = reducer(testState, action);
      expect(newState).toMatchObject(expected);
    });

    it('handles OFFER_SET_COUNTRY_CODE_PREREQUISITE correctly wont add a country twice', () => {
      const action = offerSetCountryCodePrerequisiteAction('UK', true);

      const testState: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          countryCodes: ['UK'],
        },
      };

      const expected: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          countryCodes: ['UK'],
        },
      };

      const newState = reducer(testState, action);
      expect(newState).toMatchObject(expected);
    });

    it('handles OFFER_SET_COUNTRY_CODE_PREREQUISITE correctly add a new country alongside an old country', () => {
      const action = offerSetCountryCodePrerequisiteAction('UK', true);

      const testState: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          countryCodes: ['AZ'],
        },
      };

      const expected: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          countryCodes: ['AZ', 'UK'],
        },
      };

      const newState = reducer(testState, action);
      expect(newState).toMatchObject(expected);
    });

    it('handles OFFER_SET_COUNTRY_CODE_PREREQUISITE correctly doesnt crash if you attempt to remove a country that isnt there', () => {
      const action = offerSetCountryCodePrerequisiteAction('UK', false);

      const testState: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          countryCodes: ['AZ'],
        },
      };

      const expected: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          countryCodes: ['AZ'],
        },
      };

      const newState = reducer(testState, action);
      expect(newState).toMatchObject(expected);
    });

    it('handles OFFER_CLEAR_ALL_COUNTRY_CODE_PREREQUISITE correctly removes all country codes from array', () => {
      const action = offerClearAllCountryCodePrerequisiteAction();

      const testState: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          countryCodes: ['AZ', 'UK', 'RU'],
        },
      };

      const expected: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          countryCodes: [],
        },
      };

      const newState = reducer(testState, action);
      expect(newState).toMatchObject(expected);
    });

    it('handles OFFER_CLEAR_ALL_COUNTRY_CODE_PREREQUISITE correctly removes all country codes from array even if array is already empty', () => {
      const action = offerClearAllCountryCodePrerequisiteAction();

      const testState: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          countryCodes: [],
        },
      };

      const expected: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          countryCodes: [],
        },
      };

      const newState = reducer(testState, action);
      expect(newState).toMatchObject(expected);
    });
  });

  describe('offer reducer accommodation products', () => {
    it('handles OFFER_SET_ACCOMMODATION_PRODUCT_PREREQUISITE correctly to remove an accommodation product', () => {
      const action = offerSetAccommodationProductPrerequisiteAction('A', false);

      const testState: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          accommodationProducts: ['A'],
        },
      };

      const expected: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          accommodationProducts: [],
        },
      };

      const newState = reducer(testState, action);
      expect(newState).toMatchObject(expected);
    });

    it('handles OFFER_SET_ACCOMMODATION_PRODUCT_PREREQUISITE correctly wont add an accommodation product twice', () => {
      const action = offerSetAccommodationProductPrerequisiteAction('A', true);

      const testState: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          accommodationProducts: ['A'],
        },
      };

      const expected: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          accommodationProducts: ['A'],
        },
      };

      const newState = reducer(testState, action);
      expect(newState).toMatchObject(expected);
    });

    it('handles OFFER_SET_ACCOMMODATION_PRODUCT_PREREQUISITE correctly add a new accommodation product alongside an old country', () => {
      const action = offerSetAccommodationProductPrerequisiteAction('B', true);

      const testState: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          accommodationProducts: ['A'],
        },
      };

      const expected: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          accommodationProducts: ['A', 'B'],
        },
      };

      const newState = reducer(testState, action);
      expect(newState).toMatchObject(expected);
    });

    it('handles OFFER_SET_ACCOMMODATION_PRODUCT_PREREQUISITE correctly doesnt crash if you attempt to remove an accommodation product that isnt there', () => {
      const action = offerSetAccommodationProductPrerequisiteAction('A', false);

      const testState: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          accommodationProducts: [],
        },
      };

      const expected: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          accommodationProducts: [],
        },
      };

      const newState = reducer(testState, action);
      expect(newState).toMatchObject(expected);
    });

    it('handles OFFER_CLEAR_ALL_ACCOMMODATION_PRODUCT_PREREQUISITE correctly removes all accommodation products from array', () => {
      const action = offerClearAllAccommodationProductPrerequisiteAction();

      const testState: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          accommodationProducts: ['AZ', 'UK', 'RU'],
        },
      };

      const expected: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          accommodationProducts: [],
        },
      };

      const newState = reducer(testState, action);
      expect(newState).toMatchObject(expected);
    });

    it('handles OFFER_CLEAR_ALL_ACCOMMODATION_PRODUCT_PREREQUISITE correctly removes all accommodation products from array (even if already empty)', () => {
      const action = offerClearAllAccommodationProductPrerequisiteAction();

      const testState: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          accommodationProducts: [],
        },
      };

      const expected: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          accommodationProducts: [],
        },
      };

      const newState = reducer(testState, action);
      expect(newState).toMatchObject(expected);
    });
  });

  describe('offer reducer advance prerequisite', () => {
    it('handles offer set advance book by', () => {
      const action = offerSetAdvanceBookByPrerequisiteAction('2020-05-05');

      const testState: IOffer = {
        ...initialState.offer,
      };

      const expected: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          advance: {
            ...initialState.offer.prerequisites.advance,
            bookBy: '2020-05-05',
          },
        },
      };

      const newState = reducer(testState, action);
      expect(newState).toMatchObject(expected);
    });

    it('handles offer set advance minimum', () => {
      const action = offerSetAdvanceMinimumPrerequisiteAction(6);

      const testState: IOffer = {
        ...initialState.offer,
      };

      const expected: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          advance: {
            ...initialState.offer.prerequisites.advance,
            minimum: 6,
          },
        },
      };

      const newState = reducer(testState, action);
      expect(newState).toMatchObject(expected);
    });

    it('handles offer set advance maximum', () => {
      const action = offerSetAdvanceMaximumPrerequisiteAction(11);

      const testState: IOffer = {
        ...initialState.offer,
      };

      const expected: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          advance: {
            ...initialState.offer.prerequisites.advance,
            maximum: 11,
          },
        },
      };

      const newState = reducer(testState, action);
      expect(newState).toMatchObject(expected);
    });

    it('handles clear all advance prerequisite', () => {
      const action = offerClearAllAdvancePrerequisiteAction();

      const testState: IOffer = {
        ...initialState.offer,
      };

      const expected: IOffer = {
        ...initialState.offer,
      };

      const newState = reducer(testState, action);
      expect(newState).toMatchObject(expected);
    });
  });

  describe('offer reducer stay length prerequisite', () => {
    it('handles offer set stay length minimum prerequisite', () => {
      const action = offerSetStayLengthMinimumPrerequisiteAction(4);

      const testState: IOffer = {
        ...initialState.offer,
      };

      const expected: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          stayLength: {
            ...initialState.offer.prerequisites.stayLength,
            minimum: 4,
          },
        },
      };

      const newState = reducer(testState, action);
      expect(newState).toMatchObject(expected);
    });

    it('handles offer set stay length maximum prerequisite', () => {
      const action = offerSetStayLengthMaximumPrerequisiteAction(7);

      const testState: IOffer = {
        ...initialState.offer,
      };

      const expected: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          stayLength: {
            ...initialState.offer.prerequisites.stayLength,
            maximum: 7,
          },
        },
      };

      const newState = reducer(testState, action);
      expect(newState).toMatchObject(expected);
    });

    it('handles offer set stay length strict prerequisite', () => {
      const action = offerSetStayLengthStrictPrerequisiteAction(true);

      const testState: IOffer = {
        ...initialState.offer,
      };

      const expected: IOffer = {
        ...initialState.offer,
        prerequisites: {
          ...initialState.offer.prerequisites,
          stayLength: {
            ...initialState.offer.prerequisites.stayLength,
            strictMinMaxStay: true,
          },
        },
      };

      const newState = reducer(testState, action);
      expect(newState).toMatchObject(expected);
    });

    it('handles offer clear all stay length prerequisite', () => {
      const action = offerClearAllStayLengthPrerequisiteAction();

      const testState: IOffer = {
        ...initialState.offer,
      };

      const expected: IOffer = {
        ...initialState.offer,
      };

      const newState = reducer(testState, action);
      expect(newState).toMatchObject(expected);
    });
  });

  describe('offer reducer stepping application', () => {
    it('handles offer set stepping every x nights', () => {
      const action = offerSetSteppingEveryXNightsApplicationAction(5);

      const testState: IOffer = {
        ...initialState.offer,
      };

      const expected: IOffer = {
        ...initialState.offer,
        stepping: {
          ...initialState.offer.stepping,
          everyXNights: 5,
        },
      };

      const newState = reducer(testState, action);
      expect(newState).toMatchObject(expected);
    });

    it('handles offer set stepping apply to', () => {
      const action = offerSetSteppingApplyToApplicationAction(2);

      const testState: IOffer = {
        ...initialState.offer,
      };

      const expected: IOffer = {
        ...initialState.offer,
        stepping: {
          ...initialState.offer.stepping,
          applyTo: 2,
        },
      };

      const newState = reducer(testState, action);
      expect(newState).toMatchObject(expected);
    });

    it('handles offer set stepping maximum nights', () => {
      const action = offerSetSteppingMaximumNightsApplicationAction(9);

      const testState: IOffer = {
        ...initialState.offer,
      };

      const expected: IOffer = {
        ...initialState.offer,
        stepping: {
          ...initialState.offer.stepping,
          maximumNights: 9,
        },
      };

      const newState = reducer(testState, action);
      expect(newState).toMatchObject(expected);
    });

    it('handles offer set stepping discount cheapest', () => {
      const action = offerSetSteppingDiscountCheapestApplicationAction(true);

      const testState: IOffer = {
        ...initialState.offer,
      };

      const expected: IOffer = {
        ...initialState.offer,
        stepping: {
          ...initialState.offer.stepping,
          discountCheapest: true,
        },
      };

      const newState = reducer(testState, action);
      expect(newState).toMatchObject(expected);
    });

    it('handles offer clear all stepping', () => {
      const action = offerClearAllSteppingApplicationAction();

      const testState: IOffer = {
        ...initialState.offer,
        stepping: {
          everyXNights: 2,
          applyTo: 6,
          maximumNights: 9,
          discountCheapest: true,
        },
      };

      const expected: IOffer = {
        ...initialState.offer,
      };

      const newState = reducer(testState, action);
      expect(newState).toMatchObject(expected);
    });
  });

  describe('offer reducer accommodation discount application', () => {
    it('handles setting accommodation discount discount percentage (integer)', () => {
      const action = offerSetAccommodationDiscountDiscountPercentageAction(5);

      const testState: IOffer = {
        ...initialState.offer,
      };

      const expected: IOffer = {
        ...initialState.offer,
        accommodationProductDiscount: {
          ...initialState.offer.accommodationProductDiscount,
          discountPercentage: 5,
        },
      };

      const newState = reducer(testState, action);
      expect(newState).toMatchObject(expected);
    });

    it('handles setting accommodation discount discount percentage (float)', () => {
      const action = offerSetAccommodationDiscountDiscountPercentageAction(8.3);

      const testState: IOffer = {
        ...initialState.offer,
      };

      const expected: IOffer = {
        ...initialState.offer,
        accommodationProductDiscount: {
          ...initialState.offer.accommodationProductDiscount,
          discountPercentage: 8.3,
        },
      };

      const newState = reducer(testState, action);
      expect(newState).toMatchObject(expected);
    });

    it('handles setting accommodation discount discount percentage (2 decimal places float)', () => {
      const action = offerSetAccommodationDiscountDiscountPercentageAction(8.39);

      const testState: IOffer = {
        ...initialState.offer,
      };

      const expected: IOffer = {
        ...initialState.offer,
        accommodationProductDiscount: {
          ...initialState.offer.accommodationProductDiscount,
          discountPercentage: 8.39,
        },
      };

      const newState = reducer(testState, action);
      expect(newState).toMatchObject(expected);
    });

    it('handles setting accommodation discount green tax approach', () => {
      const action = offerSetAccommodationDiscountGreenTaxApproachAction('GREEN_TAX');

      const testState: IOffer = {
        ...initialState.offer,
      };

      const expected: IOffer = {
        ...initialState.offer,
        accommodationProductDiscount: {
          ...initialState.offer.accommodationProductDiscount,
          greenTaxDiscountApproach: 'GREEN_TAX',
        },
      };

      const newState = reducer(testState, action);
      expect(newState).toMatchObject(expected);
    });

    it('handles clear all accommodation discount', () => {
      const action = offerClearAllAccommodationDiscountAction();

      const testState: IOffer = {
        ...initialState.offer,
        accommodationProductDiscount: {
          discountPercentage: 5,
          greenTaxDiscountApproach: 'GREEN_TAX',
        },
      };

      const expected: IOffer = {
        ...initialState.offer,
      };

      const newState = reducer(testState, action);
      expect(newState).toMatchObject(expected);
    });
  });
});
