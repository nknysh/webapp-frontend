import React, { useState, Fragment, useCallback, useRef } from 'react';
import {
  compose,
  equals,
  gt,
  head,
  ifElse,
  last,
  length,
  lt,
  map,
  mapObjIndexed,
  partial,
  path,
  pipe,
  prepend,
  mergeDeepLeft,
  prop,
  propOr,
  propSatisfies,
  toUpper,
  values,
} from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { isThisMonth } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { RadioButton, Form, FormFieldError, Loader, Checkbox, ToolTip } from '@pure-escapes/webapp-ui-components';

import { ProductTypes } from 'config/enums';

import { isActive } from 'store/common';

import { GuestSelect, OccasionsSelect } from 'components';
import { useEffectBoundary } from 'effects';
import {
  formatDate,
  getEndOfMonth,
  getStartOfMonth,
  groupErrorsByRoomIndex,
  isArray,
  mapWithIndex,
  replaceAccommodationWithRoom,
  toDate,
  formatPrice,
} from 'utils';

import { validation } from 'config/forms/roomEdit';

import connect from './SummaryRoomEdit.state';
import { propTypes, defaultProps } from './SummaryRoomEdit.props';
import {
  DatePrice,
  EditForm,
  EditFormActions,
  EditFormButton,
  EditFormSection,
  EditFormSectionTitle,
  EditFormTitle,
  MealPlanRate,
  MealPlanRatePrice,
  MealPlanRatePriceOffer,
  StyledDatePicker,
} from './SummaryRoomEdit.styles';
import {
  getAgeRanges,
  getMealPlan,
  getMinMax,
  getMonthToDisplay,
  getOptionsFromRates,
  getRepeatGuest,
  getSelectedOccasions,
  parseMealPlans,
  prepareDates,
} from './SummaryRoomEdit.utils';

const renderError = message => message && <FormFieldError key={message}>{message}</FormFieldError>;
const renderKeyedError = (msg, key) => renderError(`${toUpper(key)} - ${msg}`);

const renderGuestSelectErrors = ifElse(
  isArray,
  pipe(
    map(
      pipe(
        mapObjIndexed(renderKeyedError),
        values
      )
    )
  ),
  renderError
);

const renderRoomErrors = pipe(
  replaceAccommodationWithRoom,
  map(map(renderError))
);

const renderGuestSelect = (
  t,
  {
    ageRanges,
    bookingErrors,
    errors,
    minMax,
    onGuestSelectChange,
    onQuantityChange,
    roomContext,
    setRoomContext,
    totalRooms,
    values,
  }
) => (
  <GuestSelect
    ageRanges={ageRanges}
    errors={renderGuestSelectErrors(prop('guestAges', errors))}
    minMax={minMax}
    onQuantityChange={onQuantityChange}
    onSelected={onGuestSelectChange}
    onTabChange={setRoomContext}
    tabIndex={roomContext}
    totalRooms={totalRooms}
    values={propOr({}, 'guestAges', values)}
  >
    {renderRoomErrors(bookingErrors)}
  </GuestSelect>
);

const renderDay = (rates, currencyCode, day) => {
  const dayRate = prop(formatDate(day), rates);

  return (
    <span>
      <div>{formatDate(day, 'D')}</div>
      {dayRate && <DatePrice>{`${currencyCode}${formatPrice(prop('price', dayRate))}`}</DatePrice>}
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
      renderDay: partial(renderDay, [rates, currencyCode]),
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
  addRoom,
  canChangeDates,
  dates,
  errors,
  hotelUuid,
  id,
  mealPlans,
  onComplete,
  onDatesShow,
  rates,
  removeRoom,
  requestedRooms,
  roomId,
  rooms,
  status,
  updateBooking,
  updateIndividualRoom,
  updateRoom,
  currencyCode,
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
  const ageRanges = getAgeRanges(rooms);
  const minMax = getMinMax(rooms);
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

  const onQuantityChange = useCallback(
    quantity => {
      gt(quantity, totalRooms) && addRoom(id, roomId);
      lt(quantity, totalRooms) && removeRoom(id, roomId);
    },
    [addRoom, id, removeRoom, totalRooms, roomId]
  );

  const onGuestSelectChange = useCallback(
    (guestAges, i) => {
      updateIndividualRoom(id, roomId, i, { guestAges });
    },
    [id, roomId, updateIndividualRoom]
  );

  const onMonthChange = useCallback(
    month => {
      onDatesShow(id, roomId, isThisMonth(month) ? formatDate(toDate()) : getStartOfMonth(month), getEndOfMonth(month));
      return month;
    },
    [id, roomId, onDatesShow]
  );

  const onDayPickerShow = useCallback(() => onDatesShow(id, roomId, firstDate, getEndOfMonth(lastDate)), [
    onDatesShow,
    id,
    roomId,
    firstDate,
    lastDate,
  ]);

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
        {({ values, errors, ...formProps }) => (
          <Loader isLoading={isLoading} showPrev={true} text="Updating...">
            <EditFormSection>
              {renderGuestSelect(t, {
                ageRanges,
                bookingErrors,
                errors,
                minMax,
                onGuestSelectChange,
                onQuantityChange,
                requestedRooms,
                roomContext,
                setRoomContext,
                totalRooms,
                values,
                ...formProps,
              })}
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
            <EditFormActions>
              <EditFormButton type="submit">{t('buttons.update')}</EditFormButton>
            </EditFormActions>
          </Loader>
        )}
      </Form>
    </EditForm>
  );
};

SummaryRoomEdit.propTypes = propTypes;
SummaryRoomEdit.defaultProps = defaultProps;

export default compose(connect)(SummaryRoomEdit);
