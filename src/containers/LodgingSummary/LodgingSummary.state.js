import { pipe } from 'ramda';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { updateRequestedBuildLodgingDates, getBookingCurrencySymbol } from 'store/modules/bookings';

import {
  updateLodgingGuestAges,
  updateLodgingMealPlan,
  updateLodgingOccasions,
  updateLodgingDates,
  removeLodging,
} from 'store/modules/fastSearch';

export const mapStateToProps = (state, { hotelUuid }) => {
  return {
    currencyCode: getBookingCurrencySymbol(state, hotelUuid),
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateLodgingGuestAges,
      updateLodgingMealPlan,
      updateRequestedBuildLodgingDates,
      updateLodgingDates,
      removeLodging,
      updateLodgingOccasions,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
