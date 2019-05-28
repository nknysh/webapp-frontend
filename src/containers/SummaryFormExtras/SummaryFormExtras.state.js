import { connect } from 'react-redux';

import {
  getBookingTotal,
  getBookingAddons,
  getBookingTransfers,
  getBookingGroundServices,
} from 'store/modules/booking/selectors';

export const mapStateToProps = (state, { hotelUuid }) => ({
  addons: getBookingAddons(state, hotelUuid),
  groundServices: getBookingGroundServices(state, hotelUuid),
  transfers: getBookingTransfers(state, hotelUuid),
  grandTotal: getBookingTotal(state, hotelUuid),
});

export default connect(mapStateToProps);
