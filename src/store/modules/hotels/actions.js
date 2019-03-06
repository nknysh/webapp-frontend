import { propOr } from 'ramda';

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

  await fetchRelationships(getRelationships(data), relationshipActions, getState, dispatch);

  dispatch(
    buildIndex({
      index: 'hotels',
      ref: 'uuid',
      fields: ['title', 'destinationUuid'],
      data,
    })
  );

  data ? dispatch(successAction(FETCH_HOTELS, data)) : dispatch(errorAction(FETCH_HOTELS, { error: 'No data found' }));
};
