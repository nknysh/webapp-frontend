import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { compose, equals, prop, join, props, pipe, map } from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { useTranslation } from 'react-i18next';

import { Loader, Breadcrumbs, Tabs, Section } from 'components';
import { useFetchData, useCurrentWidth } from 'effects';
import { isMobile, formatDate } from 'utils';

import { ADMIN_BASE_URL } from 'config';
import SummaryForm from 'containers/SummaryForm';

import connect from './BookingContainer.state';
import { propTypes, defaultProps } from './BookingContainer.props';
import {
  StyledBookingContainer,
  Main,
  Aside,
  Back,
  BookingContent,
  BookingTitle,
  GuestDetails,
  GuestName,
  FlightInfoList,
  FlightInfo,
  Dot,
  FlightRow,
  Bolded,
  Tag,
  StatusStrip,
  StatusStripDate,
  Booking,
} from './BookingContainer.styles';

const renderBackButton = (label, props) => <Back {...props}>{label}</Back>;
const renderBackToSearch = t => renderBackButton(t('labels.backToSearch'), { to: '/search' });
const renderBackToBookings = t => renderBackButton(t('booking_plural'), { href: `${ADMIN_BASE_URL}/bookings` });

const renderTitle = (t, { id }) => <BookingTitle>{t('labels.bookingWithId', { id })}</BookingTitle>;

const renderBreadcrumbs = (t, { id }) => (
  <Breadcrumbs
    links={[{ label: renderBackToBookings(t) }, { label: t('labels.bookingWithId', { id }), to: `/bookings/${id}` }]}
  />
);

const renderStatusStrip = (t, { booking }) => (
  <StatusStrip>
    {t('labels.createdAt')} <StatusStripDate>{formatDate(prop('createdAt', booking), 'MMM D, YYYY')}</StatusStripDate>
  </StatusStrip>
);

const fieldIsEmpty = (key, record) =>
  pipe(
    prop(key),
    isNilOrEmpty
  )(record);

const renderFlightInfo = (t, { booking }) => {
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
      {map(
        ({ numberSource, dateSource, direction }) => (
          <FlightInfo key={direction}>
            <Dot />
            <FlightRow>
              <Bolded>
                {t(direction)} {formatDate(prop(dateSource, booking), 'DD MMMM, YYYY')}
              </Bolded>
            </FlightRow>
            {numberSource && (
              <FlightRow>
                {t('flight')} {prop(numberSource, booking)}
              </FlightRow>
            )}
          </FlightInfo>
        ),
        flightInfo
      )}
    </FlightInfoList>
  );
};

const renderGuestDetails = (t, { booking }) => (
  <GuestDetails>
    <Section label={t('labels.leadGuestInfo')}>
      <GuestName>{join(' ', props(['guestTitle', 'guestFirstName', 'guestLastName'], booking))}</GuestName>
      {prop('isRepeatGuest', booking) && <Tag>{t('labels.repeatGuest')}</Tag>}
      <Tag>{t('labels.repeatGuest')}</Tag>
    </Section>
    <Section label={t('labels.flightInformation')}>{renderFlightInfo(t, { booking })}</Section>
    {!fieldIsEmpty('comments', booking) && <Section label={t('comment_plural')}>{prop('comments', booking)}</Section>}
  </GuestDetails>
);

const renderDetails = (t, { booking }) => (
  <BookingContent>
    {renderStatusStrip(t, { booking })}
    {renderGuestDetails(t, { booking })}
  </BookingContent>
);

const renderSummary = (t, { id, isDetails, isPotential, onSubmit, onAddHolds, onReleaseHolds }) => (
  <SummaryForm
    id={id}
    summaryOnly
    showHolds={isDetails}
    showBookNow={isDetails && isPotential}
    onSubmit={onSubmit}
    confirm={isPotential}
    onAddHolds={onAddHolds}
    onReleaseHolds={onReleaseHolds}
  />
);

export const renderTabs = (
  t,
  { id, isDetails, children, isPotential, onSubmit, onAddHolds, onReleaseHolds, booking }
) => (
  <Fragment>
    {isDetails ? renderTitle(t, { id }) : renderBackToSearch(t)}
    {isDetails ? (
      <Tabs labels={[t('labels.resortDetails'), t('labels.guestsDetails')]}>
        {renderSummary(t, { id, isDetails, isPotential, onSubmit, onAddHolds, onReleaseHolds })}
        {renderDetails(t, { booking })}
      </Tabs>
    ) : (
      <BookingContent>{children}</BookingContent>
    )}
  </Fragment>
);

const renderFull = (t, { children, id, isDetails, isPotential, onSubmit, onAddHolds, onReleaseHolds, booking }) => (
  <Fragment>
    {isDetails && renderBreadcrumbs(t, { id })}
    <Main>
      {isDetails ? renderDetails(t, { booking }) : <BookingContent>{children}</BookingContent>}
      <Aside>{renderSummary(t, { id, isDetails, isPotential, onSubmit, onAddHolds, onReleaseHolds })}</Aside>
    </Main>
  </Fragment>
);

export const BookingContainer = ({
  id,
  children,
  fetchBooking,
  bookingStatus,
  isDetails,
  created,
  clearCreatedBooking,
  booking,
  requestBooking,
  holdBooking,
  releaseBooking,
}) => {
  const { t } = useTranslation();
  const loaded = useFetchData(bookingStatus, fetchBooking, [id]);
  const currentWidth = useCurrentWidth();
  const [hasCreated] = useState(created);

  if (hasCreated) clearCreatedBooking(id);

  if (!isDetails && !hasCreated) return <Redirect to={`/bookings/${id}`} />;

  const { status } = booking;

  const isPotential = equals('potential', status);

  const onSubmit = () => requestBooking(id);
  const onAddHolds = () => holdBooking(id);
  const onReleaseHolds = () => releaseBooking(id);

  const defaultProps = { id, children, isDetails, isPotential, onSubmit, onAddHolds, onReleaseHolds, booking };

  return (
    <Loader isLoading={!loaded} text={t('messages.gettingBooking')}>
      <StyledBookingContainer>
        <Booking>{isMobile(currentWidth) ? renderTabs(t, defaultProps) : renderFull(t, defaultProps)}</Booking>
      </StyledBookingContainer>
    </Loader>
  );
};

BookingContainer.propTypes = propTypes;
BookingContainer.defaultProps = defaultProps;

export default compose(connect)(BookingContainer);
