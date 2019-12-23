import React from 'react';

import {
  Bolded,
  Dot,
  FlightInfo,
  FlightInfoList,
  FlightRow,
  GuestDetails,
  GuestName,
  Tag,
} from './BookingContainer.styles';

import { Section } from '@pure-escapes/webapp-ui-components';

import { formatDate } from 'utils';

import { IOldBooking } from 'services/BackendApi';

import { prop, pipe, map, propEq } from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';

const fieldIsEmpty = (key, record) => pipe(prop(key), isNilOrEmpty)(record);

const BookingGuestName = ({ booking }: { booking: IOldBooking }) => {
  if (!booking) {
    return <span></span>;
  }

  return <span>{[booking.guestTitle, booking.guestFirstName, booking.guestLastName].filter(Boolean).join(' ')}</span>;
};

const renderFlightInfo = (t, { booking }) => {
  if (isNilOrEmpty(booking)) {
    return null;
  }
  const flightInfo = [
    {
      direction: 'Arriving',
      dateSource: fieldIsEmpty('flightArrivalDate', booking) ? 'checkInDate' : 'flightArrivalDate',
      numberSource: fieldIsEmpty('flightArrivalNumber', booking) ? undefined : 'flightArrivalNumber',
    },
    {
      direction: 'Departing',
      dateSource: fieldIsEmpty('flightDepartureDate', booking) ? 'checkOutDate' : 'flightDepartureDate',
      numberSource: fieldIsEmpty('flightDepartureNumber', booking) ? undefined : 'flightDepartureNumber',
    },
  ];

  return (
    <FlightInfoList>
      {flightInfo.map(({ numberSource, dateSource, direction }) => (
        <FlightInfo key={direction}>
          <Dot />
          <FlightRow>
            <Bolded>
              {t(direction)} {formatDate(prop(dateSource, booking), 'dd MMM, yyyy')}
            </Bolded>
          </FlightRow>
          {numberSource && (
            <FlightRow>
              {t('flight')} {prop(numberSource, booking)}
            </FlightRow>
          )}
        </FlightInfo>
      ))}
    </FlightInfoList>
  );
};

const BookingSpecialRequests = ({ t, booking }: { t: Function; booking: IOldBooking }) => {
  return (
    <div>
      <ul>
        {booking &&
          booking.specialRequests &&
          booking.specialRequests.map(specialRequest => {
            return <li key={specialRequest}>{t(`labels.specialRequestOptions.${specialRequest}`)}</li>;
          })}
      </ul>
    </div>
  );
};

export const BookingGuestDetails = ({ t, booking, isSr }: { t: Function; booking: IOldBooking; isSr: boolean }) => {
  return (
    <GuestDetails>
      <Section label={t('labels.leadGuestInfo')}>
        <GuestName>
          <BookingGuestName booking={booking} />
        </GuestName>
        {propEq('isRepeatGuest', true, booking) && <Tag>{t('labels.repeatGuest')}</Tag>}
      </Section>
      <Section label={t('labels.flightInformation')}>{renderFlightInfo(t, { booking })}</Section>
      {!fieldIsEmpty('specialRequests', booking) && (
        <Section label={t('labels.specialRequests')}>
          <BookingSpecialRequests t={t} booking={booking} />
        </Section>
      )}
      {!fieldIsEmpty('comments', booking) && <Section label={t('comment_plural')}>{prop('comments', booking)}</Section>}
      {!fieldIsEmpty('bookingComments', booking) && (
        <Section label={t('labels.bookingComments')}>{prop('bookingComments', booking)}</Section>
      )}
      {isSr && !fieldIsEmpty('internalComments', booking) && (
        <Section label={t('labels.internalComments')}>{booking.internalComments || ''}</Section>
      )}
    </GuestDetails>
  );
};

export default BookingGuestDetails;
