import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { fetchUsers, getUsersStatus, getUsersEntities, getUserFullName, getUser } from 'store/modules/users';
import {
  getBookingAddons,
  getBookingCurrencySymbol,
  getBookingGroundServices,
  getBookingReady,
  getBookingRequestedFines,
  getBookingRequestedGroundServices,
  getBookingRequestedSupplements,
  getBookingRequestedTransfers,
  getBookingTotal,
  getBookingTransfers,
  getBookingTravelAgent,
  replaceProducts,
  updateBooking,
} from 'store/modules/bookings';

export const mapStateToProps = (state, { id }) => {
  const travelAgentUserUuid = getBookingTravelAgent(state, id);
  const travelAgent = getUser(state, travelAgentUserUuid);

  return {
    addons: getBookingAddons(state, id),
    canBook: getBookingReady(state, id),
    currencyCode: getBookingCurrencySymbol(state, id),
    getUser: id => getUser(state, id),
    getUserName: id => getUserFullName(state, id),
    grandTotal: getBookingTotal(state, id),
    groundServices: getBookingGroundServices(state, id),
    selectedFines: getBookingRequestedFines(state, id),
    selectedGroundServices: getBookingRequestedGroundServices(state, id),
    selectedSupplements: getBookingRequestedSupplements(state, id),
    selectedTransfers: getBookingRequestedTransfers(state, id),
    transfers: getBookingTransfers(state, id),
    travelAgent,
    users: getUsersEntities(state),
    usersStatus: getUsersStatus(state),
  };
};

export const mapDispatchToProps = dispatch => ({
  updateBooking: pipe(
    updateBooking,
    dispatch
  ),
  replaceProducts: pipe(
    replaceProducts,
    dispatch
  ),
  fetchUsers: pipe(
    fetchUsers,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
