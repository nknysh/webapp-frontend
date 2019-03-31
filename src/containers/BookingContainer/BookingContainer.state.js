import { connect } from 'react-redux';

import { getBookingByHotelId } from 'store/modules/booking/selectors';
import { getHotel } from 'store/modules/hotels/selectors';

export const mapStateToProps = (state, { hotelUuid }) => ({
  hotel: getHotel(state, hotelUuid),
  booking: getBookingByHotelId(state, hotelUuid),
});

export const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
