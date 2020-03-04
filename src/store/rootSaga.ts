import { all, spawn, call } from 'redux-saga/effects';
import { watchOffersSearchRequest } from 'store/modules/fastSearch/sagas/offersSearchSaga';
import { watchOptionsRequest } from 'store/modules/fastSearch/sagas/searchOptionsSaga';
import { watchBookingActions } from 'store/modules/bookingBuilder/sagas/updateBookingBuilderResponse';
import { watchDestinationChange } from 'store/modules/fastSearch/sagas/nameSearchSaga';
import { watchInitializeQuery } from 'store/modules/fastSearch/sagas/initializeQuerySaga';
import { watchInitializeBookingBuilder } from './modules/bookingBuilder/sagas/initializeBookingBuilder';
import { watchGetProposalsList } from './modules/proposalsList/sagas/proposalsListSaga';
import { watchGetBookingsList } from './modules/bookingsList/sagas/bookingsListSaga';
import { watchGetTravelAgentsRequest } from './modules/agents/sagas/getTravelAgentsSaga';
import { watchGetHotelNames } from './modules/bookingsList/sagas/hotelNamesSaga';
import { watchUpdateQueryString } from './modules/fastSearch/sagas/updateQueryStringSaga';
import { watchGetOffersList } from './modules/offersList/sagas/offersListSaga';
import { watchConfirmRequestToDeleteOffersSaga } from './modules/offersList/sagas/offersListDeleteSaga';
import { watchGetOfferRequest } from './modules/offer/sagas/getOfferSaga';

export default function* allSagas() {
  const sagas = [
    watchOffersSearchRequest,
    watchOptionsRequest,
    watchDestinationChange,
    watchBookingActions,
    watchInitializeQuery,
    watchInitializeBookingBuilder,
    watchGetProposalsList,
    watchGetBookingsList,
    watchGetTravelAgentsRequest,
    watchGetHotelNames,
    watchUpdateQueryString,
    watchGetOffersList,
    watchConfirmRequestToDeleteOffersSaga,
    watchGetOfferRequest,
  ];

  yield all(
    sagas.map(saga =>
      spawn(function*() {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.error(`Error ${e}`);
          }
        }
      })
    )
  );
}
