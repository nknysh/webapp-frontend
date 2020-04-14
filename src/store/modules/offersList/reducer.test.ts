import {
  setSelectedHotelAction,
  addOfferUuidToBulkActionSelectedUuidsAction,
  removeOfferUuidFromBulkActionSelectedUuidsAction,
} from './actions';
import { initialState, IOffersListDomain } from './model';
import reducer from './reducer';

describe('offersList reducer', () => {
  it('SET SELECTED HOTEL', () => {
    const action = setSelectedHotelAction('A');

    const testState: IOffersListDomain = {
      ...initialState,
    };

    const expected: IOffersListDomain = {
      ...initialState,
      selectedHotel: 'A',
    };

    const newState = reducer(testState, action);
    expect(newState).toMatchObject(expected);
  });

  it('add an offer in to bulk selected offers', () => {
    const action = addOfferUuidToBulkActionSelectedUuidsAction('A');
    const testState: IOffersListDomain = {
      ...initialState,
    };

    const expected: IOffersListDomain = {
      ...initialState,
      bulkActionSelectedUuids: ['A'],
    };

    const newState = reducer(testState, action);
    expect(newState).toMatchObject(expected);
  });

  it('remove offer from bulk selected offers', () => {
    const action = removeOfferUuidFromBulkActionSelectedUuidsAction('A');
    const testState: IOffersListDomain = {
      ...initialState,
      bulkActionSelectedUuids: ['A'],
    };

    const expected: IOffersListDomain = {
      ...initialState,
    };

    const newState = reducer(testState, action);
    expect(newState).toMatchObject(expected);
  });
});
