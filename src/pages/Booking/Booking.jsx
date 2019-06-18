import React from 'react';
import { useTranslation } from 'react-i18next';

import { BookingContainer } from 'containers';

import { propTypes, defaultProps } from './Booking.props';
import { StyledMarkdown } from './Booking.styles';

export const Booking = ({
  match: {
    params: { id, stage },
  },
}) => {
  const { t } = useTranslation();

  let content = undefined;

  switch (stage) {
    case 'complete':
      content = t('content.booking.confirmed.default', { id });
      break;

    case 'on-request':
      content = t('content.booking.confirmed.onRequest', { id });
      break;

    case 'hold':
      content = t('content.booking.confirmed.hold', { id });
      break;

    case 'by-cc':
      content = t('content.booking.confirmed.cc', { id });
      break;

    case 'by-bt':
      content = t('content.booking.confirmed.bt', { id });
      break;
  }

  return (
    <BookingContainer id={id}>
      <StyledMarkdown>{content}</StyledMarkdown>
    </BookingContainer>
  );
};

Booking.propTypes = propTypes;
Booking.defaultProps = defaultProps;

export default Booking;
