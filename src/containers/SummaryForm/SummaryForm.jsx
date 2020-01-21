import React, { useState, Fragment } from 'react';
import { compose, head, pathOr, pipe, propOr } from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { useTranslation } from 'react-i18next';
import { Form, Input, Loader, List } from '@pure-escapes/webapp-ui-components';

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
import { Error, HotelName, StyledSummary, SummaryFormActions, SummaryFormButton } from './SummaryForm.styles';
import { PrimaryButton } from 'pureUi/Buttons';
import { makeBackendApi } from 'services/BackendApi';
import { getBookingsEndpointAttributesForBookingDomain } from 'utils/bookingBuilder';

import { TableCardBox, TableCardRow } from '../../pureUi/TableCard';

const getSingleValue = (type, data) =>
  pipe(
    pathOr([''], ['request', type]),
    head,
    propOr('', 'uuid')
  )(data);

// exported as its used in src/containers/SummaryFormExtras/SummaryFormExtras.jsx as well
export const renderHotel = (t, { name }) => {
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
  const { backendApi, bookingDomain, canBook, t } = props;

  const [hasClicked, setHasClicked] = useState(false);
  return (
    <PrimaryButton
      className="mt-4"
      type="button"
      disabled={!canBook || hasClicked}
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
    </PrimaryButton>
  );
};

const SaveBookingAndTakeHoldsButton = props => {
  const { backendApi, bookingDomain, canBook, canHold, t } = props;

  const [hasClicked, setHasClicked] = useState(false);
  return (
    <SummaryFormButton
      type="button"
      data-secondary
      disabled={!canBook || !canHold || hasClicked}
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
    </SummaryFormButton>
  );
};

const renderForm = (
  t,
  {
    booking,
    bookLabel,
    canBook,
    canEdit,
    compact,
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
  }
) => {
  return (
    <Form initialValues={initialValues} enableReinitialize={true}>
      {({ values }) => (
        <Fragment>
          <Input type="hidden" value={canBook} name="valid" />
          <SummaryFormExtras compact={compact} id={id} summaryOnly={summaryOnly} values={values} booking={booking} />
          {renderSummaryErrors(errors)}
          {!isNilOrEmpty(booking) && (
            <div>
              <p>{t('labels.availability')}</p>
              <p>{t(canHold ? 'labels.availableToHoldInfo' : 'labels.unavailableToHoldInfo')}</p>
            </div>
          )}
          <div>
            <button type="button" disabled={!canBook} onClick={handleAddToProposalClick}>
              {t('buttons.addToProposal')}
            </button>
          </div>
          <SummaryFormActions>
            <SaveBookingAndTakeHoldsButton
              t={t}
              canBook={canBook}
              canHold={canHold}
              backendApi={backendApi}
              bookingDomain={bookingDomain}
            />

            {/* this if logic is insane, but i dont dare touch it */}
            {((!summaryOnly && canEdit) || (showHolds && !holdOnly)) && showBookNow && (
              <SummaryFormButton disabled={!(showHolds || canBook)} type="submit">
                {bookLabel || (isOnRequest ? t('buttons.bookOnRequest') : t('buttons.bookNow'))}
              </SummaryFormButton>
            )}
          </SummaryFormActions>
          <SaveBookingButton t={t} canBook={canBook} backendApi={backendApi} bookingDomain={bookingDomain} />
        </Fragment>
      )}
    </Form>
  );
};

export const SummaryForm = props => {
  const { t } = useTranslation();

  const { booking, className, compact, guardEdit, hotelName, id, actingCountryCode } = props;

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

  const isLoading = isActive(status);

  return (
    <StyledSummary className={className} data-compact={compact}>
      <Loader isLoading={isLoading} showPrev={true} text="Updating...">
        {renderHotel(t, {
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

export default compose(connect)(SummaryForm);
