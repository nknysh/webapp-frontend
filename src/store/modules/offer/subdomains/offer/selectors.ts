import { createSelector } from 'reselect';
import { generateArrayOfDatesBetween } from 'utils';
import { IOfferPrerequisitesPayload } from 'services/BackendApi';
import { IOfferModel } from '../../model';

// TODO: For some reason, I can't import the offerDomainSelector from
// the root selector file. This is a tmp fix. I guess there's some minconfiguration
// in webpack or babel?
const tmpOfferDomainSelector = (state: any): IOfferModel => state.offer;

export const offerSelector = createSelector(
  tmpOfferDomainSelector,
  domain => domain.offer
);

export const offerNameSelector = createSelector(
  offerSelector,
  offer => offer.name
);

export const offerHotelUuidSelector = createSelector(
  offerSelector,
  offer => offer.hotelUuid
);

export const offerTermsSelector = createSelector(
  offerSelector,
  offer => offer.termsAndConditions
);

export const offerFurtherInformationSelector = createSelector(
  offerSelector,
  offer => offer.furtherInformation
);

export const offerPrerequisitesSelector = createSelector(
  offerSelector,
  offer => offer.prerequisites
);

export const offerPayloadPrerequisitesSelector = createSelector(
  offerPrerequisitesSelector,
  prerequisites => prerequisites.payload
);

export const offerStayBetweenPrerequisitesSelector = createSelector(
  offerPrerequisitesSelector,
  prerequisites => {
    return prerequisites.dates.map(dateRange => {
      if (!dateRange.startDate || dateRange.startDate === '') {
        return [];
      }
      if (!dateRange.endDate || dateRange.endDate === '') {
        return [dateRange.startDate];
      }
      return generateArrayOfDatesBetween(dateRange.startDate, dateRange.endDate);
    });
  }
);

export const offerStayBetweenPrerequisitesRawSelector = createSelector(
  offerPrerequisitesSelector,
  prerequisites => prerequisites.dates
);

export const offerBooleanPrerequisitesSelector = createSelector(
  offerPayloadPrerequisitesSelector,
  payload => {
    const keys = ['anniversary', 'birthday', 'honeymoon', 'repeatCustomer', 'wedding'];
    const returnedPayload = {} as IOfferPrerequisitesPayload;

    keys.forEach(payloadKey => {
      if (payload && payload[payloadKey] !== undefined) {
        returnedPayload[payloadKey] = payload[payloadKey];
      } else {
        returnedPayload[payloadKey] = null;
      }
    });

    return returnedPayload;
  }
);

export const offerPreDiscountSelector = createSelector(
  offerSelector,
  offer => offer.preDiscount
);
