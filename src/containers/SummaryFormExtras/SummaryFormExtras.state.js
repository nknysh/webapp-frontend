import { connect } from 'react-redux';
import { pipe } from 'ramda';

import {
  getBookingTotal,
  getBookingAddons,
  getBookingTransfers,
  getBookingGroundServices,
  getBookingRequestedTransfers,
  getBookingRequestedGroundServices,
  getBookingRequestedSupplements,
  getBookingRequestedFines,
} from 'store/modules/bookings/selectors';
import { replaceProducts, updateBooking } from 'store/modules/bookings/actions';

export const mapStateToProps = (state, { id }) => ({
  addons: getBookingAddons(state, id),
  groundServices: getBookingGroundServices(state, id),
  transfers: getBookingTransfers(state, id),
  grandTotal: getBookingTotal(state, id),
  selectedTransfers: getBookingRequestedTransfers(state, id),
  selectedGroundServices: getBookingRequestedGroundServices(state, id),
  selectedSupplements: getBookingRequestedSupplements(state, id),
  selectedFines: getBookingRequestedFines(state, id),
});

export const mapDispatchToProps = dispatch => ({
  updateBooking: pipe(
    updateBooking,
    dispatch
  ),
  replaceProducts: pipe(
    replaceProducts,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
