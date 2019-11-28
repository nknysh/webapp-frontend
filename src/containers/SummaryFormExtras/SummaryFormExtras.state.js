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
  bookingAvailableTransfersSelector,
  bookingAvailableGroundServicesSelector,
  bookingAvailableAddonsSelector,
  bookingRequestedTransfersSelector,
  bookingRequestedGroundServicesSelector,
  bookingRequestedSupplementsSelector,
  bookingRequestedFinesSelector,
  updateTransferAction,
  bookingRequestedTransfersBreakdownSelector,
  updateGroundServiceAction,
  bookingAvailableFinesSelector,
  bookingAvailableSupplementsSelector,
  updateSupplementAction,
  updateFineAction,
  bookingCanBookSelector,
} from 'store/modules/fastSearch';

export const mapStateToProps = (state, { id }) => {
  const travelAgentUserUuid = getBookingTravelAgent(state, id);
  const travelAgent = getUser(state, travelAgentUserUuid);

  return {
    addons: bookingAvailableAddonsSelector(state),
    groundServices: bookingAvailableGroundServicesSelector(state),
    transfers: bookingAvailableTransfersSelector(state, id),
    availableFines: bookingAvailableFinesSelector(state),
    availableSupplements: bookingAvailableSupplementsSelector(state),
    selectedFines: bookingRequestedFinesSelector(state),
    selectedGroundServices: bookingRequestedGroundServicesSelector(state),
    selectedSupplements: bookingRequestedSupplementsSelector(state),
    selectedTransfers: bookingRequestedTransfersSelector(state, id),
    canBook: bookingCanBookSelector(state),
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
    selectedTransfersBreakdown: bookingRequestedTransfersBreakdownSelector(state),
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
  updateTransferAction: pipe(
    updateTransferAction,
    dispatch
  ),
  updateGroundServiceAction: pipe(
    updateGroundServiceAction,
    dispatch
  ),
  updateSupplementAction: pipe(
    updateSupplementAction,
    dispatch
  ),
  updateFineAction: pipe(
    updateFineAction,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
