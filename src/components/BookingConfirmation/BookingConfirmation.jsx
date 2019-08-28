import React from 'react';
import { useTranslation } from 'react-i18next';

import { propTypes, defaultProps } from './BookingConfirmation.props';
import { Confirmation, ConfirmationTitle, ConfirmationRefNumber } from './BookingConfirmation.styles';

export const BookingConfirmation = ({ title, bookingRef, children, ...props }) => {
  const { t } = useTranslation();

  return (
    <Confirmation {...props}>
      <ConfirmationTitle>{title}</ConfirmationTitle>
      <ConfirmationRefNumber>{`${t('labels.booking')} #${bookingRef}`}</ConfirmationRefNumber>
      {children}
    </Confirmation>
  );
};

BookingConfirmation.propTypes = propTypes;
BookingConfirmation.defaultProps = defaultProps;

export default BookingConfirmation;
