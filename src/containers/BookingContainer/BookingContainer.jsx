import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import {
  compose,
  mapObjIndexed,
  cond,
  always,
  pick,
  equals,
  prop,
  join,
  props,
  pipe,
  map,
  propEq,
  values,
  partial,
} from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { useTranslation } from 'react-i18next';

import { Loader, Breadcrumbs, Tabs, Section, DropDownMenu } from 'components';
import { useFetchData, useCurrentWidth } from 'effects';
import { isMobile, formatDate } from 'utils';

import { ADMIN_BASE_URL } from 'config';
import { BookingStatusTypes } from 'config/enums';
import SummaryForm from 'containers/SummaryForm';

import connect from './BookingContainer.state';
import { propTypes, defaultProps } from './BookingContainer.props';
import {
  Aside,
  Back,
  Bolded,
  Booking,
  BookingContent,
  BookingTitle,
  Dot,
  FlightInfo,
  FlightInfoList,
  FlightRow,
  GuestDetails,
  GuestName,
  Main,
  StatusStrip,
  StatusStripDate,
  StatusStripStatus,
  StyledBookingContainer,
  Tag,
} from './BookingContainer.styles';

const isPotential = equals(BookingStatusTypes.POTENTIAL);
const isRequested = equals(BookingStatusTypes.REQUESTED);
const isConfirmed = equals(BookingStatusTypes.CONFIRMED);
const isCancelled = equals(BookingStatusTypes.CANCELLED);

const renderBackButton = (label, props) => <Back {...props}>{label}</Back>;
const renderBackToSearch = t => renderBackButton(t('labels.backToSearch'), { to: '/search' });
const renderBackToBookings = t => renderBackButton(t('booking_plural'), { href: `${ADMIN_BASE_URL}/bookings` });

const renderTitle = (t, { id }) => <BookingTitle>{t('labels.bookingWithId', { id })}</BookingTitle>;

const renderBreadcrumbs = (t, { id }) => (
  <Breadcrumbs
    links={[{ label: renderBackToBookings(t) }, { label: t('labels.bookingWithId', { id }), to: `/bookings/${id}` }]}
  />
);

const renderStatus = (onStatusChange, label, status) => (
  <StatusStripStatus key={status} onClick={() => onStatusChange && onStatusChange(status)} data-status={status}>
    {label}
  </StatusStripStatus>
);
const renderBookingStatus = (t, { booking }) =>
  renderStatus(undefined, t(prop('status', booking)), prop('status', booking));

const renderStatusStrip = (t, { isSr, booking, onStatusChange }) => {
  const bookingStatus = prop('status', booking);

  const statuses = {
    [BookingStatusTypes.REQUESTED]: t(`labels.${BookingStatusTypes.REQUESTED}`),
    [BookingStatusTypes.CONFIRMED]: t(`labels.${BookingStatusTypes.CONFIRMED}`),
    [BookingStatusTypes.CANCELLED]: t(`labels.${BookingStatusTypes.CANCELLED}`),
  };

  const availableStatuses = cond([
    [
      isPotential,
      always(
        pick([BookingStatusTypes.REQUESTED, BookingStatusTypes.CONFIRMED, BookingStatusTypes.CANCELLED], statuses)
      ),
    ],
    [isRequested, always(pick([BookingStatusTypes.CONFIRMED, BookingStatusTypes.CANCELLED], statuses))],
    [isConfirmed, always(pick([BookingStatusTypes.CANCELLED], statuses))],
  ]);

  return (
    <StatusStrip>
      <StatusStripDate>
        {t('labels.createdAt')} <Bolded>{formatDate(prop('createdAt', booking), 'MMM D, YYYY')}</Bolded>
      </StatusStripDate>
      {isSr && !isCancelled(bookingStatus) ? (
        <DropDownMenu title={renderBookingStatus(t, { booking })} showArrow={true}>
          {values(mapObjIndexed(partial(renderStatus, [onStatusChange]), availableStatuses(bookingStatus)))}
        </DropDownMenu>
      ) : (
        renderBookingStatus(t, { booking })
      )}
    </StatusStrip>
  );
};

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
      {propEq('isRepeatGuest', true, booking) && <Tag>{t('labels.repeatGuest')}</Tag>}
    </Section>
    <Section label={t('labels.flightInformation')}>{renderFlightInfo(t, { booking })}</Section>
    {!fieldIsEmpty('comments', booking) && <Section label={t('comment_plural')}>{prop('comments', booking)}</Section>}
  </GuestDetails>
);

const renderDetails = (t, { booking, onStatusChange, isSr }) => (
  <BookingContent>
    {!isSr && renderStatusStrip(t, { onStatusChange, booking })}
    {renderGuestDetails(t, { booking })}
  </BookingContent>
);

const renderSummary = (
  t,
  { id, canEdit, isSr, isDetails, isPotential, onSubmit, onAddHolds, onReleaseHolds, onEditGuard }
) => (
  <SummaryForm
    editGuardContent={t('content.amendBooking')}
    bookLabel={canEdit && t('buttons.amendBooking')}
    onGuardEditComplete={isSr && onEditGuard}
    id={id}
    summaryOnly={!isSr}
    compact={isSr}
    showHolds={isDetails && !canEdit}
    showBookNow={canEdit || (isDetails && isPotential)}
    onSubmit={onSubmit}
    canEdit={isSr}
    confirm={isPotential}
    onAddHolds={onAddHolds}
    onReleaseHolds={onReleaseHolds}
  />
);

export const renderTabs = (t, { isDetails, children, ...props }) => (
  <Fragment>
    {isDetails ? renderTitle(t, props) : renderBackToSearch(t)}
    {isDetails ? (
      <Tabs labels={[t('labels.resortDetails'), t('labels.guestsDetails')]}>
        {renderSummary(t, { isDetails, ...props })}
        {renderDetails(t, props)}
      </Tabs>
    ) : (
      <BookingContent>{children}</BookingContent>
    )}
  </Fragment>
);

const renderFull = (t, { children, isSr, isDetails, ...props }) => (
  <Fragment>
    {isDetails && renderBreadcrumbs(t, props)}
    {isSr && isDetails && renderStatusStrip(t, { isSr, ...props })}
    <Main>
      {isDetails ? renderDetails(t, { isSr, ...props }) : <BookingContent>{children}</BookingContent>}
      <Aside>{renderSummary(t, { isSr, isDetails, ...props })}</Aside>
    </Main>
  </Fragment>
);

export const BookingContainer = ({
  booking,
  bookingStatus,
  reviewBooking,
  children,
  clearCreatedBooking,
  completeBooking,
  created,
  fetchBooking,
  holdBooking,
  id,
  isDetails,
  isSr,
  releaseBooking,
  requestBooking,
  cancelBooking,
}) => {
  const { t } = useTranslation();
  const loaded = useFetchData(bookingStatus, fetchBooking, [id], [created]);
  const currentWidth = useCurrentWidth();
  const [hasCreated] = useState(created);
  const [canEdit, setCanEdit] = useState(false);

  if (hasCreated) clearCreatedBooking(id);
  if (!isDetails && !hasCreated) return <Redirect to={`/bookings/${id}`} />;

  const { status } = booking;

  const isPotential = equals('potential', status);

  const onSubmit = () => {
    if (!canEdit) return requestBooking(id);

    if (isSr) {
      completeBooking(id);
      cancelBooking(id);
      window.location.replace(`${ADMIN_BASE_URL}/bookings`);
      return;
    }
  };
  const onAddHolds = () => holdBooking(id);
  const onReleaseHolds = () => releaseBooking(id);
  const onEditGuard = () => setCanEdit(true);
  const onStatusChange = status => reviewBooking(id, { status });

  const defaultProps = {
    id,
    onEditGuard,
    canEdit,
    children,
    isSr,
    isDetails,
    isPotential,
    onSubmit,
    onAddHolds,
    onReleaseHolds,
    booking,
    onStatusChange,
  };

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
