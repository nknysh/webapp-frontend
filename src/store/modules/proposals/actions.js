import { prop, over, lensProp, omit, pathOr, append, pipe, toPairs, fromPairs, reduce } from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';

import client from 'api/proposals';

import { BookingStatusTypes } from 'config/enums';

import { completeBooking, setBookings } from 'store/modules/bookings/actions';
import { successAction, errorFromResponse } from 'store/common';
import { enqueueNotification } from 'store/modules/ui/actions';
import { getCurrentUserUuid } from 'store/modules/auth/selectors';
import { getProposal } from 'store/modules/proposals/selectors';

export const PROPOSALS_NEW = 'PROPOSALS_NEW';
export const PROPOSALS_ADD = 'PROPOSALS_ADD';
export const PROPOSALS_FETCH = 'PROPOSALS_FETCH';
export const PROPOSAL_FETCH = 'PROPOSAL_FETCH';
export const PROPOSAL_UPDATE = 'PROPOSAL_UPDATE';
export const PROPOSAL_REMOVE_BOOKING = 'PROPOSAL_REMOVE_BOOKING';

const cleanPayload = pipe(
  toPairs,
  reduce((accum, [key, value]) => (!isNilOrEmpty(value) ? append([key, value], accum) : accum), []),
  fromPairs
);

export const createNewProposalAction = payload => ({
  type: PROPOSALS_NEW,
  payload,
});

export const addToProposalAction = payload => ({
  type: PROPOSALS_ADD,
  payload,
});

export const fetchProposalAction = payload => ({
  type: PROPOSAL_FETCH,
  payload,
});

export const updateProposalAction = payload => ({
  type: PROPOSAL_UPDATE,
  payload,
});

export const removeBookingAction = payload => ({
  type: PROPOSAL_REMOVE_BOOKING,
  payload,
});

export const fetchProposalsAction = payload => ({
  type: PROPOSALS_FETCH,
  payload,
});

export const fetchProposals = params => async dispatch => {
  dispatch(fetchProposalsAction());

  try {
    const {
      data: { data },
    } = await client.getProposals(params);

    dispatch(successAction(PROPOSALS_FETCH, data));
  } catch (e) {
    dispatch(errorFromResponse(PROPOSALS_FETCH, e, 'There was a problem fetching proposals.'));
  }
};

export const fetchProposal = (id, params) => async dispatch => {
  dispatch(fetchProposalAction({ id }));

  try {
    const {
      data: { data },
    } = await client.getProposal(id, params);

    const proposal = over(lensProp('entities'), omit(['bookings']), data);
    const bookings = pathOr({}, ['entities', 'bookings'], data);

    dispatch(setBookings(bookings));
    dispatch(successAction(PROPOSAL_FETCH, proposal));
  } catch (e) {
    dispatch(errorFromResponse(PROPOSAL_FETCH, e, 'There was a problem fetching proposal.'));
  }
};

export const createNewProposal = (name, bookingId, placeHolds) => async (dispatch, getState) => {
  const state = getState();

  const userUuid = getCurrentUserUuid(state);

  dispatch(createNewProposalAction({ name, userUuid }));

  try {
    const {
      data: { data },
    } = await client.createProposal({ data: { attributes: { name, userUuid } } });

    const proposalUuid = prop('result', data);

    await dispatch(
      completeBooking(bookingId, {
        status: BookingStatusTypes.POTENTIAL,
        placeHolds,
        proposalUuid,
        bookingInformation: {
          guestFirstName: '',
          guestLastName: '',
        },
      })
    );

    dispatch(fetchProposal(proposalUuid));
    dispatch(successAction(PROPOSALS_NEW, data));
    dispatch(
      enqueueNotification({ message: `Proposal '${name}' created succesfully .`, options: { variant: 'success' } })
    );
  } catch (e) {
    dispatch(errorFromResponse(PROPOSALS_NEW, e, 'There was a problem creating proposal.'));
  }
};

export const addToProposal = (proposalUuid, bookingId, placeHolds) => async dispatch => {
  dispatch(addToProposalAction({ proposalUuid, bookingId }));

  await dispatch(
    completeBooking(bookingId, {
      status: BookingStatusTypes.POTENTIAL,
      placeHolds,
      proposalUuid,
      bookingInformation: {
        guestFirstName: '',
        guestLastName: '',
      },
    })
  );

  dispatch(fetchProposal(proposalUuid));
  dispatch(successAction(PROPOSALS_ADD, { result: proposalUuid }));
};

export const updateProposal = (proposalUuid, payload) => async (dispatch, getState) => {
  dispatch(updateProposalAction({ id: proposalUuid, payload }));
  const proposal = getProposal(getState(), proposalUuid);

  const name = prop('name', proposal);
  const userUuid = prop('userUuid', proposal);

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

export const removeBooking = (proposalUuid, bookingId) => async dispatch => {
  dispatch(removeBookingAction({ id: proposalUuid, bookingId }));

  try {
    const {
      data: { data },
    } = await client.removeBooking(proposalUuid, bookingId);

    dispatch(fetchProposal(proposalUuid));
    dispatch(successAction(PROPOSAL_REMOVE_BOOKING, data));
    dispatch(
      enqueueNotification({ message: `Removed '${bookingId}' from proposal.`, options: { variant: 'success' } })
    );
  } catch (e) {
    dispatch(errorFromResponse(PROPOSAL_REMOVE_BOOKING, e, 'There was a problem removing the booking.'));
  }
};
