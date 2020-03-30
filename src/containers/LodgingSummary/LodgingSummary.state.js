import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getBookingCurrencySymbol } from 'store/modules/bookings';

import {
  updateLodgingGuestAgesAction,
  updateLodgingMealPlanAction,
  updateLodgingOccasionsAction,
  updateLodgingDatesAction,
  removeLodgingAction,
  updateLodgingRepeatGuestAction,
} from 'store/modules/bookingBuilder';

export const mapStateToProps = (state, { hotelUuid }) => {
  return {
    currencyCode: getBookingCurrencySymbol(state, hotelUuid),
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateLodgingGuestAgesAction,
      updateLodgingMealPlanAction,
      updateLodgingDatesAction,
      removeLodgingAction,
      updateLodgingOccasionsAction,
      updateLodgingRepeatGuestAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps);
