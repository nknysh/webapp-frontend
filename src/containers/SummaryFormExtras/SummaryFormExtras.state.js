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

import {
  getIsTransferSectionCollapsed,
  getIsGroundServicesSectionCollapsed,
  getIsAddonsSectionCollapsed,
  setIsBookingSummarySectionCollapsed,
} from 'store/modules/ui';

import {
  bookingAvailableTransfers,
  bookingAvailableGroundServices,
  bookingAvailableAddons,
  bookingRequestedTransfers,
  bookingRequestedGroundServices,
  bookingRequestedSupplements,
  bookingRequestedFines,
} from 'store/modules/fastSearch';

export const mapStateToProps = (state, { id }) => {
  const travelAgentUserUuid = getBookingTravelAgent(state, id);
  const travelAgent = getUser(state, travelAgentUserUuid);

  return {
    addons: bookingAvailableAddons(state),
    groundServices: bookingAvailableGroundServices(state),
    transfers: getBookingTransfers(state, id),
    selectedFines: bookingRequestedFines(state),
    selectedGroundServices: bookingRequestedGroundServices(state),
    selectedSupplements: bookingRequestedSupplements(state),
    selectedTransfers: getBookingRequestedTransfers(state, id),
    canBook: getBookingReady(state, id),
    currencyCode: getBookingCurrencySymbol(state, id),
    getUser: id => getUser(state, id),
    getUserName: id => getUserFullName(state, id),
    grandTotal: getBookingTotal(state, id),
    travelAgent,
    users: getUsersEntities(state),
    usersStatus: getUsersStatus(state),
    isTransferSectionCollapsed: getIsTransferSectionCollapsed(state),
    isGroundServicesSectionCollapsed: getIsGroundServicesSectionCollapsed(state),
    isAddonsSectionCollapsed: getIsAddonsSectionCollapsed(state),
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
  setIsBookingSummarySectionCollapsed: pipe(
    setIsBookingSummarySectionCollapsed,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
