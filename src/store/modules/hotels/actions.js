import { propOr, prop } from 'ramda';

// import client from 'api/hotels';

import { successAction, errorAction, extractRelationships, fetchRelationships } from 'store/common/actions';

import { buildIndex } from 'store/modules/search/actions';
import { fetchDestinations } from 'store/modules/destinations/actions';

import data from 'config/data/hotels';

import schema from './schema';

export const FETCH_HOTELS = 'FETCH_HOTELS';

const getRelationships = extractRelationships(propOr({}, 'relationships', schema));

const relationshipActions = {
  destinations: fetchDestinations,
};

export const fetchHotelsAction = () => ({
  type: FETCH_HOTELS,
});

export const fetchHotels = () => async (dispatch, getState) => {
  dispatch(fetchHotelsAction());

  // return client
  //   .fetchHotels(values)
  //   .then(() => dispatch(successAction(FETCH_HOTELS)))
  //   .catch(error => dispatch(errorAction(FETCH_HOTELS, error.response)));

  await fetchRelationships(getRelationships(data), relationshipActions, getState, dispatch);

  dispatch(
    buildIndex({
      index: 'hotels',
      ref: prop('id', schema),
      fields: prop('index', schema),
      data,
    })
  );

  data ? dispatch(successAction(FETCH_HOTELS, data)) : dispatch(errorAction(FETCH_HOTELS, { error: 'No data found' }));
};
