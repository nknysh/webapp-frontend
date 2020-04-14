import {
  append,
  equals,
  findIndex,
  fromPairs,
  lensPath,
  lensProp,
  omit,
  over,
  pathOr,
  pipe,
  prop,
  reduce,
  set,
  toPairs,
} from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';

import client from 'api/proposals';

import { BookingStatusTypes } from 'config/enums';

import { successAction, errorFromResponse, errorAction, isError, genericAction } from 'store/common';

import {
  bookingToHotelUuid,
  cancelBooking,
  completeBooking,
  holdBooking,
  releaseBooking,
  requestBooking,
  setBookings,
} from 'store/modules/bookings/actions';
import { enqueueNotification } from 'store/modules/ui/actions';
import { getBooking, getBookingStatus } from 'store/modules/bookings/selectors';
import { guestInfoSelector } from 'store/modules/bookingBuilder/selectors';
import { getCurrentUserUuid, isSR } from 'store/modules/auth/selectors';
import { getProposal } from 'store/modules/proposals/selectors';

import { makeBackendApi } from 'services/BackendApi';

export const PROPOSAL_AMEND_BOOKING = 'PROPOSAL_AMEND_BOOKING';
export const PROPOSAL_BOOKING_HOLD = 'PROPOSAL_BOOKING_HOLD';
export const PROPOSAL_BOOKING_RELEASE = 'PROPOSAL_BOOKING_RELEASE';
export const PROPOSAL_BOOKING_REQUEST = 'PROPOSAL_BOOKING_REQUEST';
export const PROPOSAL_COMPLETE_BOOKING = 'PROPOSAL_COMPLETE_BOOKING';
export const PROPOSAL_FETCH = 'PROPOSAL_FETCH';
export const PROPOSAL_REMOVE_BOOKING = 'PROPOSAL_REMOVE_BOOKING';
export const PROPOSAL_UPDATE = 'PROPOSAL_UPDATE';
export const PROPOSAL_COMPLETE = 'PROPOSAL_COMPLETE';
export const PROPOSALS_ADD = 'PROPOSALS_ADD';
export const PROPOSALS_FETCH = 'PROPOSALS_FETCH';
export const PROPOSALS_NEW = 'PROPOSALS_NEW';
export const PROPOSAL_GENERATE_PDF = 'PROPOSAL_GENERATE_PDF';

/**
 * Clean payload
 *
 * Removes values that are empty or null from the payload
 *
 * @param {object}
 * @returns {object}
 */
const cleanPayload = pipe(
  toPairs,
  reduce((accum, [key, value]) => (!isNilOrEmpty(value) ? append([key, value], accum) : accum), []),
  fromPairs
);

/**
 * Fetch proposals
 *
 * @param {*} params
 */
export const fetchProposals = params => async dispatch => {
  dispatch(genericAction(PROPOSALS_FETCH, params));

  const backendApi = makeBackendApi(null);

  try {
    const proposalResponse = await backendApi.getAvailableProposals();

    const proposals = {};
    proposalResponse.data.forEach(p => {
      proposals[p.uuid] = p;
    });

    const data = {
      result: proposalResponse.data.map(p => p.uuid),
      entities: {
        proposals,
      },
    };

    dispatch(successAction(PROPOSALS_FETCH, data));
  } catch (e) {
    dispatch(errorFromResponse(PROPOSALS_FETCH, e, 'There was a problem fetching proposals.'));
  }
};

/**
 * Fetch proposal
 *
 * @param {string} id
 * @param {*} params
 * @returns {Function}
 */
export const fetchProposal = (id, params) => async dispatch => {
  dispatch(genericAction(PROPOSAL_FETCH, { id }));

  try {
    const {
      data: { data },
    } = await client.getProposal(id, params);

    // Omit any bookings from the entities
    const proposal = over(lensProp('entities'), omit(['bookings']), data);

    // Extract the bookings and trigger the `setBookings` action
    const bookings = pathOr({}, ['entities', 'bookings'], data);

    const proposalsWithPotentialFlag = Object.keys(proposal.entities.proposals).reduce((acc, proposalKey) => {
      acc[proposalKey] = {
        ...proposal.entities.proposals[proposalKey],
        containsPotentialBookings: someBookingsArePotential(
          proposal.entities.proposals[proposalKey].bookings,
          bookings
        ),
      };
      return acc;
    }, {});

    proposal.entities.proposals = proposalsWithPotentialFlag;

    dispatch(setBookings(bookings));
    dispatch(successAction(PROPOSAL_FETCH, proposal));
  } catch (e) {
    dispatch(errorFromResponse(PROPOSAL_FETCH, e, 'There was a problem fetching proposal.'));
  }
};

const someBookingsArePotential = (bookingKeys, bookings) => {
  return bookingKeys.reduce((res, key) => {
    return bookings[key].status === BookingStatusTypes.POTENTIAL ? true : res;
  }, false);
};

/**
 * Create new proposal
 *
 * @param {string} name
 * @param {string} bookingId
 * @param {boolean} placeHolds
 * @returns {Function}
 */
export const createNewProposal = (name, bookingId, placeHolds) => async (dispatch, getState) => {
  const booking = getBooking(getState(), bookingId);
  const guestInfo = guestInfoSelector(getState());
  const isSr = isSR(getState());

  // If the current user is a SR, then we use the `travelAgentUserUuid` from the booking rather than
  // the current user's UUID
  const userUuid = isSr ? prop('travelAgentUserUuid', booking) : getCurrentUserUuid(getState());
  const proposalPayload = {
    name,
    userUuid,
    ...omit(['isRepeatGuest'], guestInfo)
  };

  dispatch(genericAction(PROPOSALS_NEW, proposalPayload));

  // Creating a proposal isn't a one step process...
  try {
    // 1. We create the empty proposal so we can access the UUID
    const {
      data: { data },
    } = await client.createProposal({ data: { attributes: proposalPayload } });

    const proposalUuid = prop('result', data);

    // 2. We then need to "complete" the booking into a state of POTENTIAL
    await dispatch(
      completeBooking(
        bookingId,
        {
          // Use the UUID from step 1 to attach the booking to the proposal
          proposalUuid,
          ...guestInfo
        },
        BookingStatusTypes.POTENTIAL,
        placeHolds
      )
    );

    const bookingStatus = getBookingStatus(getState());

    // Make sure the booking worked
    if (isError(bookingStatus)) {
      throw new Error('Error updating booking');
    }

    // We do a fetch here so that the most up to date data is in redux.  Backend does some
    // moving about of data so it's easier to grab a clean copy than to try and transform the
    // data here
    dispatch(fetchProposal(proposalUuid));
    dispatch(successAction(PROPOSALS_NEW, data));
    dispatch(
      enqueueNotification({ message: `Proposal '${name}' created succesfully .`, options: { variant: 'success' } })
    );
  } catch (e) {
    console.error(`Error ${e}`);
    dispatch(errorFromResponse(PROPOSALS_NEW, e, 'There was a problem creating proposal.'));
  }
};

/**
 * Add to proposal
 *
 * Adds a booking to a proposal
 *
 * @param {string} proposalUuid
 * @param {string} bookingId
 * @param {boolean} placeHolds
 * @returns {Function}
 */
export const addToProposal = (proposalUuid, bookingId, placeHolds) => async (dispatch, getState) => {
  dispatch(genericAction(PROPOSALS_ADD, { proposalUuid, bookingId }));
  const guestInfo = guestInfoSelector(getState());

  // This time we just need to complete the booking with status POTENTIAL.
  /** @todo this is a duplicate of `createProposal` functionality and should be split out into a resuable function */
  await dispatch(
    completeBooking(
      bookingId,
      {
        proposalUuid,
        ...guestInfo
      },
      BookingStatusTypes.POTENTIAL,
      placeHolds
    )
  );

  const bookingStatus = getBookingStatus(getState());

  dispatch(fetchProposal(proposalUuid));

  !isError(bookingStatus)
    ? dispatch(successAction(PROPOSALS_ADD, { result: proposalUuid }))
    : dispatch(errorAction(PROPOSALS_ADD, { result: proposalUuid }));
};

export const createNewProposalWithExistingBooking = (name, bookingUuid) => async (dispatch, getState) => {
  dispatch(genericAction(PROPOSALS_NEW, { name, userUuid }));

  const booking = getBooking(getState(), bookingUuid);
  const isSr = isSR(getState());
  const userUuid = isSr ? prop('travelAgentUserUuid', booking) : getCurrentUserUuid(getState());

  try {
    // 1. make a proposal
    const {
      data: { data },
    } = await client.createProposal({ data: { attributes: { name, userUuid } } });
    const proposalUuid = prop('result', data);

    // 2. then the booking to it
    addExistingBookingToProposal(proposalUuid, bookingUuid)(dispatch, getState);

    dispatch(successAction(PROPOSALS_NEW, data));
  } catch (e) {
    console.error(`Error ${e}`);
    dispatch(errorFromResponse(PROPOSALS_NEW, e, 'There was a problem creating proposal.'));
  }
};

export const addExistingBookingToProposal = (proposalUuid, bookingUuid) => async (dispatch, getState) => {
  dispatch(genericAction(PROPOSALS_ADD, { proposalUuid, bookingUuid }));

  const backendApi = makeBackendApi(null);

  try {
    await backendApi.addBookingToProposal(proposalUuid, bookingUuid);
    dispatch(successAction(PROPOSALS_ADD, { result: proposalUuid }));
  } catch (e) {
    console.error(`Error ${e}`);
    dispatch(errorAction(PROPOSALS_ADD, { result: proposalUuid }));
  }
};

/**
 * Update proposal
 *
 * Updates the proposal data (not the bookings in a proposal)
 *
 * @param {string} proposalUuid
 * @param {object} payload
 * @returns {Function}
 */
export const updateProposal = (proposalUuid, payload) => async (dispatch, getState) => {
  dispatch(genericAction(PROPOSAL_UPDATE, { id: proposalUuid, payload }));
  const proposal = getProposal(getState(), proposalUuid);

  const name = prop('name', proposal);
  const userUuid = prop('userUuid', proposal);

  // Make sure that the name and userUuid are sent with the patch
  const attributes = {
    name,
    userUuid,
    ...cleanPayload(payload),
  };

  try {
    const {
      data: { data },
    } = await client.updateProposal(proposalUuid, { data: { attributes } });

    dispatch(successAction(PROPOSAL_UPDATE, data));
    dispatch(
      enqueueNotification({ message: `Proposal '${name}' updated succesfully .`, options: { variant: 'success' } })
    );
  } catch (e) {
    dispatch(errorFromResponse(PROPOSAL_UPDATE, e, 'There was a problem updating this proposal.'));
  }
};

export const completeProposal = (proposalUuid, payload) => async (dispatch, getState) => {
  dispatch(genericAction(PROPOSAL_COMPLETE, { id: proposalUuid, payload }));
  const proposal = getProposal(getState(), proposalUuid);

  const name = prop('name', proposal);
  const userUuid = prop('userUuid', proposal);

  // Make sure that the name and userUuid are sent with the patch
  const attributes = {
    name,
    userUuid,
    ...cleanPayload(payload),
  };

  try {
    const {
      data: { data },
    } = await client.completeProposal(proposalUuid, { data: { attributes } });

    dispatch(successAction(PROPOSAL_COMPLETE, data));
    dispatch(
      enqueueNotification({ message: `Proposal '${name}' completed succesfully .`, options: { variant: 'success' } })
    );
  } catch (e) {
    dispatch(errorFromResponse(PROPOSAL_COMPLETE, e, 'There was a problem completing this proposal.'));
  }
};

/**
 * Remove booking
 *
 * Removes given booking from the proposal
 *
 * @param {string} proposalUuid
 * @param {string} bookingId
 * @param {boolean} update Optionally update the proposal via patch at the same time
 * @returns {Function}
 */
export const removeBooking = (proposalUuid, bookingId, update = true) => async dispatch => {
  dispatch(genericAction(PROPOSAL_REMOVE_BOOKING, { id: proposalUuid, bookingId }));

  try {
    const {
      data: { data },
    } = await client.removeBooking(proposalUuid, bookingId);

    // If we are showing updates, then we need clean proposal from backend
    update && dispatch(fetchProposal(proposalUuid));

    dispatch(successAction(PROPOSAL_REMOVE_BOOKING, update ? data : {}));

    // If the proposal is updated show a notification
    update &&
      dispatch(
        enqueueNotification({ message: `Removed '${bookingId}' from proposal.`, options: { variant: 'success' } })
      );
  } catch (e) {
    dispatch(errorFromResponse(PROPOSAL_REMOVE_BOOKING, e, 'There was a problem removing the booking.'));
  }
};

/**
 * Amend booking
 *
 * Amends a booking inside a proposal.  When we amend a booking we are actually
 * cancelling a booking, removing it from the proposal and creating a new
 * potential booking and attaching it again
 *
 * @param {string} proposalUuid
 * @param {strin} bookingId
 * @returns {Function}
 */
export const amendBooking = (proposalUuid, bookingId) => async (dispatch, getState) => {
  dispatch(genericAction(PROPOSAL_AMEND_BOOKING, { proposalUuid, bookingId }));

  const state = getState();
  const proposal = getProposal(state, proposalUuid);
  const booking = getBooking(state, bookingId);

  // Need the index of the booking which we are currently "amending"
  const bookingIndex = findIndex(equals(bookingId), prop('bookings', proposal));

  if (equals(-1, bookingIndex)) {
    return dispatch(errorAction(PROPOSAL_AMEND_BOOKING, {}));
  }

  // Steps to "amend" a booking in a proposal

  // 1. Cancel the booking
  dispatch(cancelBooking(bookingId));

  // 2. Attach the booking back to the bookings key as the hotel uuid
  dispatch(bookingToHotelUuid(bookingId));

  // 3. Create the new proposal with the hotelUuid as the booking uuid (we swapped this in 2)
  // so that it shows up in this proposal
  const next = set(lensPath(['bookings', bookingIndex]), prop('hotelUuid', booking), proposal);

  dispatch(successAction(PROPOSAL_AMEND_BOOKING, { entities: { proposals: { [proposalUuid]: next } } }));

  // 4. Remove the old booking from the proposal in the backend
  dispatch(removeBooking(proposalUuid, bookingId, false));
};

/**
 * Complete proposal booking
 *
 * @param {string} proposalUuid
 * @param {string} bookingId
 * @param {object} payload
 * @returns {Function}
 */
export const completeProposalBooking = (proposalUuid, bookingId, payload) => async dispatch => {
  dispatch(genericAction(PROPOSAL_COMPLETE_BOOKING, { proposalUuid, bookingId, payload }));

  await dispatch(completeBooking(bookingId, { proposalUuid }, BookingStatusTypes.POTENTIAL));
  dispatch(fetchProposal(proposalUuid));

  dispatch(successAction(PROPOSAL_COMPLETE_BOOKING, {}));
};

/**
 * Proposal booking request
 *
 * Complete the booking in the proposal as if we had gone through
 * the booking flow normally
 *
 * @param {string} proposalId
 * @param {string} bookingId
 * @returns {Function}
 */
export const proposalBookingRequest = (proposalId, bookingId) => async (dispatch, getState) => {
  dispatch(genericAction(PROPOSAL_BOOKING_REQUEST, { proposalId, bookingId }));

  // Finalise the booking request
  await dispatch(requestBooking(bookingId));

  const bookingStatus = getBookingStatus(getState());

  if (isError(bookingStatus)) {
    dispatch(errorAction(PROPOSAL_BOOKING_REQUEST, { bookingId }));
    return;
  }

  // Remove the booking from proposal since it's been finalised
  dispatch(removeBooking(proposalId, bookingId));
  dispatch(successAction(PROPOSAL_BOOKING_REQUEST, { bookingId }));
};

/**
 * Proposal booking hold
 *
 * Take holds of booking that is in a proposal
 *
 * @param {string} proposalId
 * @param {string} bookingId
 * @returns {Function}
 */
export const proposalBookingHold = (proposalId, bookingId) => async (dispatch, getState) => {
  dispatch(genericAction(PROPOSAL_BOOKING_HOLD, { proposalId, bookingId }));

  await dispatch(holdBooking(bookingId));

  const bookingStatus = getBookingStatus(getState());

  if (isError(bookingStatus)) {
    dispatch(errorAction(PROPOSAL_BOOKING_HOLD, { bookingId }));
    return;
  }

  dispatch(successAction(PROPOSAL_BOOKING_HOLD, { bookingId }));
};

/**
 * Proposal booking release
 *
 * Release holds of booking that is in a proposal
 *
 * @param {string} proposalId
 * @param {string} bookingId
 * @returns {Function}
 */
export const proposalBookingRelease = (proposalId, bookingId) => async (dispatch, getState) => {
  dispatch(genericAction(PROPOSAL_BOOKING_RELEASE, { proposalId, bookingId }));

  await dispatch(releaseBooking(bookingId));

  const bookingStatus = getBookingStatus(getState());

  if (isError(bookingStatus)) {
    dispatch(errorAction(PROPOSAL_BOOKING_RELEASE, { bookingId }));
    return;
  }

  dispatch(successAction(PROPOSAL_BOOKING_RELEASE, { bookingId }));
};

export const generateProposalPdf = (proposalUuid, payload) => async (dispatch, getState) => {
  dispatch(genericAction(PROPOSAL_GENERATE_PDF, { id: proposalUuid, payload }));

  try {
    const {
      data: { data },
    } = await client.generateProposalPdf(proposalUuid, { data: { attributes: payload } });

    dispatch(successAction(PROPOSAL_GENERATE_PDF, data));
  } catch (e) {
    dispatch(errorFromResponse(PROPOSAL_GENERATE_PDF, e, 'There was a problem generating a PDF.'));
  }
};
