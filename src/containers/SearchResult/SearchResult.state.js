import { connect } from 'react-redux';

import {
  getBookingAppliedOffers,
  getBookingAppliedOffersCount,
  getBookingCurrencySymbol,
} from 'store/modules/bookings';

export const mapStateToProps = (state, { id }) => ({
  offers: getBookingAppliedOffers(state, id),
  offerCount: getBookingAppliedOffersCount(state, id),
  currencyCode: getBookingCurrencySymbol(state, id),
});

export default connect(mapStateToProps);
