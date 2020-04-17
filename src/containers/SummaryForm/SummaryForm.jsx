import React, { useState, Fragment, useCallback, useMemo } from 'react';
import { compose, head, pathOr, pipe, propOr, values } from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { useTranslation } from 'react-i18next';
import { Form, Input, Loader, List } from '@pure-escapes/webapp-ui-components';
import styled from 'styled-components';

import LodgingSummary from 'containers/LodgingSummary';
import SummaryFormExtras from 'containers/SummaryFormExtras/SummaryFormExtras';

import { useEffectBoundary } from 'effects';
import {
  mapWithIndex,
  getTitleForAccommodationUuid,
  getNightsBreakdownForDates,
  getOccupancyBreakdownForAccommodation,
  getMealPlanBreakdownForLodging,
  getOccassionsBreakdownForLodging,
} from 'utils';

import { ProductTypes, BookingStatusTypes } from 'config/enums';
import { BOOKING_TERMS_URL } from 'config';

import connect from './SummaryForm.state';
import { propTypes, defaultProps } from './SummaryForm.props';
import { Error, HotelName, StyledSummary, Title, Text } from './SummaryForm.styles';
import { PrimaryButtonTall, PrimaryButtonTallAltColor } from 'pureUi/Buttons';
import Label from 'pureUi/Label';
import Checkbox from 'pureUi/Checkbox';
import { makeBackendApi } from 'services/BackendApi';
import { getBookingsEndpointAttributesForBookingDomain } from 'utils/bookingBuilder';

import { TableCardBox, TableCardRow } from 'pureUi/TableCard';

const getSingleValue = (type, data) => pipe(pathOr([''], ['request', type]), head, propOr('', 'uuid'))(data);

export const renderHotelName = ({ name }) => {
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

const handleRequestBookingButton = async props => {
  const { bookingDomain, backendApi, canHold } = props;

  const attr = getBookingsEndpointAttributesForBookingDomain({
    bookingDomain,
    bookingStatus: BookingStatusTypes.REQUESTED,
    placeHolds: canHold
  });

  try {
    const res = await backendApi.postBookingSave(attr);
    const newBookingUuid = res.data.data.uuid;

    window.location.href = `/bookings/${newBookingUuid}`;
  } catch (e) {
    throw Error(e);
  }
};

const SaveBookingButton = props => {
  const { backendApi, bookingDomain, canBook, t, actionGuard } = props;

  const [hasClicked, setHasClicked] = useState(false);
  return (
    <PrimaryButtonTallAltColor
      className="save-booking-button"
      type="button"
      disabled={!canBook || hasClicked}
      onClick={actionGuard(() => {
        setHasClicked(true);
        try {
          handleSaveBookingButton({ backendApi, bookingDomain });
        } catch (e) {
          setHasClicked(false);
        }
      })}
    >
      {t('buttons.saveBooking')}
    </PrimaryButtonTallAltColor>
  );
};

const RequestToBookButton = ({ t, showHolds, canBook, bookLabel, isOnRequest, onClick }) => {
  // logic taken from previous declaration and reworked into its own component

  return (
    <PrimaryButtonTall
      className="request-to-book-button"
      disabled={!(showHolds || canBook)}
      onClick={onClick}
    >
      {bookLabel || (isOnRequest ? t('buttons.bookOnRequest') : t('buttons.bookNow'))}
    </PrimaryButtonTall>
  );
};

const SaveBookingAndTakeHoldsButton = props => {
  const { backendApi, bookingDomain, canBook, canHold, t, actionGuard } = props;

  const [hasClicked, setHasClicked] = useState(false);
  return (
    <PrimaryButtonTallAltColor
      className="save-booking-and-take-hold-button"
      type="button"
      data-secondary
      disabled={!canBook || !canHold || hasClicked}
      onClick={actionGuard(() => {
        setHasClicked(true);
        try {
          handleSaveBookingAndTakeHoldsButton({ backendApi, bookingDomain });
        } catch (e) {
          setHasClicked(false);
        }
      })}
    >
      {t('buttons.takeAHold')}
    </PrimaryButtonTallAltColor>
  );
};

const TermsAndConditions = ({ value, onChange, className, isValid }) => {
  const content = (
    <span>I agree to <a href={BOOKING_TERMS_URL} target="_blank">Terms and Conditions</a></span>
  );

  return (
    <Label className={className} text={content} inline reverse>
      <Checkbox className={isValid ? null : 'error'} checked={value} onChange={event => onChange(event.target.checked)} />
    </Label>
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
    agreeToTerms,
    updateAgreeToTermsAction,
    domainValidation,
    isPristine,
    setIsPristineAction
  }
) => {

  const isValid = values(domainValidation).every(arr => !arr?.length);
  const actionGuard = action => isValid ? action : () => setIsPristineAction(false);

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
                actionGuard={actionGuard}
              />

              <SaveBookingButton
                t={t}
                canBook={canBook}
                backendApi={backendApi}
                bookingDomain={bookingDomain}
                actionGuard={actionGuard}
              />
            </div>

            <div className="flex">
              <PrimaryButtonTall
                className="add-to-proposal-button"
                type="button"
                disabled={!canBook}
                onClick={actionGuard(handleAddToProposalClick)}
              >
                {t('buttons.addToProposal')}
              </PrimaryButtonTall>
              <RequestToBookButton
                t={t}
                showHolds={showHolds}
                holdOnly={holdOnly}
                showBookNow={showBookNow}
                canBook={canBook}
                canHold={canHold}
                bookLabel={bookLabel}
                isOnRequest={isOnRequest}
                onClick={actionGuard(() => handleRequestBookingButton({ backendApi, bookingDomain, canHold }))}
              />
            </div>
          </div>
          <TermsAndConditions
            className="agreeToTerms"
            value={agreeToTerms}
            onChange={updateAgreeToTermsAction}
            isValid={isPristine ? true : !domainValidation.agreeToTerms?.length}
          />
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
        {renderHotelName({
          name: hotelName || booking?.response?.hotel?.name || 'Hotel',
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
