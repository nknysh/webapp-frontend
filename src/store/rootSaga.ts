import { all, spawn, call } from 'redux-saga/effects';
import { watchOffersSearchRequest } from 'store/modules/fastSearch/sagas/offersSearchSaga';
import { watchOptionsRequest } from 'store/modules/fastSearch/sagas/searchOptionsSaga';
import { watchBookingActions } from 'store/modules/bookingBuilder/sagas/updateBookingBuilderResponse';
import { watchDestinationChange } from 'store/modules/fastSearch/sagas/nameSearchSaga';
import { watchInitializeQuery } from 'store/modules/fastSearch/sagas/initializeQuerySaga';
import { watchInitializeBookingBuilder } from './modules/bookingBuilder/sagas/initializeBookingBuilder';
import { watchGetProposalsList } from './modules/proposalsList/sagas/proposalsListSaga';
import { watchGetPendingProposalsInfo } from './modules/proposalsList/sagas/pendingProposalsInfoSaga';
import { watchGetBookingsList } from './modules/bookingsList/sagas/bookingsListSaga';
import { watchGetTravelAgentsRequest } from './modules/agents/sagas/getTravelAgentsSaga';
import { watchGetHotelNames } from './modules/bookingsList/sagas/hotelNamesSaga';
import { watchUpdateQueryString } from './modules/fastSearch/sagas/updateQueryStringSaga';
import { watchGetOffersList } from './modules/offersList/sagas/offersListSaga';
import { watchConfirmRequestToDeleteOffersSaga } from './modules/offersList/sagas/offersListDeleteSaga';
import { watchGetOfferRequest } from './modules/offer/sagas/getOfferSaga';
import { watchBootstrapAppRequest } from './modules/bootstrap/sagas/bootstrapAppSaga';
import { watchPutOfferRequest } from './modules/offer/sagas/putOfferSaga';
import { watchPostOfferRequest } from './modules/offer/sagas/postOfferSaga';
import { watchPostOffersOrderRequestSaga } from './modules/offer/sagas/postOffersOrderSaga';
import { watchOfferHotelUuidChangeAction } from './modules/offer/sagas/getHotelData';
import importRatesSaga from './modules/ratesImport/sagas';

export default function* allSagas() {
  const sagas = [
    watchOffersSearchRequest,
    watchOptionsRequest,
    watchDestinationChange,
    watchBookingActions,
    watchInitializeQuery,
    watchInitializeBookingBuilder,
    watchGetProposalsList,
    watchGetPendingProposalsInfo,
    watchGetBookingsList,
    watchGetTravelAgentsRequest,
    watchGetHotelNames,
    watchUpdateQueryString,
    watchGetOffersList,
    watchConfirmRequestToDeleteOffersSaga,
    watchGetOfferRequest,
    watchBootstrapAppRequest,
    watchPutOfferRequest,
    watchPostOfferRequest,
    watchPostOffersOrderRequestSaga,
    watchOfferHotelUuidChangeAction,
    importRatesSaga,
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
