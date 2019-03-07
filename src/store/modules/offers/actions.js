import { propOr } from 'ramda';

import { successAction, errorAction, extractRelationships, fetchRelationships } from 'store/common/actions';

import data from 'config/data/offers';

import { fetchHotels } from 'store/modules/hotels/actions';

import schema from './schema';

export const FETCH_OFFERS = 'FETCH_OFFERS';

const getRelationships = extractRelationships(propOr({}, 'relationships', schema));

const relationshipActions = {
  hotels: fetchHotels,
};

export const fetchOffersAction = payload => ({
  type: FETCH_OFFERS,
  payload,
});

export const fetchOffers = args => async (dispatch, getState) => {
  dispatch(fetchOffersAction(args));

  await fetchRelationships(getRelationships(data), relationshipActions, getState, dispatch);

  // return OffersApi.fetchOffers(args).then(successAction).catch(errorAction)

  data ? dispatch(successAction(FETCH_OFFERS, data)) : dispatch(errorAction(FETCH_OFFERS, { error: 'No data found' }));
};
