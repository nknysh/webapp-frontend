import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { getHotel, getHotelsUploads, getHotelProducts } from 'store/modules/hotels/selectors';
import { getSearchDates } from 'store/modules/search/selectors';

import { fetchHotel } from 'store/modules/hotel/actions';
import { getHotelStatus } from 'store/modules/hotel/selectors';

import { updateBooking, removeRoom, addRoom } from 'store/modules/booking/actions';
import { getBookingByHotelId } from 'store/modules/booking/selectors';

export const mapStateToProps = (state, { id }) => ({
  dates: getSearchDates(state),
  getBooking: getBookingByHotelId(state),
  getHotelUploads: getHotelsUploads(state),
  accommodationProducts: getHotelProducts(state, id, 'accommodationProducts'),
  hotel: getHotel(state, id),
  hotelStatus: getHotelStatus(state),
});

export const mapDispatchToProps = dispatch => ({
  fetchHotel: pipe(
    fetchHotel,
    dispatch
  ),
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
