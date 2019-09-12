import client from 'api/offers';

import { successAction, errorFromResponse, loadingAction } from 'store/common';
import { getUserCountryContext } from 'store/modules/auth/selectors';

export const OFFERS_LATEST = 'OFFERS_LATEST';

/**
 * Fetch offers action
 *
 * @param {object} payload
 * @returns {object}
 */
export const fetchOffersAction = payload => ({
  type: OFFERS_LATEST,
  payload,
});

/**
 * Fetch latest offers
 *
 * @param {*} args
 * @returns {Function}
 */
export const fetchLatestOffers = args => async (dispatch, getState) => {
  // Acting country code needed for SRs
  const actingCountryCode = getUserCountryContext(getState());

  dispatch(fetchOffersAction(args));
  dispatch(loadingAction(OFFERS_LATEST, args));

  try {
    const {
      data: { data },
    } = await client.getLatestOffers({ ...args, actingCountryCode });

    dispatch(successAction(OFFERS_LATEST, data));
  } catch (e) {
    dispatch(errorFromResponse(OFFERS_LATEST, e, 'Could not fetch latest offers.'));
  }
};
