import { ap, path, prop, map } from 'ramda';
import client from 'api/offers';

import { successAction, errorAction } from 'store/common';
import { fetchHotelsSuccess } from 'store/modules/hotels/actions';

export const FETCH_LATEST_OFFERS = 'FETCH_LATEST_OFFERS';

export const fetchOffersAction = payload => ({
  type: FETCH_LATEST_OFFERS,
  payload,
});

export const fetchOffersSuccess = ({ data: { data } }) => dispatch => {
  const offersEntities = path(['entities', 'offers'], data);
  const hotelsEntities = path(['entities', 'hotels'], data);
  const photosEntities = path(['entities', 'photos'], data);

  const result = prop('result', data);

  ap(
    [dispatch],
    [
      fetchHotelsSuccess({
        entities: { hotels: hotelsEntities, photos: photosEntities },
        result: map(prop('hotel'), result),
      }),
      successAction(FETCH_LATEST_OFFERS, { entities: { offers: offersEntities }, result }),
    ]
  );
};

export const fetchLatestOffers = args => dispatch => {
  dispatch(fetchOffersAction(args));

  return client
    .getLatestOffers(args)
    .then(({ data }) => dispatch(fetchOffersSuccess({ data })))
    .catch(error => dispatch(errorAction(FETCH_LATEST_OFFERS, error)));
};
