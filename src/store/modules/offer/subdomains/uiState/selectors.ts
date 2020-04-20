import { createSelector } from 'reselect';
import { offerDomainSelector, getOffersOnHotelSelector } from '../../domainSelectors';

export const uiStateSelector = createSelector(offerDomainSelector, domain => domain.uiState);

export const getOfferRequestIsPendingSelector = createSelector(
  uiStateSelector,
  uiState => uiState.getOfferRequestIsPending
);

export const apiRequestIsPendingSelector = createSelector(
  uiStateSelector,
  uiState => uiState.getOfferRequestIsPending || uiState.postOfferRequestIsPending || uiState.putOfferRequestIsPending
);

export const getOfferErrorSelector = createSelector(uiStateSelector, uiState => uiState.getError);

export const putOfferErrorSelector = createSelector(uiStateSelector, uiState => uiState.putError);

export const postOfferErrorSelector = createSelector(uiStateSelector, uiState => uiState.postError);

export const hasApiErrorSelector = createSelector(
  getOfferErrorSelector,
  putOfferErrorSelector,
  postOfferErrorSelector,
  (getError, putError, postError) => Boolean(getError || putError || postError)
);

export const offerDomainIsTextOnlySelector = createSelector(
  uiStateSelector,
  uiStateSelector => uiStateSelector.isTextOnly
);

export const taCountryAccordianKeysSelector = createSelector(
  uiStateSelector,
  uiStateSelector => uiStateSelector.taCountryAccordianKeys
);

export const combinationModeSelector = createSelector(
  uiStateSelector,
  uiStateSelector => uiStateSelector.combinationMode
);

export const combinationOfferUuidsSelector = createSelector(
  uiStateSelector,
  uiStateSelector => uiStateSelector.combinationOfferUuids
);

export const combinationListSelector = createSelector(
  combinationOfferUuidsSelector,
  getOffersOnHotelSelector,
  (combinationList, offersOnHotel) => {
    return offersOnHotel.map(offerOnHotel => {
      if (combinationList.includes(offerOnHotel.uuid)) {
        return {
          uuid: offerOnHotel.uuid,
          label: offerOnHotel.name,
          value: true,
        };
      } else {
        return {
          uuid: offerOnHotel.uuid,
          label: offerOnHotel.name,
          value: false,
        };
      }
    });
  }
);

export const orderedOffersListSelector = createSelector(uiStateSelector, uiState => uiState.orderedOffersList);

export const offerIsPristineSelector = createSelector(uiStateSelector, uiStateSelector => uiStateSelector.isPristine);

export const ageNameAccordianKeysSelector = createSelector(
  uiStateSelector,
  uiStateSelector => uiStateSelector.ageNameAccordianKeys
);

export const showSuccessConfirmationSelector = createSelector(
  uiStateSelector,
  uiState => uiState.showSuccessConfirmation
);
