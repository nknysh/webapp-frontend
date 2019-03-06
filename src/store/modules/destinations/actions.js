import { successAction, errorAction } from 'store/common/actions';

import { buildIndex } from 'store/modules/search/actions';

import data from 'config/data/destinations';

export const FETCH_DESTINATIONS = 'FETCH_DESTINATIONS';

export const fetchDestinationsAction = () => ({
  type: FETCH_DESTINATIONS,
});

export const fetchDestinations = () => dispatch => {
  dispatch(fetchDestinationsAction());

  dispatch(
    buildIndex({
      index: 'destinations',
      ref: 'uuid',
      fields: ['title'],
      data,
    })
  );

  data
    ? dispatch(successAction(FETCH_DESTINATIONS, data))
    : dispatch(errorAction(FETCH_DESTINATIONS, { error: 'No data found' }));
};
