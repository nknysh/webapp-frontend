import { connect } from 'react-redux';

import { getBookingAppliedOffers, getBookingAppliedOffersCount } from 'store/modules/bookings';
import { getHotelCurrencySymbol } from 'store/modules/hotels';

export const mapStateToProps = (state, { id }) => ({
  offers: getBookingAppliedOffers(state, id),
  offerCount: getBookingAppliedOffersCount(state, id),
  currencyCode: getHotelCurrencySymbol(state, id),
});

export default connect(mapStateToProps);
