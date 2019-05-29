import { connect } from 'react-redux';
import { pipe, path } from 'ramda';

import { ProductTypes } from 'config/enums';

import { getHotelsUploads, getHotelsAccommodationProducts } from 'store/modules/hotels/selectors';

import { updateBooking, removeRoom, addRoom } from 'store/modules/booking/actions';
import { getBookingByHotelId } from 'store/modules/booking/selectors';

export const mapStateToProps = (state, { hotelUuid }) => {
  const booking = getBookingByHotelId(state, hotelUuid);
  const selectedRooms = path(['products', ProductTypes.ACCOMMODATION], booking);

  return {
    getRoomUploads: ids => getHotelsUploads(state, ids),
    booking,
    selectedRooms,
    rooms: getHotelsAccommodationProducts(state, hotelUuid),
  };
};

export const mapDispatchToProps = dispatch => ({
  addRoom: pipe(
    addRoom,
    dispatch
  ),
  removeRoom: pipe(
    removeRoom,
    dispatch
  ),
  updateBooking: pipe(
    updateBooking,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
