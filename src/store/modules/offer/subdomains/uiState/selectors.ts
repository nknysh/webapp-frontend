import { createSelector } from 'reselect';
import { IOfferModel } from '../../model';
import { getOffersOnHotelSelector } from '../../selectors';

// TODO: For some reason, I can't import the offerDomainSelector from
// the root selector file. This is a tmp fix. I guess there's some minconfiguration
// in webpack or babel?
const tmpOfferDomainSelector = (state: any): IOfferModel => state.offer;

export const uiStateSelector = createSelector(tmpOfferDomainSelector, domain => domain.uiState);

export const getOfferRequestIsPendingSelector = createSelector(
  uiStateSelector,
  uiState => uiState.getOfferRequestIsPending
);

export const getOfferErrorSelector = createSelector(uiStateSelector, uiState => uiState.getError);

export const putOfferErrorSelector = createSelector(uiStateSelector, uiState => uiState.putError);

export const postOfferErrorSelector = createSelector(uiStateSelector, uiState => uiState.postError);

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

export const combinationListRawSelector = createSelector(
  uiStateSelector,
  uiStateSelector => uiStateSelector.combinationList
);

export const combinationListSelector = createSelector(
  combinationListRawSelector,
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
