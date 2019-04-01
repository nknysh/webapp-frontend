import { connect } from 'react-redux';

import { getBookingByHotelId, getBookingTotalByHotelId } from 'store/modules/booking/selectors';
import { getHotel } from 'store/modules/hotels/selectors';

export const mapStateToProps = (state, { hotelUuid }) => ({
  hotel: getHotel(state, hotelUuid),
  booking: getBookingByHotelId(state, hotelUuid),
  total: getBookingTotalByHotelId(state, hotelUuid),
});

export const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
