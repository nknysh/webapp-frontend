import { offer as reducer } from '../reducer';
import { getOfferRequestAction, getOfferSuccessAction, getOfferFailureAction } from '../actions';

import {
  offerHotelUuidChangeAction,
  offerNameChangeAction,
  offerTermsChangeAction,
  offerFurtherInformationChangeAction,
  offerAddStayBetweenPrerequisiteAction,
  offerChangeStayBetweenPrerequisiteAction,
  offerRemoveStayBetweenPrerequisiteAction,
} from '../edit/actions';
import { IOffer, IPrerequisiteDate } from 'services/BackendApi';
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

    const result = reducer(undefined, action);

    expect(result.offer.hotelUuid).toEqual('abc123');
  });

  it('handles OFFER_NAME_CHANGE correctly', () => {
    const action = offerNameChangeAction('new name');

    const result = reducer(undefined, action);

    expect(result.offer.name).toEqual('new name');
  });

  it('handles OFFER_TERMS_CHANGE correctly', () => {
    const action = offerTermsChangeAction('new ts and cs');

    const result = reducer(undefined, action);

    expect(result.offer.termsAndConditions).toEqual('new ts and cs');
  });

  it('handles OFFER_FURTHER_INFORMATION_CHANGE correctly', () => {
    const action = offerFurtherInformationChangeAction('new further information');

    const result = reducer(undefined, action);

    expect(result.offer.furtherInformation).toEqual('new further information');
  });

  it('handles OFFER_ADD_STAY_BETWEEN_PREREQUISITE correctly with initial state', () => {
    const action = offerAddStayBetweenPrerequisiteAction();

    let stateA = reducer(undefined, action);
    expect(stateA.offer.prerequisites.dates.length).toEqual(1);
  });

  it('handles OFFER_ADD_STAY_BETWEEN_PREREQUISITE correctly with empty dates array', () => {
    const action = offerAddStayBetweenPrerequisiteAction();

    let stateA = reducer(
      {
        offer: {
          prerequisites: {
            dates: [] as IPrerequisiteDate[],
          },
        },
      } as IOfferModel,
      action
    );
    expect(stateA.offer.prerequisites.dates.length).toEqual(1);
  });

  it('handles OFFER_CHANGE_STAY_BETWEEN_PREREQUISITE correctly', () => {
    const changeAction = offerChangeStayBetweenPrerequisiteAction(0, '01-01-2020', '01-05-2020');

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
      changeAction
    );

    expect(stateB.offer.prerequisites.dates.length).toEqual(1);
    expect(stateB.offer.prerequisites.dates[0].startDate).toEqual('01-01-2020');
    expect(stateB.offer.prerequisites.dates[0].endDate).toEqual('01-05-2020');
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
