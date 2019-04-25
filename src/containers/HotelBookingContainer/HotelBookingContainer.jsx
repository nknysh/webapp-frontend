import React, { useRef, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { equals, compose, prop, path, pathOr } from 'ramda';

import { Loader, RadioButton, BankTransferForm, BookingConfirmation } from 'components';
import { BookingContainer } from 'containers';
import { useFetchData, useCurrentWidth, useEffectBoundary } from 'effects';
import { isMobile, noop } from 'utils';

import { data as bookingFormData } from 'config/forms/bookingForm';

import uiConfig from 'config/ui';

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
  Main,
  ModalTitle,
  PaymentMethod,
  StyledBreadcrumbs,
  StyledHotelContainer,
  StyledModal,
  StyledSummary,
  SubmitButton,
  Total,
  FormWrapper,
  Confirmation,
  ConfirmationContent,
} from './HotelBookingContainer.styles';
import { PaymentType, ViewType } from './HotelBookingContainer.types';

const confirmationContent = {
  [PaymentType.CC]: {
    title: path(['titles', 'complete'], bookingFormData),
    content: path(['content', 'complete'], bookingFormData),
  },
  [PaymentType.BT]: {
    title: path(['titles', 'completeBT'], bookingFormData),
    content: path(['content', 'completeBT'], bookingFormData),
  },
};

const renderBackButton = () => <Back to="/search">{path(['labels', 'backToSearch'], uiConfig)}</Back>;

export const HotelBookingContainer = ({
  booking,
  bookingStatus,
  canBook,
  completeBooking,
  fetchHotel,
  hotel,
  hotelStatus,
  id,
  isComplete,
  total,
  updateBooking,
}) => {
  const [
    [complete, setComplete],
    [view, setView],
    [paymentType, setPaymentType],
    [modalOpen, setModalOpen],
    [guestFormValues, setGuestFormValues],
    [bankTransferFormValues, setBankTransferFormValues],
  ] = useHotelBookingContainerState();

  const guestFormRef = useRef(undefined);
  const bankTransferFormRef = useRef(undefined);

  const loaded = useFetchData(hotelStatus, fetchHotel, id);
  const currentWidth = useCurrentWidth();

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
    return <Loader isLoading={true} text={path(['messages', 'submittingBooking'], uiConfig)} />;

  if (returnToHotelScreen) return <Redirect to={`/hotels/${id}`} />;
  if (sendToConfirmationScreen) return <Redirect to={`/hotels/${id}/booking/complete`} />;

  const isDetailsView = equals(ViewType.DETAILS, view);
  const isReviewView = equals(ViewType.REVIEW, view);
  const mobileView = isMobile(currentWidth);

  const onSubmitClick = () => guestFormRef && guestFormRef.current && guestFormRef.current.submitForm();
  const onBtFinalClick = () =>
    bankTransferFormRef && bankTransferFormRef.current && bankTransferFormRef.current.submitForm();
  const onMobileNavClick = () => setView(ViewType.DETAILS);
  const onPaymentChange = (e, value) => setPaymentType(value);
  const onModalClose = () => setModalOpen(false);

  const onSubmit = values => {
    setGuestFormValues(values);
    updateBooking(id, values);

    if (mobileView && isDetailsView) {
      return setView(ViewType.REVIEW);
    }

    return setModalOpen(true);
  };

  const onCCSubmit = () => {
    completeBooking(id, { payment: { type: paymentType } });
    setComplete(true);
  };

  const onBankTransferSubmit = values => {
    setBankTransferFormValues(values);
    completeBooking(id, { payment: { type: paymentType, ...values } });
    setComplete(true);
  };

  const renderBreadcrumbs = () =>
    mobileView ? (
      <BookingPath>
        <BookingPathSegment onClick={onMobileNavClick} data-active={isDetailsView}>
          {path(['labels', 'enterGuestDetails'], uiConfig)}
        </BookingPathSegment>
        <Chevron>chevron_right</Chevron>
        <BookingPathSegment data-active={isReviewView}>
          {path(['labels', 'reviewAndConfirm'], uiConfig)}
        </BookingPathSegment>
      </BookingPath>
    ) : (
      <StyledBreadcrumbs
        links={[
          { label: renderBackButton() },
          { label: prop('name', hotel), to: `/hotels/${id}` },
          { label: path(['labels', 'enterGuestDetails'], uiConfig), to: `/hotels/${id}/booking` },
        ]}
      />
    );

  const renderPaymentTypes = () => (
    <PaymentMethod>
      <RadioButton
        value={paymentType}
        onChange={onPaymentChange}
        options={[
          { label: path(['labels', 'payByCC'], uiConfig), value: PaymentType.CC },
          { label: path(['labels', 'payByBT'], uiConfig), value: PaymentType.BT },
        ]}
      />
    </PaymentMethod>
  );

  const renderSubmitButton = () => (
    <SubmitButton
      disabled={mobileView ? isReviewView && !canBook : !canBook}
      type="button"
      onClick={onSubmitClick}
      onTouchMove={onSubmitClick}
    >
      {path(['buttons', 'bookAndPay'], uiConfig)}
    </SubmitButton>
  );

  const renderFinalizeButton = handler => (
    <SubmitButton type="button" onClick={handler} onTouchMove={handler}>
      {path(['buttons', 'finalizeAndPay'], uiConfig)} | <Total>{total}</Total>
    </SubmitButton>
  );

  const renderBankTransferSubmitButton = () => renderFinalizeButton(onBtFinalClick);

  const renderSummary = () => (
    <Aside>
      <BookingContainer Component={StyledSummary} hotelUuid={id} summaryOnly={true}>
        {!isComplete && (
          <Fragment>
            {renderPaymentTypes()}
            {renderSubmitButton()}
          </Fragment>
        )}
      </BookingContainer>
    </Aside>
  );

  const renderForm = () => (
    <FormWrapper data-hidden={mobileView && !isDetailsView}>
      <BookingForm
        ref={guestFormRef}
        onSubmit={onSubmit}
        initialValues={guestFormValues}
        showSubmit={mobileView}
        renderSubmitButton={renderSubmitButton}
      />
    </FormWrapper>
  );

  const renderConfirmation = () => (
    <Confirmation>
      <BookingConfirmation title={path([paymentType, 'title'], confirmationContent)} bookingRef={reservationId}>
        <ConfirmationContent>{path([paymentType, 'content'], confirmationContent)}</ConfirmationContent>
      </BookingConfirmation>
    </Confirmation>
  );

  const renderCCPayment = () => renderFinalizeButton(onCCSubmit);

  const renderBTPayment = () => (
    <BankTransferForm
      ref={bankTransferFormRef}
      initialValues={bankTransferFormValues}
      showSubmit={true}
      renderSubmitButton={renderBankTransferSubmitButton}
      onSubmit={onBankTransferSubmit}
    />
  );

  const modalContent = {
    [PaymentType.CC]: {
      title: path(['labels', 'payByCC'], uiConfig),
      render: renderCCPayment,
    },
    [PaymentType.BT]: {
      title: path(['labels', 'payByBT'], uiConfig),
      render: renderBTPayment,
    },
  };

  const renderModal = () =>
    modalOpen && (
      <StyledModal open={modalOpen} onClose={onModalClose} modalContentProps={{ className: 'pay-by' }}>
        <ModalTitle>{path([paymentType, 'title'], modalContent)}</ModalTitle>
        {pathOr(noop, [paymentType, 'render'], modalContent)()}
      </StyledModal>
    );

  return (
    <Loader isLoading={!loaded} text={path(['messages', 'preparingBooking'], uiConfig)}>
      <StyledHotelContainer>
        {mobileView && renderBackButton()}
        {!isComplete && renderBreadcrumbs()}
        <Main>
          {!isComplete ? renderForm() : renderConfirmation()}
          {(!mobileView || isReviewView) && renderSummary()}
        </Main>
        {!isComplete && renderModal()}
      </StyledHotelContainer>
    </Loader>
  );
};

HotelBookingContainer.propTypes = propTypes;
HotelBookingContainer.defaultProps = defaultProps;

export default compose(connect)(HotelBookingContainer);
