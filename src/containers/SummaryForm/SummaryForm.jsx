import React, { useState, Fragment } from 'react';
import { compose, head, pathOr, pipe, propOr } from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { useTranslation } from 'react-i18next';
import { Form, Input, Loader, List } from '@pure-escapes/webapp-ui-components';
import styled from 'styled-components';

import LodgingSummary from 'containers/LodgingSummary';
import SummaryFormExtras from 'containers/SummaryFormExtras';

import { useEffectBoundary } from 'effects';
import {
  mapWithIndex,
  getTitleForAccommodationUuid,
  getNightsBreakdownForDates,
  getOccupancyBreakdownForAccommodation,
  getMealPlanBreakdownForLodging,
  getOccassionsBreakdownForLodging,
} from 'utils';

import { isActive } from 'store/common';

import { ProductTypes } from 'config/enums';

import connect from './SummaryForm.state';
import { propTypes, defaultProps } from './SummaryForm.props';
import {
  Error,
  Hotel,
  HotelName,
  StyledModal,
  StyledSummary,
  SummaryFormActions,
  SummaryFormButton,
  Total,
  EditGuard,
  ModalContent,
  ModalTitle,
  HotelTotals,
} from './SummaryForm.styles';
import { formatPrice } from '../../utils';
import { PrimaryButton } from 'pureUi/Buttons';
import { makeBackendApi } from 'services/BackendApi';
import { getBookingsEndpointAttributesForBookingDomain } from 'utils/bookingBuilder';

import { TableCardBox, TableCardRow } from 'pureUi/TableCard';

const getSingleValue = (type, data) =>
  pipe(
    pathOr([''], ['request', type]),
    head,
    propOr('', 'uuid')
  )(data);

// exported as its used in src/containers/SummaryFormExtras/SummaryFormExtras.jsx as well
export const renderHotelName = (t, { name }) => {
  return (
    <TableCardBox>
      <TableCardRow depth={1}>
        <HotelName>{name}</HotelName>
      </TableCardRow>
    </TableCardBox>
  );
};

const renderError = ({ message }, i) => <Error key={i}>{message}</Error>;
const renderSummaryErrors = errors => !isNilOrEmpty(errors) && <List>{mapWithIndex(renderError, errors)}</List>;

const renderLodgingSummary = (lodging, availableProductSets, potentialBooking, textOnlyOffersPerLodging) => {
  return (
    <LodgingSummary
      hotelUuid={lodging.hotelUuid}
      key={lodging.index}
      lodging={lodging}
      availableProductSets={availableProductSets}
      potentialBooking={potentialBooking}
      textOnlyOffersPerLodging={textOnlyOffersPerLodging}
    />
  );
};

const renderLodgingSummaries = (t, booking) => {
  if (!booking) {
    return null;
  }
  const { request: bookingRequest, response: bookingResponse } = booking;

  if (!bookingRequest || !bookingResponse) {
    return [];
  }

  const lodgingSummaries = bookingRequest.Accommodation.map((requestedAccommodation, index) => {
    return {
      ...requestedAccommodation,
      index,
      hotelUuid: bookingRequest.hotelUuid,
      title: getTitleForAccommodationUuid(requestedAccommodation.uuid, bookingResponse.availableProductSets),
      nightsBreakdown: getNightsBreakdownForDates(requestedAccommodation.startDate, requestedAccommodation.endDate, t),
      mealPlanBreakdown: getMealPlanBreakdownForLodging(
        requestedAccommodation,
        index,
        bookingResponse.availableProductSets
      ),
      occupancyBreakdown: getOccupancyBreakdownForAccommodation(requestedAccommodation),
      occasionsBreakdown: getOccassionsBreakdownForLodging(requestedAccommodation),
    };
  });

  if (lodgingSummaries.length <= 0) {
    return null;
  }

  return (
    <TableCardBox>
      {lodgingSummaries.map(lodging =>
        renderLodgingSummary(
          lodging,
          bookingResponse.availableProductSets,
          bookingResponse.potentialBooking,
          bookingResponse.textOnlyOffersPerLodging
        )
      )}
    </TableCardBox>
  );
};

const handleSaveBookingButton = async props => {
  const { bookingDomain, backendApi } = props;

  const attr = getBookingsEndpointAttributesForBookingDomain({ bookingDomain });

  try {
    const res = await backendApi.postBookingSave(attr);
    const newBookingUuid = res.data.data.uuid;

    window.location.href = `/bookings/${newBookingUuid}`;
  } catch (e) {
    throw Error(e);
  }
};

const handleSaveBookingAndTakeHoldsButton = async props => {
  const { bookingDomain, backendApi } = props;

  const attr = getBookingsEndpointAttributesForBookingDomain({ bookingDomain });

  try {
    const res = await backendApi.postBookingSaveAndTakeHolds(attr);
    const newBookingUuid = res.data.data.uuid;

    window.location.href = `/bookings/${newBookingUuid}`;
  } catch (e) {
    throw Error(e);
  }
};

const SaveBookingButton = props => {
  const { backendApi, bookingDomain, canBook, t, forceDisabled } = props;

  const [hasClicked, setHasClicked] = useState(false);
  return (
    <SummaryFormSecondaryButton
      className="save-booking-button"
      type="button"
      disabled={!canBook || hasClicked || forceDisabled}
      onClick={() => {
        setHasClicked(true);
        try {
          handleSaveBookingButton({ backendApi, bookingDomain });
        } catch (e) {
          setHasClicked(false);
        }
      }}
    >
      {t('buttons.saveBooking')}
    </SummaryFormSecondaryButton>
  );
};

const RequestToBookButton = ({ t, showHolds, canBook, bookLabel, isOnRequest, forceDisabled }) => {
  // logic taken from previous declaration and reworked into its own component

  return (
    <SummaryFormPrimaryButton
      className="request-to-book-button"
      disabled={!(showHolds || canBook) || forceDisabled}
      type="submit"
    >
      {bookLabel || (isOnRequest ? t('buttons.bookOnRequest') : t('buttons.bookNow'))}
    </SummaryFormPrimaryButton>
  );
};

const SaveBookingAndTakeHoldsButton = props => {
  const { backendApi, bookingDomain, canBook, canHold, t, forceDisabled } = props;

  const [hasClicked, setHasClicked] = useState(false);
  return (
    <SummaryFormSecondaryButton
      className="save-booking-and-take-hold-button"
      type="button"
      data-secondary
      disabled={!canBook || !canHold || hasClicked || forceDisabled}
      onClick={() => {
        setHasClicked(true);
        try {
          handleSaveBookingAndTakeHoldsButton({ backendApi, bookingDomain });
        } catch (e) {
          setHasClicked(false);
        }
      }}
    >
      {t('buttons.takeAHold')}
    </SummaryFormSecondaryButton>
  );
};

const renderForm = (
  t,
  {
    booking,
    bookLabel,
    canBook,
    errors,
    holdOnly,
    id,
    initialValues,
    isOnRequest,
    showBookNow,
    showHolds,
    summaryOnly,
    backendApi,
    bookingDomain,
    canHold,
    handleAddToProposalClick,
    onSubmit,
    travelAgentUserUuid,
    isSr,
  }
) => {
  return (
    <Form initialValues={initialValues} onSubmit={onSubmit} enableReinitialize={true}>
      {({ values }) => (
        <Fragment>
          <Input type="hidden" value={canBook} name="valid" />
          <SummaryFormExtras id={id} summaryOnly={summaryOnly} values={values} booking={booking} />
          {renderSummaryErrors(errors)}
          {!isNilOrEmpty(booking?.request?.Accommodation) && (
            <TableCardBox className="mt-4 mb-4">
              <TableCardRow depth={3}>
                <Title>{t('labels.availability')}</Title>
                <Text>{t(canHold ? 'labels.availableToHoldInfo' : 'labels.unavailableToHoldInfo')}</Text>
              </TableCardRow>
            </TableCardBox>
          )}

          <div className="summary-form-buttons">
            <div className="flex">
              <SaveBookingAndTakeHoldsButton
                className="save-booking-and-take-holds-button"
                t={t}
                canBook={canBook}
                canHold={canHold}
                backendApi={backendApi}
                bookingDomain={bookingDomain}
                forceDisabled={isSr && !travelAgentUserUuid}
              />

              <SaveBookingButton
                t={t}
                canBook={canBook}
                backendApi={backendApi}
                bookingDomain={bookingDomain}
                forceDisabled={isSr && !travelAgentUserUuid}
              />
            </div>

            <div className="flex">
              <SummaryFormPrimaryButton
                className="add-to-proposal-button"
                type="button"
                disabled={!canBook || (isSr && !travelAgentUserUuid)}
                onClick={handleAddToProposalClick}
              >
                {t('buttons.addToProposal')}
              </SummaryFormPrimaryButton>
              <RequestToBookButton
                t={t}
                showHolds={showHolds}
                holdOnly={holdOnly}
                showBookNow={showBookNow}
                canBook={canBook}
                bookLabel={bookLabel}
                isOnRequest={isOnRequest}
                forceDisabled={isSr && !travelAgentUserUuid}
              />
            </div>
          </div>
        </Fragment>
      )}
    </Form>
  );
};

export const SummaryForm = props => {
  const { t } = useTranslation();

  const { booking, className, compact, hotelName, actingCountryCode } = props;

  const backendApi = makeBackendApi(actingCountryCode);

  const initialValues = {
    [ProductTypes.TRANSFER]: getSingleValue(ProductTypes.TRANSFER, booking),
    [ProductTypes.GROUND_SERVICE]: getSingleValue(ProductTypes.GROUND_SERVICE, booking),
    ...pathOr({}, ['products', ProductTypes.FINE], booking),
    ...pathOr({}, ['products', ProductTypes.SUPPLEMENT], booking),
  };

  const [formValues, setFormValues] = useState(initialValues);

  useEffectBoundary(() => {
    setFormValues(initialValues);
  }, [booking]);

  // TODO this `isLoading` was based on checking a `status`, which didn't exist
  // not sure how long this has been broken, but its effectively been false for some time
  // Setting to a hard `false` now until we have time to investigate
  const isLoading = false;

  return (
    <StyledSummary className={className} data-compact={compact}>
      <Loader isLoading={isLoading} showPrev={true} text="Updating...">
        {renderHotelName(t, {
          name: hotelName || booking?.response?.hotel?.name || 'Hotel',
          overrideTotal: booking?.response?.totals?.total || '0.00',
          ...props,
        })}

        {renderLodgingSummaries(t, booking)}

        {renderForm(t, {
          initialValues: formValues,
          backendApi,
          ...props,
        })}
      </Loader>
    </StyledSummary>
  );
};

SummaryForm.propTypes = propTypes;
SummaryForm.defaultProps = defaultProps;

const ConnectedSummaryForm = compose(connect)(SummaryForm);

export default styled(ConnectedSummaryForm)`
  .save-booking-and-take-hold-button {
    margin-bottom: 4px;
    margin-right: 4px;
  }
  .save-booking-button {
    margin-bottom: 4px;
    margin-left: 4px;
  }
  .add-to-proposal-button {
    margin-top: 4px;
    margin-right: 4px;
  }
  .request-to-book-button {
    margin-top: 4px;
    margin-left: 4px;
  }
`;
