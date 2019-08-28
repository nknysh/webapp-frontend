import { prop, pipe, when, complement, over, lensProp, length, pick, head, toPairs } from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';

import { windowExists } from 'utils';

import { createReducer, getSuccessActionName, getErrorActionName } from 'store/utils';
import { BOOKING_SUBMIT, BOOKING_FETCH } from 'store/modules/bookings';
import { HOTEL as HOTEL_FETCH } from 'store/modules/hotel';
import { PAGE_CHANGE } from 'store/common';
import { PROPOSALS_NEW, PROPOSAL_FETCH } from 'store/modules/proposals';
import { SEARCH_BY_QUERY } from 'store/modules/search';

const BOOKING_COMPLETE = getSuccessActionName(BOOKING_SUBMIT);
const BOOKING_ERROR = getErrorActionName(BOOKING_SUBMIT);
const BOOKING_VIEW = getSuccessActionName(BOOKING_FETCH);
const HOTEL = getSuccessActionName(HOTEL_FETCH);
const PAGE = PAGE_CHANGE;
const PROPOSAL_CREATE = getSuccessActionName(PROPOSALS_NEW);
const PROPOSAL_VIEW = getSuccessActionName(PROPOSAL_FETCH);
const SEARCH = getSuccessActionName(SEARCH_BY_QUERY);

const TrackableEventTypes = Object.freeze({
  [BOOKING_COMPLETE]: 'Booking: Request',
  [BOOKING_ERROR]: 'Booking: Error',
  [BOOKING_VIEW]: 'Booking: View',
  [HOTEL]: 'Hotel View',
  [PAGE]: 'Page',
  [PROPOSAL_CREATE]: 'Proposal: New',
  [PROPOSAL_VIEW]: 'Proposal: View',
  [SEARCH]: 'Search',
});

const searchToAttributes = pipe(
  prop('byQuery'),
  when(complement(isNilOrEmpty), pipe(over(lensProp('result'), length)))
);

const bookingComplete = (state, { payload }) => {
  const data = prop('data', payload);
  windowExists.drift &&
    windowExists.drift.track(TrackableEventTypes.BOOKING_COMPLETE, pick(['uuid', 'bookingHash'], data));
  return state;
};

const bookingError = state => {
  windowExists.drift && windowExists.drift.track(TrackableEventTypes.BOOKING_ERROR);
  return state;
};

const bookingView = (state, { type, payload }) => {
  windowExists.drift && windowExists.drift.track(TrackableEventTypes[type], head(head(toPairs(payload))));
  return state;
};

const page = state => {
  windowExists.drift && windowExists.drift.page();
  return state;
};

const search = (state, { type, payload }) => {
  windowExists.drift && windowExists.drift.track(TrackableEventTypes[type], searchToAttributes(payload));
  return state;
};

const resultEvent = (state, { type, payload }) => {
  windowExists.drift && windowExists.drift.track(TrackableEventTypes[type], pick(['result'], payload));
  return state;
};

export default createReducer({
  [BOOKING_COMPLETE]: bookingComplete,
  [BOOKING_ERROR]: bookingError,
  [BOOKING_VIEW]: bookingView,
  [HOTEL]: resultEvent,
  [PAGE]: page,
  [PROPOSAL_CREATE]: resultEvent,
  [PROPOSAL_VIEW]: resultEvent,
  [SEARCH]: search,
});
