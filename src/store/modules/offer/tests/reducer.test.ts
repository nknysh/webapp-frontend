import { offer as reducer } from '../reducer';
import { getOfferRequestAction, getOfferSuccessAction, getOfferFailureAction } from '../actions';
import { IDateRange } from 'interfaces';
import {
  offerHotelUuidChangeAction,
  offerNameChangeAction,
  offerTermsChangeAction,
  offerFurtherInformationChangeAction,
  offerAddStayBetweenPrerequisiteAction,
  offerChangeStayBetweenPrerequisiteAction,
  offerRemoveStayBetweenPrerequisiteAction,
} from '../edit/actions';
import { IOffer } from 'services/BackendApi';
import { initialState, IOfferModel } from '../model';

describe('Offer reducer', () => {
  it('handles GET_OFFER_REQUEST correctly', () => {
    const action = getOfferRequestAction('123');
    const result = reducer(undefined, action);
    const expected: IOfferModel = {
      ...initialState,
      getOfferRequestIsPending: true,
    };

    expect(result).toEqual(expected);
  });

  it('handles GET_OFFER_SUCCESS correctly', () => {
    const action = getOfferSuccessAction({ uuid: '1234' } as IOffer, {}, {}, []);
    const result = reducer(undefined, action);
    const expected: IOfferModel = {
      ...initialState,
      offer: { uuid: '1234' } as IOffer,
      getOfferRequestIsPending: false,
    };
    expect(result).toEqual(expected);
  });

  it('handles GET_OFFER_FAILURE correctly', () => {
    const action = getOfferFailureAction('An error');

    const expected: IOfferModel = {
      ...initialState,
      error: 'An error',
      getOfferRequestIsPending: false,
    };

    const result = reducer(undefined, action);
    expect(result).toMatchObject(expected);
  });
});

describe('Offer reducer edit', () => {
  it('handles OFFER_HOTEL_UUID_CHANGE correctly', () => {
    const action = offerHotelUuidChangeAction('abc123');

    const expected = {
      ...initialState,
      offer: {
        ...initialState.offer,
        hotelUuid: 'abc123',
      },
    };
    const state = reducer(undefined, action);

    expect(state).toMatchObject(expected);
  });

  it('handles OFFER_NAME_CHANGE correctly', () => {
    const action = offerNameChangeAction('new name');

    const state = reducer(undefined, action);
    const expected = {
      ...initialState,
      offer: {
        ...initialState.offer,
        name: 'new name',
      },
    };

    expect(state).toMatchObject(expected);
  });

  it('handles OFFER_TERMS_CHANGE correctly', () => {
    const action = offerTermsChangeAction('new ts and cs');

    const state = reducer(undefined, action);
    const expected = {
      ...initialState,
      offer: {
        ...initialState.offer,
        termsAndConditions: 'new ts and cs',
      },
    };
    expect(state).toMatchObject(expected);
  });

  it('handles OFFER_FURTHER_INFORMATION_CHANGE correctly', () => {
    const action = offerFurtherInformationChangeAction('new further information');

    const state = reducer(undefined, action);

    const expected = {
      ...initialState,
      offer: {
        ...initialState.offer,
        furtherInformation: 'new further information',
      },
    };
    expect(state).toMatchObject(expected);
  });

  it('handles OFFER_ADD_STAY_BETWEEN_PREREQUISITE correctly with initial state', () => {
    const action = offerAddStayBetweenPrerequisiteAction();

    const expected = {
      ...initialState,
      offer: {
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
      },
    };

    const state = reducer(undefined, action);
    expect(state).toMatchObject(expected);
  });

  it('handles OFFER_CHANGE_STAY_BETWEEN_PREREQUISITE correctly with 1 date', () => {
    const changeAction = offerChangeStayBetweenPrerequisiteAction([['01-01-2020']]);

    const state = reducer(
      {
        ...initialState,
        offer: {
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
        },
      } as IOfferModel,
      changeAction
    );

    const expected = {
      ...initialState,
      offer: {
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
      },
    };

    expect(state).toMatchObject(expected);
  });

  it('handles OFFER_CHANGE_STAY_BETWEEN_PREREQUISITE correctly with multiple dates', () => {
    const changeAction = offerChangeStayBetweenPrerequisiteAction([
      ['01-01-2020', '02-01-2020', '03-01-2020', '04-01-2020'],
    ]);

    const state = reducer(
      {
        ...initialState,
        offer: {
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
        },
      } as IOfferModel,
      changeAction
    );

    const expected = {
      ...initialState,
      offer: {
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
      },
    };

    expect(state).toMatchObject(expected);
  });

  it('handles OFFER_CHANGE_STAY_BETWEEN_PREREQUISITE correctly with multiple date arrays', () => {
    const changeAction = offerChangeStayBetweenPrerequisiteAction([
      ['01-01-2020', '02-01-2020', '03-01-2020', '04-01-2020'],
      ['06-02-2020', '07-02-2020', '08-02-2020'],
    ]);

    const state = reducer(
      {
        ...initialState,
        offer: {
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
        },
      } as IOfferModel,
      changeAction
    );

    const expected = {
      ...initialState,
      offer: {
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
      },
    };

    expect(state).toMatchObject(expected);
  });

  it('handles OFFER_REMOVE_STAY_BETWEEN_PREREQUISITE with only 1 prerequisite', () => {
    const removeAction = offerRemoveStayBetweenPrerequisiteAction(0);

    const stateB = reducer(
      {
        offer: {
          prerequisites: {
            dates: [
              {
                startDate: '',
                endDate: '',
              },
            ],
          },
        },
      } as IOfferModel,
      removeAction
    );

    expect(stateB.offer.prerequisites.dates.length).toEqual(0);
  });

  it('handles OFFER_REMOVE_STAY_BETWEEN_PREREQUISITE with only multiple prerequisites', () => {
    const removeAction = offerRemoveStayBetweenPrerequisiteAction(1);

    const stateB = reducer(
      {
        offer: {
          prerequisites: {
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
        },
      } as IOfferModel,
      removeAction
    );

    expect(stateB.offer.prerequisites.dates.length).toEqual(2);
    expect(stateB.offer.prerequisites.dates[0].startDate).toEqual('a1');
    expect(stateB.offer.prerequisites.dates[0].endDate).toEqual('a2');
    expect(stateB.offer.prerequisites.dates[1].startDate).toEqual('c1');
    expect(stateB.offer.prerequisites.dates[1].endDate).toEqual('c2');
  });
});
