import client from 'api/offers';

import { successAction, errorAction } from 'store/common/actions';

export const FETCH_LATEST_OFFERS = 'FETCH_LATEST_OFFERS';

export const fetchOffersAction = payload => ({
  type: FETCH_LATEST_OFFERS,
  payload,
});

export const fetchOffersSuccess = ({ data: { data } }) => dispatch => {
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
