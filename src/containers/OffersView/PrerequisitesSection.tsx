import React from 'react';
import { ReadOnlyField } from './ReadOnlyField';

import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import { useTranslation } from 'react-i18next';
import { formatDateDisplay } from 'utils';

export const PrerequisitesSection = props => {
  const { offer, productMapping } = props;
  const { t } = useTranslation();
  if (offer === undefined) {
    return null;
  }

  return (
    <section>
      {offer.prerequisites.dates && (
        <ReadOnlyField label={t('labels.prerequisites.dates')}>
          {offer.prerequisites.dates.map(date => (
            <p key={date.startDate}>
              {formatDateDisplay(date.startDate)} - {formatDateDisplay(date.endDate)}
            </p>
          ))}
        </ReadOnlyField>
      )}

      {offer.prerequisites.maximumLodgingsInBooking && (
        <ReadOnlyField label={t('labels.prerequisites.maximumLodgingsInBooking')}>
          <p>{offer.prerequisites.maximumLodgingsInBooking}</p>
        </ReadOnlyField>
      )}

      {offer.prerequisites.advance && (
        <ReadOnlyField label={t('labels.prerequisites.advance')}>
          <div>
            <label>Book By</label>
            <span>{formatDateDisplay(offer.prerequisites.advance.bookBy)}</span>
          </div>
          {offer.prerequisites.advance.minimum && (
            <div>
              <label>Minimum</label>
              <span>{offer.prerequisites.advance.minimum}</span>
            </div>
          )}
          {offer.prerequisites.advance.maximum && (
            <div>
              <label>Maximum</label>
              <span>{offer.prerequisites.advance.maximum}</span>
            </div>
          )}
        </ReadOnlyField>
      )}

      {offer.prerequisites.stayLength && (
        <ReadOnlyField label={t('labels.prerequisites.stayLength')}>
          {offer.prerequisites.stayLength.minimum && (
            <div>
              <label>Minimum</label>
              <span>{offer.prerequisites.stayLength.minimum}</span>
            </div>
          )}
          {offer.prerequisites.stayLength.maximum && (
            <div>
              <label>Maximum</label>
              <span>{offer.prerequisites.stayLength.maximum}</span>
            </div>
          )}
          {offer.prerequisites.stayLength.strictMinMaxStay && (
            <div>
              <label>Strict Min/Max Stay</label>
              <span>{offer.prerequisites.stayLength.strictMinMaxStay ? <CheckIcon /> : <CloseIcon />}</span>
            </div>
          )}
        </ReadOnlyField>
      )}

      {offer.prerequisites.countryCodes && (
        <ReadOnlyField label={t('labels.prerequisites.countryCodes')}>
          {offer.prerequisites.countryCodes.map(countryCode => (
            <p key={countryCode}>{countryCode}</p>
          ))}
        </ReadOnlyField>
      )}

      {offer.prerequisites.accommodationProducts && (
        <ReadOnlyField label={t('labels.prerequisites.accommodationProducts')}>
          <ul>
            {offer.prerequisites.accommodationProducts.map((pUuid: string) => (
              <li key={pUuid}>{productMapping[pUuid]}</li>
            ))}
          </ul>
        </ReadOnlyField>
      )}

      {offer.prerequisites.payload != null && offer.prerequisites.payload.anniversary != null && (
        <ReadOnlyField label={t('labels.prerequisites.anniversary')}>
          <p>{offer.prerequisites.payload.anniversary ? <CheckIcon /> : <CloseIcon />}</p>
        </ReadOnlyField>
      )}

      {offer.prerequisites.payload != null && offer.prerequisites.payload.birthday != null && (
        <ReadOnlyField label={t('labels.prerequisites.birthday')}>
          <p>{offer.prerequisites.payload.birthday ? <CheckIcon /> : <CloseIcon />}</p>
        </ReadOnlyField>
      )}

      {offer.prerequisites.payload != null && offer.prerequisites.payload.honeymoon != null && (
        <ReadOnlyField label={t('labels.prerequisites.honeymoon')}>
          <p>{offer.prerequisites.payload.honeymoon ? <CheckIcon /> : <CloseIcon />}</p>
        </ReadOnlyField>
      )}

      {offer.prerequisites.payload != null && offer.prerequisites.payload.repeatCustomer != null && (
        <ReadOnlyField label={t('labels.prerequisites.repeatCustomer')}>
          <p>{offer.prerequisites.payload.repeatCustomer ? <CheckIcon /> : <CloseIcon />}</p>
        </ReadOnlyField>
      )}

      {offer.prerequisites.payload != null && offer.prerequisites.payload.wedding != null && (
        <ReadOnlyField label={t('labels.prerequisites.wedding')}>
          <p>{offer.prerequisites.payload.wedding ? <CheckIcon /> : <CloseIcon />}</p>
        </ReadOnlyField>
      )}
    </section>
  );
};
