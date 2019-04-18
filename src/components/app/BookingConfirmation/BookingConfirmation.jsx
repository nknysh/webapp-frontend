import React from 'react';
import { path } from 'ramda';

import uiConfig from 'config/ui';

import { propTypes, defaultProps } from './BookingConfirmation.props';
import { Confirmation, ConfirmationTitle, ConfirmationRefNumber } from './BookingConfirmation.styles';

export const BookingConfirmation = ({ title, bookingRef, children, ...props }) => (
  <Confirmation {...props}>
    <ConfirmationTitle>{title}</ConfirmationTitle>
    <ConfirmationRefNumber>{`${path(['labels', 'booking'], uiConfig)} #${bookingRef}`}</ConfirmationRefNumber>
    {children}
  </Confirmation>
);

BookingConfirmation.propTypes = propTypes;
BookingConfirmation.defaultProps = defaultProps;

export default BookingConfirmation;
