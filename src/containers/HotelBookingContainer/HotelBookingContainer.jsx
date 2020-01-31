import React, { useRef, Fragment, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { equals, compose, prop, path, pick, over, lensProp, take } from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { useTranslation } from 'react-i18next';
import { Loader, RadioButton, Button } from '@pure-escapes/webapp-ui-components';

import { AgreeToForm, BookingConfirmation } from 'components';
import { useFetchData, useCurrentWidth, useEffectBoundary, useModalState } from 'effects';

import { PAYMENT_ENABLED } from 'config';

import { isError, isSending } from 'store/common';
import { fields, validation, data } from 'config/forms/bookingForm';

import connect, { useHotelBookingContainerState } from './HotelBookingContainer.state';
import { propTypes, defaultProps } from './HotelBookingContainer.props';
import {
  Aside,
  Back,
  BookingForm,
  BookingPath,
  BookingPathSegment,
  Chevron,
  Confirmation,
  ConfirmationContent,
  FormWrapper,
  Main,
  PaymentMethod,
  StyledBreadcrumbs,
  StyledHotelContainer,
  Total,
} from './HotelBookingContainer.styles';
import { PaymentType, ViewType } from './HotelBookingContainer.types';
import { formatPrice } from 'utils';
import BookingSummaryLite from 'pureUi/BookingSummaryLite';

import { StandardModal, ModalContent, ModalHeader } from 'pureUi/Modal';

export const simpleForm = pick(['guestTitle', 'guestFirstName', 'guestLastName']);
export const withoutSections = over(lensProp('sections'), take(1));

const renderBackButton = t => <Back to="/search/beta">{t('labels.backToSearch')}</Back>;

const renderBreadcrumbs = (t, { isComplete, isMobile, isDetailsView, isReviewView, onMobileNavClick, hotel, id }) => (
  <Fragment>
    {isMobile && renderBackButton(t)}
    {!isComplete &&
      (isMobile ? (
        <BookingPath>
          <BookingPathSegment onClick={onMobileNavClick} data-active={isDetailsView}>
            {t('labels.enterGuestDetails')}
          </BookingPathSegment>
          <Chevron>chevron_right</Chevron>
          <BookingPathSegment data-active={isReviewView}>{t('labels.reviewAndConfirm')}</BookingPathSegment>
        </BookingPath>
      ) : (
        <StyledBreadcrumbs
          links={[
            { label: renderBackButton(t) },
            { label: prop('name', hotel), to: `/hotels/${id}` },
            { label: t('labels.enterGuestDetails'), to: `/hotels/${id}/booking` },
          ]}
        />
      ))}
  </Fragment>
);

const renderSubmitButton = (t, { isMobile, isReviewView, canBook, onSubmit, isOnRequest }) => (
  <Button
    disabled={isMobile ? isReviewView && !canBook : !canBook}
    type="button"
    onClick={onSubmit}
    onTouchMove={onSubmit}
  >
    {PAYMENT_ENABLED && !isOnRequest && t('buttons.bookAndPay')}
    {!PAYMENT_ENABLED && !isOnRequest && t('buttons.bookNow')}
    {isOnRequest && t('buttons.bookOnRequest')}
  </Button>
);

const renderGuestForm = (
  t,
  {
    canBook,
    guestFormRef,
    guestFormValues,
    isDetailsView,
    isOnRequest,
    isReviewView,
    isMobile,
    onGuestFormSubmit,
    onSubmit,
    holdOnly,
  }
) => (
  <FormWrapper data-hidden={isMobile && !isDetailsView}>
    <BookingForm
      ref={guestFormRef}
      onSubmit={onGuestFormSubmit}
      initialValues={guestFormValues}
      fields={holdOnly ? simpleForm(fields) : fields}
      validation={validation}
      data={holdOnly ? withoutSections(data) : data}
    >
      {isMobile && renderSubmitButton(t, { isMobile, isReviewView, canBook, onSubmit, isOnRequest })}
    </BookingForm>
  </FormWrapper>
);

const renderPaymentTypes = (t, { isOnRequest, onPaymentChange, paymentType }) =>
  PAYMENT_ENABLED &&
  !isOnRequest && (
    <PaymentMethod>
      <RadioButton
        value={paymentType}
        onChange={onPaymentChange}
        options={[
          { label: t('labels.payByCC'), value: PaymentType.CC },
          { label: t('labels.payByBT'), value: PaymentType.BT },
        ]}
      />
    </PaymentMethod>
  );

const renderSummary = (
  t,
  {
    isMobile,
    isReviewView,
    isComplete,
    onSubmit,
    canBook,
    isOnRequest,
    paymentType,
    onPaymentChange,
    holdOnly,
    oldBooking,
  }
) => {
  return (
    <div
      style={{
        backgroundColor: '#F8F8F8',
        padding: '20px',
      }}
    >
      <BookingSummaryLite key={oldBooking.bookingHash} booking={oldBooking} />

      {!isComplete && !holdOnly && (
        <React.Fragment>
          {renderPaymentTypes(t, { isOnRequest, onPaymentChange, paymentType })}
          {renderSubmitButton(t, { isReviewView, canBook, onSubmit, isMobile, isOnRequest })}
        </React.Fragment>
      )}
    </div>
  );
};

// eslint-disable-next-line
const renderModalSubmitButton = label => () => <Button type="submit">{label}</Button>;

const renderModalForm = ({ onModalSubmit, buttonLabel, initialValues }) => (
  <AgreeToForm
    renderSubmitButton={renderModalSubmitButton(buttonLabel)}
    onSubmit={onModalSubmit}
    initialValues={initialValues}
  />
);

const renderModalContent = (t, { isOnRequest, paymentType, onModalSubmit, total, currencyCode }) => {
  const finalizeAndPay = (
    <Fragment>
      {t('buttons.finalizeAndPay')} | <Total>{`${currencyCode}${formatPrice(total)}`}</Total>
    </Fragment>
  );

  const paymentTypes = {
    [PaymentType.CC]: {
      title: t('labels.payByCC'),
      content: t('content.booking.cc'),
      buttonLabel: finalizeAndPay,
    },
    [PaymentType.BT]: {
      title: t('labels.payByBT'),
      content: t('content.booking.bt'),
      buttonLabel: finalizeAndPay,
    },
  };

  const title =
    (isOnRequest && t('labels.bookingConfirmOnRequest')) ||
    (PAYMENT_ENABLED && !isOnRequest && path([paymentType, 'title'], paymentTypes)) ||
    t('labels.bookingConfirm');
  const content =
    (isOnRequest && t('content.booking.onRequest')) ||
    (PAYMENT_ENABLED && !isOnRequest && path([paymentType, 'content'], paymentTypes)) ||
    '';
  const buttonLabel =
    (isOnRequest && t('buttons.submitBookingRequest')) ||
    (PAYMENT_ENABLED && !isOnRequest && path([paymentType, 'buttonLabel'], paymentTypes)) ||
    t('buttons.submitBookingRequest');

  return (
    <StandardModal>
      <ModalHeader>{title}</ModalHeader>
      <ModalContent>{content}</ModalContent>
      {renderModalForm({ onModalSubmit, buttonLabel, initialValues: { agreeToTerms: false } })}
    </StandardModal>
  );
};

const renderModal = (t, { modalOpen, paymentType, onModalClose, ...props }) =>
  modalOpen && (
    <StandardModal open={modalOpen} onClose={onModalClose}>
      {renderModalContent(t, { paymentType, ...props })}
    </StandardModal>
  );

const renderConfirmation = (t, { isOnRequest, paymentType, reservationId }) => {
  const paymentTypes = {
    [PaymentType.CC]: {
      title: t('labels.payByCCConfirmed'),
      content: t('content.payByCCConfirmed'),
    },
    [PaymentType.BT]: {
      title: t('labels.payByBTConfirmed'),
      content: t('content.payByBTConfirmed'),
    },
  };

  const title =
    (isOnRequest && t('labels.bookingConfirmedOnRequest')) ||
    (PAYMENT_ENABLED && !isOnRequest && path([paymentType, 'title'], paymentTypes)) ||
    t('labels.bookingConfirmed');
  const content =
    (isOnRequest && t('content.bookingConfirmed')) ||
    (PAYMENT_ENABLED && !isOnRequest && path([paymentType, 'content'], paymentTypes)) ||
    t('content.bookingConfirmed');

  return (
    <Confirmation>
      <BookingConfirmation title={title} bookingRef={reservationId}>
        <ConfirmationContent>{content}</ConfirmationContent>
      </BookingConfirmation>
    </Confirmation>
  );
};

export const HotelBookingContainer = ({
  booking,
  bookingStatus,
  canBook,
  canHold,
  completeAndHold,
  completeBooking,
  created,
  fetchHotel,
  holdOnly,
  hotelStatus,
  id,
  isComplete,
  isOnRequest,
  updateBooking,
  oldBooking,
  ...props
}) => {
  const { t } = useTranslation();
  const [
    [complete, setComplete],
    [view, setView],
    [paymentType, setPaymentType],
    [guestFormValues, setGuestFormValues],
  ] = useHotelBookingContainerState();
  const { modalOpen, onModalClose, onModalOpen } = useModalState(false);
  const loaded = useFetchData(hotelStatus, fetchHotel, [id]);

  // ref used to control guest form from anywhere
  const guestFormRef = useRef(undefined);

  const { isMobile } = useCurrentWidth();

  const isDetailsView = equals(ViewType.DETAILS, view);
  const isReviewView = equals(ViewType.REVIEW, view);
  const submitError = isError(bookingStatus);
  const reservationId = prop('reservationId', booking);

  const returnToHotelScreen = (holdOnly && !canHold) || (!canBook && !isComplete) || (isComplete && !reservationId);
  const sendToConfirmationScreen = !isComplete && !isNilOrEmpty(created);

  useEffectBoundary(() => {
    setComplete(false);
  }, [submitError]);

  useEffectBoundary(() => {
    onModalClose();
  }, [complete]);

  const onMobileNavClick = useCallback(() => setView(ViewType.DETAILS), [setView]);
  const onPaymentChange = useCallback((e, value) => setPaymentType(value), [setPaymentType]);
  const onGuestFormSubmit = useCallback(
    values => {
      setGuestFormValues(values);
      updateBooking(id, values);

      // When form is submitted and we aare only holding, trigger the redux action
      if (holdOnly)
        return completeAndHold(id, pick(['guestFirstName', 'guestLastName', 'guestTitle'], values), 'potential', true);

      isMobile && isDetailsView ? setView(ViewType.REVIEW) : onModalOpen();
    },
    [completeAndHold, holdOnly, id, isDetailsView, isMobile, onModalOpen, setGuestFormValues, setView, updateBooking]
  );
  const onSubmit = useCallback(() => prop('current', guestFormRef) && guestFormRef.current.submitForm(), []);
  const onModalSubmit = useCallback(
    values => {
      completeBooking(id, values, undefined, canHold);
      setComplete(true);
    },
    [canHold, completeBooking, id, setComplete]
  );

  if (!isComplete && complete && isSending(bookingStatus))
    return <Loader isLoading={true} text={t('messages.submittingBooking')} />;

  if (sendToConfirmationScreen)
    return holdOnly ? (
      <Redirect to={`/bookings/${created}/hold`} />
    ) : isOnRequest ? (
      <Redirect to={`/bookings/${created}/on-request`} />
    ) : (
      <Redirect to={`/bookings/${created}/complete`} />
    );
  if (returnToHotelScreen) return <Redirect to={`/hotels/${id}`} />;

  return (
    <Loader isLoading={!loaded} text={t('messages.preparingBooking')}>
      <StyledHotelContainer>
        {renderBreadcrumbs(t, {
          isMobile,
          isDetailsView,
          isReviewView,
          onMobileNavClick,
          id,
          canBook,
          isComplete,
          isOnRequest,
          ...props,
        })}
        <Main>
          {isComplete
            ? renderConfirmation(t, { reservationId, paymentType, ...props })
            : renderGuestForm(t, {
                guestFormRef,
                holdOnly,
                guestFormValues,
                isDetailsView,
                isReviewView,
                isMobile,
                onGuestFormSubmit,
                onSubmit,
                isOnRequest,
                ...props,
              })}
          <Aside>
            {renderSummary(t, {
              canBook,
              id,
              isComplete,
              isReviewView,
              isMobile,
              onPaymentChange,
              onSubmit,
              paymentType,
              isOnRequest,
              holdOnly,
              oldBooking,
              ...props,
            })}
          </Aside>
        </Main>
      </StyledHotelContainer>
      {renderModal(t, { modalOpen, onModalSubmit, onModalClose, paymentType, canBook, isComplete, ...props })}
    </Loader>
  );
};

HotelBookingContainer.propTypes = propTypes;
HotelBookingContainer.defaultProps = defaultProps;

export default compose(connect)(HotelBookingContainer);
