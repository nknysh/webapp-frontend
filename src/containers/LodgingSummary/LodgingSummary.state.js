import { pipe } from 'ramda';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import {
  updateRequestedBuildLodgingGuestAges,
  updateRequestedBuildLodgingDates,
  updateRequestedBuildLodgingMealPlan,
  getBookingCurrencySymbol,
  removeLodging,
  updateBookingOccasions,
} from 'store/modules/bookings';

export const mapStateToProps = (state, { hotelUuid }) => {
  return {
    currencyCode: getBookingCurrencySymbol(state, hotelUuid),
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateRequestedBuildLodgingGuestAges,
      updateRequestedBuildLodgingDates,
      updateRequestedBuildLodgingMealPlan,
      removeLodging,
      updateBookingOccasions,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
