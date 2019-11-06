import React, { useState, Fragment, useCallback, useRef } from 'react';
import {
  compose,
  equals,
  gt,
  head,
  last,
  length,
  map,
  partial,
  path,
  pipe,
  prepend,
  mergeDeepLeft,
  prop,
  propSatisfies,
} from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { isThisMonth } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { RadioButton, Form, Loader, Checkbox, ToolTip } from '@pure-escapes/webapp-ui-components';

import { ProductTypes } from 'config/enums';

import { isActive } from 'store/common';

import { OccasionsSelect } from 'components';
import { useEffectBoundary } from 'effects';
import {
  formatDate,
  getEndOfMonth,
  getStartOfMonth,
  groupErrorsByRoomIndex,
  mapWithIndex,
  toDate,
  formatPrice,
} from 'utils';

import { validation } from 'config/forms/roomEdit';

import LodgingSelect from 'components/LodgingSelect';

import connect from './SummaryRoomEdit.state';
import { propTypes, defaultProps } from './SummaryRoomEdit.props';
import {
  DatePrice,
  EditForm,
  EditFormSection,
  EditFormSectionTitle,
  EditFormTitle,
  MealPlanRate,
  MealPlanRatePrice,
  MealPlanRatePriceOffer,
  StyledDatePicker,
  AccommodationEditModalErrorsHeader,
  AccommodationEditModalErrorsError,
} from './SummaryRoomEdit.styles';
import {
  getMealPlan,
  getMonthToDisplay,
  getOptionsFromRates,
  getRepeatGuest,
  getSelectedOccasions,
  parseMealPlans,
  prepareDates,
} from './SummaryRoomEdit.utils';
import { isString } from 'util';

const renderDay = (t, rates, currencyCode, day) => {
  if (!day) {
    return;
  }
  const dayRate = prop(formatDate(day), rates);
  const safeDay = isString(day) ? new Date(day) : day;
  console.log('safeDay', safeDay);
  return (
    <span>
      <div>{formatDate(safeDay, 'd')}</div>
      {prop('price', dayRate) && (
        <DatePrice>
          {prop('isOnRequest', dayRate)
            ? t('labels.isOnRequest')
            : `${currencyCode}${formatPrice(prop('price', dayRate), 0)}`}
        </DatePrice>
      )}
    </span>
  );
};

const renderDatePicker = (
  t,
  {
    datePickerRef,
    dates,
    rates,
    disabled,
    firstDate,
    lastDate,
    onMonthChange,
    onDayPickerShow,
    values,
    onDatesChange,
    currencyCode,
  }
) => (
  <StyledDatePicker
    ref={datePickerRef}
    label={t('date_plural')}
    ranged={true}
    dayPickerProps={{
      month: getMonthToDisplay(dates),
      disabledDays: [
        ...disabled,
        {
          before: new Date(firstDate),
          after: new Date(lastDate),
        },
      ],
      renderDay: partial(renderDay, [t, rates, currencyCode]),
      onMonthChange,
    }}
    onDayPickerShow={onDayPickerShow}
    selectedValues={prop('dates', values)}
    onSelected={onDatesChange}
  />
);

const renderMealPlanOffer = (t, { offer }, i) => (
  <MealPlanRatePriceOffer key={i + prop('uuid', offer)} data-discount={true}>
    {t('offer')}: {prop('name', offer)}
  </MealPlanRatePriceOffer>
);

const wrapProductToolTip = (label, { meta }) =>
  propSatisfies(isNilOrEmpty, 'description', meta) ? (
    label
  ) : (
    <ToolTip helpText={true} label={label}>
      {prop('description', meta)}
    </ToolTip>
  );

const mapBreakdown = (
  t,
  { hasSplitRates, currencyCode },
  { title, dates, total, totalBeforeDiscount, offers, product },
  i
) => (
  <MealPlanRate key={i}>
    {wrapProductToolTip(title, product)} - (
    <MealPlanRatePrice data-discounted={!equals(total, totalBeforeDiscount)}>
      {`${currencyCode}${formatPrice(totalBeforeDiscount)}`}
    </MealPlanRatePrice>
    {!equals(total, totalBeforeDiscount) && (
      <Fragment>
        {' '}
        <MealPlanRatePrice data-discount={true}>{`${currencyCode}${formatPrice(total)}`}</MealPlanRatePrice>
      </Fragment>
    )}
    ){hasSplitRates && ` | ${head(dates)}${!equals(head(dates), last(dates)) ? ` - ${last(dates)}` : ''}`}
    {mapWithIndex(partial(renderMealPlanOffer, [t]), offers)}
  </MealPlanRate>
);

const mapMealPlans = (t, props, { breakdown = [], products = [] }) => {
  const hasSplitRates = gt(length(breakdown), 1);
  const productUuids = map(prop('uuid'), products);

  return {
    value: JSON.stringify(productUuids),
    label: mapWithIndex(partial(mapBreakdown, [t, { hasSplitRates, ...props }]), breakdown),
  };
};

const renderMealPlans = ({ mealPlanOptions, onMealPlanChange, values }) => (
  <RadioButton name="mealPlan" value={prop('mealPlan', values)} options={mealPlanOptions} onChange={onMealPlanChange} />
);

export const SummaryRoomEdit = ({
  canChangeDates,
  dates,
  errors,
  hotelUuid,
  id,
  mealPlans,
  onComplete,
  onDatesShow,
  rates,
  requestedRooms,
  roomId,
  rooms,
  status,
  updateBooking,
  updateAccommodationProductGuestAgeSets,
  updateRoom,
  currencyCode,
  accommodationEditModalErrors,
}) => {
  const { t } = useTranslation();

  const mealPlan = getMealPlan(requestedRooms);
  const selectedOccasions = getSelectedOccasions(requestedRooms);
  const repeatGuest = getRepeatGuest(requestedRooms);

  const datePickerRef = useRef();
  const [roomContext, setRoomContext] = useState(0);
  const [complete, setComplete] = useState(false);
  const [firstHit, setFirstHit] = useState(true);
  const [formValues, setFormValues] = useState({
    mealPlan,
    guestAges: map(prop('guestAges'), requestedRooms),
    dates: head(dates),
  });

  const isLoading = isActive(status);
  const totalRooms = length(requestedRooms);
  const bookingErrors = groupErrorsByRoomIndex(errors);
  const { firstDate, lastDate, disabled } = getOptionsFromRates(rates);
  const mealPlanOptions = pipe(
    map(partial(mapMealPlans, [t, { currencyCode }])),
    prepend({ label: 'None', value: '[]' })
  )(mealPlans[roomContext] || []);

  useEffectBoundary(() => {
    setFormValues(
      mergeDeepLeft({
        guestAges: map(prop('guestAges'), requestedRooms),
        mealPlan,
        dates: head(dates),
      })
    );
  }, [requestedRooms, mealPlan, dates]);

  useEffectBoundary(() => {
    const input = path(['current', 'input'], datePickerRef);

    if (firstHit) {
      setFirstHit(false);
      return;
    }
    input && input.focus();
  }, [rates]);

  useEffectBoundary(() => {
    roomContext > totalRooms - 1 && setRoomContext(totalRooms - 1);
  }, [totalRooms]);

  useEffectBoundary(() => {
    complete && onComplete();
  }, [complete]);

  const onMonthChange = useCallback(
    month => {
      onDatesShow(id, roomId, isThisMonth(month) ? formatDate(toDate()) : getStartOfMonth(month), getEndOfMonth(month));
      return month;
    },
    [id, roomId, onDatesShow]
  );

  const onDayPickerShow = useCallback(() => {
    if (!lastDate) {
      return;
    }
    return onDatesShow(id, roomId, firstDate, getEndOfMonth(lastDate));
  }, [onDatesShow, id, roomId, firstDate, lastDate]);

  const onDatesChange = useCallback(
    dates => {
      updateRoom(id, roomId, prepareDates(dates));
    },
    [id, roomId, updateRoom]
  );

  const onMealPlanChange = useCallback(
    (e, value) => {
      updateRoom(id, roomId, {
        subProducts: {
          [ProductTypes.MEAL_PLAN]: parseMealPlans(value),
        },
      });
    },
    [id, roomId, updateRoom]
  );

  const onOccasionsChange = useCallback(
    ({ occasions }) => {
      updateRoom(id, roomId, occasions);
    },
    [id, roomId, updateRoom]
  );

  const onRepeatGuestChange = useCallback(
    (e, checked) => {
      updateRoom(id, roomId, { repeatCustomer: checked });
    },
    [id, roomId, updateRoom]
  );

  const onSubmit = useCallback(
    values => {
      setFormValues(values);
      updateBooking(hotelUuid, {});
      setComplete(isNilOrEmpty(bookingErrors));
    },
    [bookingErrors, hotelUuid, updateBooking]
  );

  const guestAgeSets = requestedRooms.filter(r => r.uuid === roomId).map(r => r.guestAges);

  /**
   * renders all the accommodationEditModalErrors
   * accommodationEditModalErrors (occupancy ones WIP) is an array of arrays;
   * - the 1st level of array indicates the room index
   * - the 2nd level is the array of strings of actual errors for that room
   * @param {object} accommodationEditModalErrors
   * @param {array[]} accommodationEditModalErrors.occupancyCheckErrors
   * @param {string[]} accommodationEditModalErrors.bookingBuilderErrors
   */
  const renderAccommodationEditModalOccupancyErrors = accommodationEditModalErrors => {
    if (!accommodationEditModalErrors) {
      return null;
    }

    return (
      <React.Fragment>
        {accommodationEditModalErrors.occupancyCheckErrors.map((errorList, index) => {
          return (
            <React.Fragment key={`accommodationEditModalOccupancyError${index}`}>
              <AccommodationEditModalErrorsHeader>Room {index + 1} Errors</AccommodationEditModalErrorsHeader>
              {errorList.map((error, innerIndex) => {
                return (
                  <AccommodationEditModalErrorsError key={`accommodationEditModalErrorsingleError${innerIndex}`}>
                    {error}
                  </AccommodationEditModalErrorsError>
                );
              })}
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
  };

  const renderAccommodationEditModalBookingBuilderErrors = accommodationEditModalErrors => {
    if (!accommodationEditModalErrors) {
      return null;
    }

    // dont show the booking builder errors if we have occupancy errors
    if (
      accommodationEditModalErrors.occupancyCheckErrors &&
      accommodationEditModalErrors.occupancyCheckErrors.length >= 1
    ) {
      return null;
    }

    return (
      <React.Fragment>
        {accommodationEditModalErrors.bookingBuilderErrors.map((error, index) => {
          return (
            <React.Fragment key={`accommodationEditModalBookingBuilderError${index}`}>
              <AccommodationEditModalErrorsHeader>{error}</AccommodationEditModalErrorsHeader>
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
  };

  return (
    <EditForm>
      <EditFormTitle>{path(['product', 'name'], head(rooms))}</EditFormTitle>
      <Form
        initialValues={formValues}
        enableReinitialize={true}
        onSubmit={onSubmit}
        validationSchema={validation({ options: path(['product', 'options'], head(rooms)) })}
        validateOnBlur={false}
      >
        {({ values }) => (
          <Loader isLoading={isLoading} showPrev={true} text="Updating...">
            <EditFormSection>
              <LodgingSelect
                updateLocalState={true}
                label={`${t('labels.roomsAndGuestSelection')}`}
                onSelected={guestAgeSets => {
                  updateAccommodationProductGuestAgeSets(id, roomId, guestAgeSets);
                }}
                rooms={guestAgeSets}
              />
              {renderAccommodationEditModalOccupancyErrors(accommodationEditModalErrors)}
            </EditFormSection>
            {canChangeDates && (
              <EditFormSection>
                {renderDatePicker(t, {
                  datePickerRef,
                  dates,
                  disabled,
                  firstDate,
                  lastDate,
                  onDatesChange,
                  onDayPickerShow,
                  onMonthChange,
                  rates,
                  values,
                  currencyCode,
                })}
              </EditFormSection>
            )}
            {renderAccommodationEditModalBookingBuilderErrors(accommodationEditModalErrors)}
            <EditFormSection>
              <EditFormSectionTitle>{t('mealPlan_plural')}</EditFormSectionTitle>
              {renderMealPlans({ mealPlanOptions, onMealPlanChange, values })}
            </EditFormSection>
            <EditFormSection>
              <EditFormSectionTitle>{t('occasion_plural')}</EditFormSectionTitle>
              <OccasionsSelect onChange={onOccasionsChange} selected={selectedOccasions} />
            </EditFormSection>
            <EditFormSection>
              <Checkbox label={t('labels.isRepeat')} onChange={onRepeatGuestChange} checked={repeatGuest} />
            </EditFormSection>
          </Loader>
        )}
      </Form>
    </EditForm>
  );
};

SummaryRoomEdit.propTypes = propTypes;
SummaryRoomEdit.defaultProps = defaultProps;

export default compose(connect)(SummaryRoomEdit);
