import { connect } from 'react-redux';

import { getBookingAppliedOffers, getBookingAppliedOffersCount } from 'store/modules/bookings/selectors';

export const mapStateToProps = (state, { id }) => ({
  offers: getBookingAppliedOffers(state, id),
  offerCount: getBookingAppliedOffersCount(state, id),
});

export default connect(mapStateToProps);
