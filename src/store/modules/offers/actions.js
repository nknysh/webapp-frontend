import { prop, propOr, pathOr } from 'ramda';
import { normalize } from 'normalizr';

import client from 'api/offers';

import { successAction, errorAction, setNormalizedData } from 'store/common';

import schema from './schema';

export const FETCH_LATEST_OFFERS = 'FETCH_LATEST_OFFERS';

export const fetchOffersAction = payload => ({
  type: FETCH_LATEST_OFFERS,
  payload,
});

export const fetchOffersSuccess = ({ data: { data } }) => dispatch => {
  const normalized = normalize(data, prop('schema', schema));
  setNormalizedData(dispatch, propOr({}, 'relationships', schema), normalized);

  dispatch(successAction(FETCH_LATEST_OFFERS, pathOr({}, ['entities', 'offer'], normalized)));
};

export const fetchLatestOffers = args => dispatch => {
  dispatch(fetchOffersAction(args));

  return client
    .getLatestOffers(args)
    .then(({ data }) => dispatch(fetchOffersSuccess({ data })))
    .catch(error => dispatch(errorAction(FETCH_LATEST_OFFERS, error)));
};
