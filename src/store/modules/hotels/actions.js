import { successAction, errorAction } from 'store/common/actions';

import { buildIndex } from 'store/modules/search/actions';

import data from 'config/data/hotels';

export const FETCH_HOTELS = 'FETCH_HOTELS';

export const fetchHotelsAction = () => ({
  type: FETCH_HOTELS,
});

export const fetchHotels = () => dispatch => {
  dispatch(fetchHotelsAction());

  dispatch(
    buildIndex({
      index: 'hotels',
      ref: 'id',
      fields: ['title'],
      data,
    })
  );

  data ? dispatch(successAction(FETCH_HOTELS, data)) : dispatch(errorAction(FETCH_HOTELS, { error: 'No data found' }));
};
