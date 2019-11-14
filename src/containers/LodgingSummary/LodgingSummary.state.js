import { pipe } from 'ramda';
import { connect } from 'react-redux';

import {
  updateRequestedBuildLodgingGuestAges,
  updateRequestedBuildLodgingDates,
  updateRequestedBuildLodgingMealPlan,
  getBookingCurrencySymbol,
  removeLodging,
} from 'store/modules/bookings';

export const mapStateToProps = (state, { hotelUuid }) => {
  return {
    currencyCode: getBookingCurrencySymbol(state, hotelUuid),
  };
};

export const mapDispatchToProps = dispatch => ({
  updateRequestedBuildLodgingGuestAges: pipe(
    updateRequestedBuildLodgingGuestAges,
    dispatch
  ),
  updateRequestedBuildLodgingDates: pipe(
    updateRequestedBuildLodgingDates,
    dispatch
  ),
  updateRequestedBuildLodgingMealPlan: pipe(
    updateRequestedBuildLodgingMealPlan,
    dispatch
  ),
  removeLodging: pipe(
    removeLodging,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
