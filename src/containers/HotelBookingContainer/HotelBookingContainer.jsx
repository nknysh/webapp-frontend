import React, { useRef, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { equals, compose, prop, path } from 'ramda';
import { useTranslation } from 'react-i18next';

import { Loader, RadioButton, AgreeToForm, BookingConfirmation } from 'components';
import { useFetchData, useCurrentWidth, useEffectBoundary } from 'effects';
import { isMobile } from 'utils';

import { PAYMENT_ENABLED } from 'config';

import { isError, isSending } from 'store/common';

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
  ModalBody,
  ModalContent,
  ModalTitle,
  PaymentMethod,
  StyledBreadcrumbs,
  StyledHotelContainer,
  StyledModal,
  StyledSummary,
  SubmitButton,
  Total,
} from './HotelBookingContainer.styles';
import { PaymentType, ViewType } from './HotelBookingContainer.types';

const renderBackButton = t => <Back to="/search">{t('labels.backToSearch')}</Back>;

const renderBreadcrumbs = (t, { isComplete, mobileView, isDetailsView, isReviewView, onMobileNavClick, hotel, id }) => (
  <Fragment>
    {mobileView && renderBackButton(t)}
    {!isComplete &&
      (mobileView ? (
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

const renderSubmitButton = (t, { mobileView, isReviewView, canBook, onSubmit, isOnRequest }) => (
  <SubmitButton
    disabled={mobileView ? isReviewView && !canBook : !canBook}
    type="button"
    onClick={onSubmit}
    onTouchMove={onSubmit}
  >
    {PAYMENT_ENABLED && !isOnRequest && t('buttons.bookAndPay')}
    {!PAYMENT_ENABLED && !isOnRequest && t('buttons.bookNow')}
    {isOnRequest && t('buttons.bookOnRequest')}
  </SubmitButton>
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
    mobileView,
    onGuestFormSubmit,
    onSubmit,
  }
) => (
  <FormWrapper data-hidden={mobileView && !isDetailsView}>
    <BookingForm ref={guestFormRef} onSubmit={onGuestFormSubmit} initialValues={guestFormValues}>
      {mobileView && renderSubmitButton(t, { mobileView, isReviewView, canBook, onSubmit, isOnRequest })}
    </BookingForm>
  </FormWrapper>
);

const renderPaymentTypes = (t, { isOnRequest, onPaymentChange, paymentType }) =>
  PAYMENT_ENABLED &&
  (!isOnRequest && (
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
  ));

const renderSummary = (
  t,
  { mobileView, isReviewView, id, isComplete, onSubmit, canBook, isOnRequest, paymentType, onPaymentChange }
) =>
  (!mobileView || isReviewView) && (
    <StyledSummary hotelUuid={id} summaryOnly={true}>
      {!isComplete && (
        <Fragment>
          {renderPaymentTypes(t, { isOnRequest, onPaymentChange, paymentType })}
          {renderSubmitButton(t, { isReviewView, canBook, onSubmit, mobileView, isOnRequest })}
        </Fragment>
      )}
    </StyledSummary>
  );

// eslint-disable-next-line
const renderModalSubmitButton = label => () => <SubmitButton type="submit">{label}</SubmitButton>;

const renderModalForm = ({ onModalSubmit, buttonLabel, initialValues }) => (
  <AgreeToForm
    renderSubmitButton={renderModalSubmitButton(buttonLabel)}
    onSubmit={onModalSubmit}
    initialValues={initialValues}
  />
);

const renderModalContent = (t, { isOnRequest, paymentType, onModalSubmit, total }) => {
  const finalizeAndPay = (
    <Fragment>
      {t('buttons.finalizeAndPay')} | <Total>{total}</Total>
    </Fragment>
  );

  const paymentTypes = {
    [PaymentType.CC]: {
      title: t('labels.payByCC'),
      content: t('content.payByCC'),
      buttonLabel: finalizeAndPay,
    },
    [PaymentType.BT]: {
      title: t('labels.payByBT'),
      content: t('content.payByBT'),
      buttonLabel: finalizeAndPay,
    },
  };

  const title =
    (isOnRequest && t('labels.bookingConfirmOnRequest')) ||
    (PAYMENT_ENABLED && !isOnRequest && path([paymentType, 'title'], paymentTypes)) ||
    t('labels.bookingConfirm');
  const content =
    (isOnRequest && t('content.bookingConfirmOnRequest')) ||
    (PAYMENT_ENABLED && !isOnRequest && path([paymentType, 'content'], paymentTypes)) ||
    t('content.bookingConfirm');
  const buttonLabel =
    (isOnRequest && t('buttons.submitBookingRequest')) ||
    (PAYMENT_ENABLED && !isOnRequest && path([paymentType, 'buttonLabel'], paymentTypes)) ||
    t('buttons.submitBookingRequest');

  return (
    <ModalBody>
      <ModalTitle>{title}</ModalTitle>

      <ModalContent>{content}</ModalContent>
      {renderModalForm({ onModalSubmit, buttonLabel, initialValues: { agreeToTerms: false } })}
    </ModalBody>
  );
};

const renderModal = (t, { modalOpen, paymentType, onModalClose, ...props }) =>
  modalOpen && (
    <StyledModal open={modalOpen} onClose={onModalClose}>
      {renderModalContent(t, { paymentType, ...props })}
    </StyledModal>
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
  canBook,
  bookingStatus,
  isComplete,
  booking,
  updateBooking,
  hotelStatus,
  fetchHotel,
  completeBooking,
  id,
  ...props
}) => {
  const { t } = useTranslation();
  const [
    [complete, setComplete],
    [view, setView],
    [paymentType, setPaymentType],
    [modalOpen, setModalOpen],
    [guestFormValues, setGuestFormValues],
  ] = useHotelBookingContainerState();
  const loaded = useFetchData(hotelStatus, fetchHotel, [id]);
  const guestFormRef = useRef(undefined);
  const currentWidth = useCurrentWidth();

  const isDetailsView = equals(ViewType.DETAILS, view);
  const isReviewView = equals(ViewType.REVIEW, view);
  const mobileView = isMobile(currentWidth);
  const submitError = isError(bookingStatus);
  const reservationId = prop('reservationId', booking);

  const returnToHotelScreen = (!canBook && !isComplete) || (isComplete && !reservationId);
  const sendToConfirmationScreen = !isComplete && reservationId;

  useEffectBoundary(() => {
    setComplete(false);
  }, [submitError]);
  useEffectBoundary(() => {
    setModalOpen(false);
  }, [complete]);

  if (!isComplete && complete && isSending(bookingStatus))
    return <Loader isLoading={true} text={t('messages.submittingBooking')} />;

  if (returnToHotelScreen) return <Redirect to={`/hotels/${id}`} />;
  if (sendToConfirmationScreen) return <Redirect to={`/hotels/${id}/booking/complete`} />;

  const onMobileNavClick = () => setView(ViewType.DETAILS);
  const onPaymentChange = (e, value) => setPaymentType(value);
  const onGuestFormSubmit = values => {
    setGuestFormValues(values);
    updateBooking(id, values);

    mobileView && isDetailsView ? setView(ViewType.REVIEW) : setModalOpen(true);
  };
  const onSubmit = () => prop('current', guestFormRef) && guestFormRef.current.submitForm();
  const onModalClose = () => setModalOpen(false);
  const onModalSubmit = values => {
    completeBooking(id, values);
    setComplete(true);
  };

  return (
    <Loader isLoading={!loaded} text={t('messages.preparingBooking')}>
      <StyledHotelContainer>
        {renderBreadcrumbs(t, {
          mobileView,
          isDetailsView,
          isReviewView,
          onMobileNavClick,
          id,
          canBook,
          isComplete,
          ...props,
        })}
        <Main>
          {isComplete
            ? renderConfirmation(t, { reservationId, paymentType, ...props })
            : renderGuestForm(t, {
                guestFormRef,
                guestFormValues,
                isDetailsView,
                isReviewView,
                mobileView,
                onGuestFormSubmit,
                onSubmit,
                ...props,
              })}
          <Aside>
            {renderSummary(t, {
              canBook,
              id,
              isComplete,
              isReviewView,
              mobileView,
              onPaymentChange,
              onSubmit,
              paymentType,
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
