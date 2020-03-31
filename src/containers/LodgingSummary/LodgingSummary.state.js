import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getBookingCurrencySymbol } from 'store/modules/bookings';
import { isSR } from 'store/modules/auth';

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
    isSr: isSR(state),
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
