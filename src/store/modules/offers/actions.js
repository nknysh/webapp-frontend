import { propOr } from 'ramda';

import client from 'api/offers';

import { fetchHotels, fetchHotelsSuccess } from 'store/modules/hotels/actions';
import { successAction, errorAction, extractData, setIncludes, fetchRelationships } from 'store/common/actions';

import schema from './schema';

export const FETCH_LATEST_OFFERS = 'FETCH_LATEST_OFFERS';

const getRelationships = extractData(['path'], propOr({}, 'relationships', schema));
const getIncludes = extractData(['included'], propOr({}, 'relationships', schema));

const relationshipActions = {
  hotels: fetchHotels,
};

const includesActions = {
  hotels: fetchHotelsSuccess,
};

export const fetchOffersAction = payload => ({
  type: FETCH_LATEST_OFFERS,
  payload,
});

export const fetchOffersSuccess = ({ data }) => async (dispatch, getState) => {
  await setIncludes(getIncludes(data), includesActions, dispatch);
  await fetchRelationships(getRelationships(data), relationshipActions, getState, dispatch);

  data
    ? dispatch(successAction(FETCH_LATEST_OFFERS, data))
    : dispatch(errorAction(FETCH_LATEST_OFFERS, { error: 'No data found' }));
};

export const fetchLatestOffers = args => dispatch => {
  dispatch(fetchOffersAction(args));

  return client
    .getLatestOffers(args)
    .then(({ data }) => dispatch(fetchOffersSuccess({ data })))
    .catch(error => dispatch(errorAction(FETCH_LATEST_OFFERS, error.response)));
};
