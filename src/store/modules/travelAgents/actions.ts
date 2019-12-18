import { prop  } from 'ramda';

import client from 'api/users';
import { successAction, errorFromResponse, genericAction } from 'store/common';
import { index } from 'store/modules/indexes';
import schema from './schema';

export const TRAVEL_AGENTS_FETCH = 'TRAVEL_AGENTS_FETCH';
export const TRAVEL_AGENTS_FETCH_SUCCESS = 'TRAVEL_AGENTS_FETCH_SUCCESS';
export const TRAVEL_AGENTS_FETCH_ERROR = 'TRAVEL_AGENTS_FETCH_ERROR';

export const fetchTravelAgents = (params?: object | null) => async dispatch => {
  dispatch(genericAction(TRAVEL_AGENTS_FETCH, {}));

  try {
    const {
      data: { data },
    } = await client.getTravelAgents(params, {});

    dispatch(
      index({
        index: 'travelAgents',
        ref: prop('id', schema),
        fields: prop('index', schema),
        data
      })
    );

    dispatch(successAction(TRAVEL_AGENTS_FETCH, data));
  } catch (e) {
    dispatch(errorFromResponse(TRAVEL_AGENTS_FETCH, e, 'There was a problem fetching travel agents.'));
  }
};
  