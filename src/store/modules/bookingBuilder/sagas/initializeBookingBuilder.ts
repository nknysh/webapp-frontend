import { call, put, takeLatest, select } from 'redux-saga/effects';
import { pick } from 'ramda';
import {
  INITIALIZE_BOOKING_BUILDER,
  InitializeBookingBuilderAction,
  copyBookingBuilderAction,
  createStubBookingBuilderAction,
  initializeBookingBuilderFailureAction,
  updateBookingGuestInformationAction
} from '../actions';
import { PROPOSALS_NEW, PROPOSALS_ADD } from '../../proposals/actions';
import { fastSearchBookingBuilderSelector } from 'store/modules/fastSearch/selectors';
import { makeBackendApi } from 'services/BackendApi';
import { getUserCountryContext } from 'store/modules/auth';

import { bookingBuilderSelector, bookingBuilderResponseHotelUuidSelector } from 'store/modules/bookingBuilder';
import { backwardCompatBookingBuilderAction } from 'store/modules/bookings';
import {
  taMarginTypeSelector,
  taMarginAmountSelector,
  travelAgentUserUuidSelector,
  latestBookingOperationSelector
} from '../selectors';
import {
  pendingProposalsLatestSelector
} from '../../proposalsList/subdomains/pendingProposals/selectors';

export function* initializeBookingBuilderSaga(action: InitializeBookingBuilderAction) {
  try {
    const latestBookingOperation = yield select(latestBookingOperationSelector);

    //update booking guest info from latest pending proposal if this was user's last action
    if([PROPOSALS_ADD, PROPOSALS_NEW].includes(latestBookingOperation)){
      const latestPendingProposal = yield select(pendingProposalsLatestSelector);

      if(latestPendingProposal){
        yield put(
          updateBookingGuestInformationAction(
            pick(['guestTitle', 'guestFirstName', 'guestLastName'], latestPendingProposal)
          )
        );
      }
    }

    const actingCountryCode = yield select(getUserCountryContext);
    const backendApi = makeBackendApi(actingCountryCode);

    const currentHotelUuid: string = yield select(bookingBuilderResponseHotelUuidSelector);

    // No need to initialize if the hotel is already in memory
    if (currentHotelUuid === action.hotelUuid) {
      return;
    }

    // we're initializing for a different hotel - proceed as normal
    const existingBookingBuilder = yield select(fastSearchBookingBuilderSelector);
    if (existingBookingBuilder) {
      yield put(copyBookingBuilderAction(existingBookingBuilder));

      const currentBookingBuilder = yield select(bookingBuilderSelector);
      const marginType = yield select(taMarginTypeSelector);
      const marginAmount = yield select(taMarginAmountSelector);
      const travelAgentUserUuid = yield select(travelAgentUserUuidSelector);

      // this action ensures that every single time we update our new booking builder response, we keep the old `bookings` domain in sync
      // this is done because there is a lot of code that relies on the old `bookings` domain data
      // @see https://pureescapes.atlassian.net/browse/OWA-1030
      yield put(
        backwardCompatBookingBuilderAction(
          action.hotelUuid,
          currentBookingBuilder.request,
          currentBookingBuilder.response,
          marginType,
          marginAmount,
          travelAgentUserUuid
        )
      );
    } else {
      const hotel = yield call(backendApi.getHotel, action.hotelUuid);
      yield put(createStubBookingBuilderAction(hotel));
    }
  } catch (e) {
    yield put(initializeBookingBuilderFailureAction());
  }
}

export function* watchInitializeBookingBuilder() {
  yield takeLatest(INITIALIZE_BOOKING_BUILDER, initializeBookingBuilderSaga);
}
