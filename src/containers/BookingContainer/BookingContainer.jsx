import React, { Fragment, useState, useCallback, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
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
  path,
  anyPass,
} from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Container,
  DropDownMenu,
  Loader,
  Markdown,
  Modal,
  Section,
  Tabs,
} from '@pure-escapes/webapp-ui-components';

import { BookingConfirmationForm, Breadcrumbs } from 'components';
import { useCurrentWidth, useModalState } from 'effects';
import { withUser } from 'hoc';
import { formatDate } from 'utils';

import { ADMIN_BASE_URL } from 'config';
import { BookingStatusTypes } from 'config/enums';
// import SummaryForm from 'containers/SummaryForm';

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
  Tag,
  ModalContent,
  ModalTitle,
} from './BookingContainer.styles';
import { DisplayTotalsBreakdown } from 'components';
import CommissionSummary from 'pureUi/CommissonSummary';

const isPotential = equals(BookingStatusTypes.POTENTIAL);
const isRequested = equals(BookingStatusTypes.REQUESTED);
const isConfirmed = equals(BookingStatusTypes.CONFIRMED);
const isCancelled = equals(BookingStatusTypes.CANCELLED);

const isCancelledOrConfirmed = anyPass([isConfirmed, isCancelled]);

const renderBackButton = (label, props) => <Back {...props}>{label}</Back>;
const renderBackToSearch = t => renderBackButton(t('labels.backToSearch'), { to: '/search/beta' });
const renderBackToBookings = t => renderBackButton(t('enquiryBooking_plural'), { href: `${ADMIN_BASE_URL}/bookings` });

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
  if (isNilOrEmpty(booking)) {
    return null;
  }
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
        {t('labels.createdAt')} <Bolded>{formatDate(prop('createdAt', booking), 'MMM d, yyyy')}</Bolded>
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
      {map(
        ({ numberSource, dateSource, direction }) => (
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
        ),
        flightInfo
      )}
    </FlightInfoList>
  );
};

const renderGuestDetails = (t, { booking, isSr }) => (
  <GuestDetails>
    <Section label={t('labels.leadGuestInfo')}>
      <GuestName>{join(' ', props(['guestTitle', 'guestFirstName', 'guestLastName'], booking))}</GuestName>
      {propEq('isRepeatGuest', true, booking) && <Tag>{t('labels.repeatGuest')}</Tag>}
    </Section>
    <Section label={t('labels.flightInformation')}>{renderFlightInfo(t, { booking })}</Section>
    {!fieldIsEmpty('comments', booking) && <Section label={t('comment_plural')}>{prop('comments', booking)}</Section>}
    {!fieldIsEmpty('bookingComments', booking) && (
      <Section label={t('labels.bookingComments')}>{prop('bookingComments', booking)}</Section>
    )}
    {isSr && !fieldIsEmpty('internalComments', booking) && (
      <Section label={t('labels.internalComments')}>{prop('internalComments', booking)}</Section>
    )}
  </GuestDetails>
);

const renderDetails = (t, { booking, onStatusChange, isSr, isMobile }) => (
  <BookingContent>
    {isSr && isMobile && renderStatusStrip(t, { onStatusChange, booking, isSr })}
    {renderGuestDetails(t, { isSr, booking })}
  </BookingContent>
);

const renderSummary = (
  t,
  {
    id,
    booking,
    canEdit,
    isSr,
    isDetails,
    isPotential,
    onSubmit,
    onAddHolds,
    onReleaseHolds,
    onEditGuard,
    holds,
    currencyCode,
  }
) => {
  return (
    <React.Fragment>
      <DisplayTotalsBreakdown
        t={t}
        currencyCode={currencyCode}
        displayTotals={booking.currentBookingBuilder.response.displayTotals}
      />

      <hr />

      <CommissionSummary
        total={booking.currentBookingBuilder.response.displayTotals.totals.total}
        currencyCode={currencyCode}
        marginType={booking.taMarginType}
        marginAmount={booking.taMarginAmount}
      />

      <hr />

      {!isComplete && !holdOnly && (
        <React.Fragment>
          {renderPaymentTypes(t, { isOnRequest, onPaymentChange, paymentType })}
          {renderSubmitButton(t, { isReviewView, canBook, onSubmit, isMobile, isOnRequest })}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

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

const renderBookingRequest = (t, { status, onModalSubmit }) => (
  <Fragment>
    <Markdown>{t('content.booking.request')}</Markdown>
    <Button onClick={() => onModalSubmit({ status })}>{t('buttons.requestBooking')}</Button>
  </Fragment>
);

const renderBookingConfirm = (t, { booking, status, onModalSubmit }) => (
  <BookingConfirmationForm
    onRequest={path(['breakdown', 'totals', 'oneOrMoreItemsOnRequest'], booking)}
    onSubmit={onModalSubmit}
    initialValues={{ status }}
  />
);

const renderBookingCancel = (t, { status, onModalSubmit }) => (
  <Fragment>
    <Markdown>{t('content.booking.cancel')}</Markdown>
    <Button onClick={() => onModalSubmit({ status })}>{t('buttons.cancelBooking')}</Button>
  </Fragment>
);

const renderModal = (t, { booking, modalOpen, modalContext, isSr, onModalClose, onModalSubmit }) => {
  if (!isSr || !modalContext) return null;

  const modalContent = {
    [BookingStatusTypes.REQUESTED]: {
      title: t('labels.bookingConfirm'),
      content: renderBookingRequest(t, { booking, status: modalContext, onModalSubmit }),
    },
    [BookingStatusTypes.CONFIRMED]: {
      title: t('labels.bookingConfirm'),
      content: renderBookingConfirm(t, { booking, status: modalContext, onModalSubmit }),
    },
    [BookingStatusTypes.CANCELLED]: {
      title: t('labels.cancelBooking'),
      content: renderBookingCancel(t, { booking, status: modalContext, onModalSubmit }),
    },
  };

  const modal = prop(modalContext, modalContent);

  return (
    modal && (
      <Modal open={modalOpen} onClose={onModalClose}>
        <ModalContent>
          <ModalTitle>{prop('title', modal)}</ModalTitle>
          {prop('content', modal)}
        </ModalContent>
      </Modal>
    )
  );
};
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
  amended,
  holds,
  currencyCode,
  forwardsCompatBookingBuilderAction,
}) => {
  const { t } = useTranslation();

  const [isLoading, setIsLoaded] = useState(true);

  useEffect(() => {
    async function load() {
      await fetchBooking(id);
      setIsLoaded(false);
    }
    if (isNilOrEmpty(booking)) {
      load();
    }
    setIsLoaded(false);
  }, [fetchBooking, forwardsCompatBookingBuilderAction, booking, holds, id]);

  // forwards compat the booking builder
  forwardsCompatBookingBuilderAction(booking, holds);

  const { isMobile } = useCurrentWidth();

  // Whether there is a created ID for this booking
  const [hasCreated] = useState(created);

  // Whether a user can edit this booking
  const [canEdit, setCanEdit] = useState(false);
  const modal = useModalState();

  const onSubmit = useCallback(() => {
    setCanEdit(false);

    // If a user can request a booking but can't edit the booking
    if (!canEdit) return requestBooking(id);

    // SR can complete the booking
    if (isSr) {
      completeBooking(id);
      cancelBooking(id);
      return;
    }
  }, [canEdit, cancelBooking, completeBooking, id, isSr, requestBooking]);
  const onAddHolds = useCallback(() => holdBooking(id), [holdBooking, id]);
  const onReleaseHolds = useCallback(() => releaseBooking(id), [releaseBooking, id]);
  const onEditGuard = useCallback(() => setCanEdit(true), []);
  const onStatusChange = useCallback(
    status => {
      setModalContext(status);
      onModalOpen();
    },
    [onModalOpen, setModalContext]
  );
  const onModalSubmit = useCallback(
    values => {
      onModalClose();
      reviewBooking(id, values);
    },
    [onModalClose, reviewBooking, id]
  );

  // Because "amending" a booking is actually creating a new one, redirect to the
  // new booking id's page
  if (amended) return <Redirect to={`/bookings/${amended}`} />;

  // If there is a created flag for this booking, remove it from the redux store
  if (hasCreated) clearCreatedBooking(id);

  // Redirect to the booking details page if user shouldn't be on this page
  if (!isDetails && !hasCreated) return <Redirect to={`/bookings/${id}`} />;

  const { status } = booking;
  const { setModalContext, onModalOpen, onModalClose } = modal;
  const isPotential = equals('potential', status);

  const defaultProps = {
    booking,
    canEdit,
    children,
    holds,
    id,
    isDetails,
    isPotential,
    isSr,
    isMobile,
    onAddHolds,
    onEditGuard,
    onReleaseHolds,
    onStatusChange,
    onSubmit,
  };

  return (
    <Loader isLoading={isLoading} text={t('messages.gettingBooking')}>
      <Container>
        <Booking>{isMobile ? renderTabs(t, defaultProps) : renderFull(t, defaultProps)}</Booking>
        {renderModal(t, { isSr, onModalSubmit, booking, ...modal })}
      </Container>
    </Loader>
  );
};

BookingContainer.propTypes = propTypes;
BookingContainer.defaultProps = defaultProps;

export default compose(
  withRouter,
  withUser,
  connect
)(BookingContainer);
