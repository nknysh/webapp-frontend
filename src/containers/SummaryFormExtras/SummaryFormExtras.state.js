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
  getBookingTravelAgent,
} from 'store/modules/bookings/selectors';
import { replaceProducts, updateBooking } from 'store/modules/bookings/actions';
import { isSR } from 'store/modules/auth/selectors';
import { fetchUsers } from 'store/modules/users/actions';
import { getUsersStatus, getUsersEntities, getUserFullName, getUser } from 'store/modules/users/selectors';

export const mapStateToProps = (state, { id }) => {
  const travelAgentUserUuid = getBookingTravelAgent(state, id);
  const travelAgent = getUser(state, travelAgentUserUuid);

  return {
    isSr: isSR(state),
    addons: getBookingAddons(state, id),
    groundServices: getBookingGroundServices(state, id),
    transfers: getBookingTransfers(state, id),
    grandTotal: getBookingTotal(state, id),
    selectedTransfers: getBookingRequestedTransfers(state, id),
    selectedGroundServices: getBookingRequestedGroundServices(state, id),
    selectedSupplements: getBookingRequestedSupplements(state, id),
    selectedFines: getBookingRequestedFines(state, id),
    travelAgent,
    usersStatus: getUsersStatus(state),
    users: getUsersEntities(state),
    getUserName: id => getUserFullName(state, id),
    getUser: id => getUser(state, id),
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
