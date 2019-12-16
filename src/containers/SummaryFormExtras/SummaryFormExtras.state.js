import { connect } from 'react-redux';
import { pipe } from 'ramda';
import { fetchTravelAgents, getTravelAgentsStatus, getTravelAgentFullName, getTravelAgent } from 'store/modules/travelAgents';
import { getCurrentCountry } from 'store/modules/auth';

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
  updateTAMarginTypeAction,
  updateTAMarginAmountAction,
  isTAMarginAppliedSelector,
  updateIsTAMarginAppliedAction,
  taMarginTypeSelector,
  taMarginAmountSelector,
  bookingBuilderTotalSelector,
} from 'store/modules/bookingBuilder';

export const mapStateToProps = (state, { id }) => {
  const travelAgentUserUuid = getBookingTravelAgent(state, id);
  const travelAgent = getTravelAgent(state, travelAgentUserUuid);

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
    getTravelAgentName: id => getTravelAgentFullName(state, id),
    grandTotal: bookingBuilderTotalSelector(state),
    travelAgent,
    travelAgentsStatus: getTravelAgentsStatus(state),
    isTransferSectionCollapsed: getIsTransferSectionCollapsed(state),
    isGroundServicesSectionCollapsed: getIsGroundServicesSectionCollapsed(state),
    isAddonsSectionCollapsed: getIsAddonsSectionCollapsed(state),
    selectedTransfersBreakdown: bookingRequestedTransfersBreakdownSelector(state),
    isTAMarginApplied: isTAMarginAppliedSelector(state),
    taMarginType: taMarginTypeSelector(state),
    taMarginAmount: taMarginAmountSelector(state),
    currentCountry: getCurrentCountry(state)
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
  fetchTravelAgents: pipe(
    fetchTravelAgents,
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
  updateTAMarginTypeAction: pipe(
    updateTAMarginTypeAction,
    dispatch
  ),
  updateTAMarginAmountAction: pipe(
    updateTAMarginAmountAction,
    dispatch
  ),
  updateIsTAMarginAppliedAction: pipe(
    updateIsTAMarginAppliedAction,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
