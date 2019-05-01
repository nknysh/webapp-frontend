import { defaultTo, path, prop, map } from 'ramda';
import client from 'api/offers';

import { successAction, errorFromResponse, loadingAction } from 'store/common';
import { setHotels } from 'store/modules/hotels/actions';

export const OFFERS_LATEST = 'OFFERS_LATEST';

export const fetchOffersAction = payload => ({
  type: OFFERS_LATEST,
  payload,
});

export const fetchOffersSuccess = ({ data: { data } }) => dispatch => {
  const offersEntities = path(['entities', 'offers'], data);
  const hotelsEntities = path(['entities', 'hotels'], data);
  const photosEntities = path(['entities', 'photos'], data);

  const result = prop('result', data);

  dispatch(
    setHotels({
      entities: { hotels: hotelsEntities, photos: photosEntities },
      result: map(prop('hotel'), defaultTo([], result)),
    })
  );
  dispatch(successAction(OFFERS_LATEST, { entities: { offers: offersEntities }, result }));
};

export const fetchLatestOffers = args => async dispatch => {
  dispatch(fetchOffersAction(args));
  dispatch(loadingAction(OFFERS_LATEST, args));

  try {
    const { data } = await client.getLatestOffers(args);

    dispatch(fetchOffersSuccess({ data }));
  } catch (e) {
    dispatch(errorFromResponse(OFFERS_LATEST, e));
    throw e;
  }
};
