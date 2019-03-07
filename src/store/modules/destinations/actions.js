import { prop } from 'ramda';

import data from 'config/data/destinations';

import { successAction, errorAction } from 'store/common/actions';
import { buildIndex } from 'store/modules/search/actions';

import schema from './schema';

export const FETCH_DESTINATIONS = 'FETCH_DESTINATIONS';

export const fetchDestinationsAction = () => ({
  type: FETCH_DESTINATIONS,
});

export const fetchDestinations = () => dispatch => {
  dispatch(fetchDestinationsAction());

  dispatch(
    buildIndex({
      index: 'destinations',
      ref: prop('id', schema),
      fields: prop('index', schema),
      data,
    })
  );

  data
    ? dispatch(successAction(FETCH_DESTINATIONS, data))
    : dispatch(errorAction(FETCH_DESTINATIONS, { error: 'No data found' }));
};
