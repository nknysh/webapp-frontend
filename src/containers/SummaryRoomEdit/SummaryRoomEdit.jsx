import React, { useState } from 'react';
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
  prop,
  propOr,
  toUpper,
  values,
} from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { isThisMonth } from 'date-fns';
import { useTranslation } from 'react-i18next';

import { ProductTypes } from 'config/enums';

import { isActive } from 'store/common';

import { RadioButton, Form, FormFieldError, Loader } from 'components/elements';
import GuestSelect from 'components/app/GuestSelect';
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
  StyledDatePicker,
} from './SummaryRoomEdit.styles';
import {
  getAgeRanges,
  getMealPlan,
  getMinMax,
  getMonthToDisplay,
  getOptionsFromRates,
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

const renderDay = (rates, day) => {
  const dayRate = prop(formatDate(day), rates);

  return (
    <span>
      <div>{formatDate(day, 'D')}</div>
      {dayRate && <DatePrice>{prop('price', dayRate)}</DatePrice>}
    </span>
  );
};

const renderDatePicker = (
  t,
  { dates, rates, disabled, firstDate, lastDate, onMonthChange, onDayPickerShow, values, onDatesChange }
) => (
  <StyledDatePicker
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
      renderDay: partial(renderDay, [rates]),
      onMonthChange,
    }}
    onDayPickerShow={onDayPickerShow}
    selectedValues={prop('dates', values)}
    onSelected={onDatesChange}
  />
);

const mapBreakdown = (hasSplitRates, { title, dates, total }, i) => (
  <MealPlanRate key={i}>
    {title} - (<MealPlanRatePrice>{total}</MealPlanRatePrice>
    {hasSplitRates && ` | ${head(dates)}${!equals(head(dates), last(dates)) ? ` - ${last(dates)}` : ''}`})
  </MealPlanRate>
);

const mapMealPlans = ({ breakdown = [], products = [] }) => {
  const hasSplitRates = gt(length(breakdown), 1);
  const productUuids = map(prop('uuid'), products);

  return {
    value: JSON.stringify(productUuids),
    label: mapWithIndex(partial(mapBreakdown, [hasSplitRates]), breakdown),
  };
};

const renderMealPlans = ({ mealPlanOptions, onMealPlanChange, values }) => (
  <RadioButton name="mealPlan" value={prop('mealPlan', values)} options={mealPlanOptions} onChange={onMealPlanChange} />
);

export const SummaryRoomEdit = ({
  addRoom,
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
  canChangeDates,
}) => {
  const { t } = useTranslation();

  const mealPlan = getMealPlan(requestedRooms);

  const [roomContext, setRoomContext] = useState(0);
  const [complete, setComplete] = useState(false);
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
    map(mapMealPlans),
    prepend({ label: 'None', value: '[]' })
  )(mealPlans[roomContext] || []);

  useEffectBoundary(() => {
    setFormValues({
      ...formValues,
      guestAges: map(prop('guestAges'), requestedRooms),
    });
  }, [requestedRooms]);

  useEffectBoundary(() => {
    setFormValues({
      ...formValues,
      dates: head(dates),
    });
  }, [dates]);

  useEffectBoundary(() => {
    setFormValues({
      ...formValues,
      mealPlan,
    });
  }, [mealPlan]);

  useEffectBoundary(() => {
    roomContext > totalRooms - 1 && setRoomContext(totalRooms - 1);
  }, [totalRooms]);

  useEffectBoundary(() => {
    complete && onComplete();
  }, [complete]);

  const onQuantityChange = quantity => {
    gt(quantity, totalRooms) && addRoom(id, roomId);
    lt(quantity, totalRooms) && removeRoom(id, roomId);
  };

  const onGuestSelectChange = (guestAges, i) => {
    updateIndividualRoom(id, roomId, i, { guestAges });
  };

  const onMonthChange = month => {
    onDatesShow(id, roomId, isThisMonth(month) ? formatDate(toDate()) : getStartOfMonth(month), getEndOfMonth(month));
    return month;
  };

  const onDayPickerShow = () => onDatesShow(id, roomId, firstDate, getEndOfMonth(lastDate));

  const onDatesChange = dates => {
    updateRoom(id, roomId, prepareDates(dates));
  };

  const onMealPlanChange = (e, value) => {
    updateRoom(id, roomId, {
      subProducts: {
        [ProductTypes.MEAL_PLAN]: parseMealPlans(value),
      },
    });
  };

  const onSubmit = values => {
    setFormValues(values);
    updateBooking(hotelUuid, {});
    setComplete(isNilOrEmpty(bookingErrors));
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
                  dates,
                  rates,
                  disabled,
                  firstDate,
                  lastDate,
                  onMonthChange,
                  onDayPickerShow,
                  onDatesChange,
                  values,
                })}
              </EditFormSection>
            )}
            <EditFormSection>
              <EditFormSectionTitle>{t('mealPlan_plural')}</EditFormSectionTitle>
              {renderMealPlans({ mealPlanOptions, onMealPlanChange, values })}
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
