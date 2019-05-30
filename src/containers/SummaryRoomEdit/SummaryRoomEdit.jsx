import React, { useState } from 'react';
import {
  always,
  compose,
  curry,
  defaultTo,
  equals,
  evolve,
  gt,
  head,
  ifElse,
  last,
  length,
  map,
  mapObjIndexed,
  path,
  pipe,
  prepend,
  prop,
  toUpper,
  values,
  when,
} from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { isThisMonth } from 'date-fns';

import { ProductTypes } from 'config/enums';
import uiConfig, { getPlural } from 'config/ui';

import { isActive } from 'store/common';

import { RadioButton, Form, FormFieldError, Loader } from 'components/elements';
import GuestSelect from 'components/app/GuestSelect';
import { useEffectBoundary } from 'effects';
import {
  formatDate,
  getEndOfMonth,
  getStartOfMonth,
  toDate,
  isArray,
  mapWithIndex,
  replaceAccommodationWithRoom,
  groupErrorsByRoomIndex,
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
import { getOptionsFromRates, getMinMax, getAgeRanges } from './SummaryRoomEdit.utils';

const getMonthToDisplay = pipe(
  prop('to'),
  toDate
);

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

export const SummaryRoomEdit = ({
  dates,
  guests,
  hotelUuid,
  id,
  mealPlan,
  mealPlans,
  name,
  onComplete,
  onDatesShow,
  options,
  rates,
  status,
  updateBooking,
  errors,
}) => {
  const [formValues, setFormValues] = useState({ mealPlan, dates, guests });
  const [complete, setComplete] = useState(false);
  const [roomContext, setRoomContext] = useState(0);
  const { firstDate, lastDate, disabled } = getOptionsFromRates(rates);
  const bookingErrors = groupErrorsByRoomIndex(errors);
  const isLoading = isActive(status);

  useEffectBoundary(() => {
    roomContext > guests.length - 1 && setRoomContext(guests.length - 1);
  }, [guests]);

  useEffectBoundary(() => {
    complete && onComplete({});
  }, [complete]);

  const ageRanges = getAgeRanges(options);
  const minMax = getMinMax(options);

  const onBookingChange = (id, values) => updateBooking(hotelUuid, id, values);

  const onFormSubmit = values => {
    const finalValues = evolve({
      mealPlan: when(isNilOrEmpty, always('[]')),
    });

    setFormValues(values);
    updateBooking(hotelUuid, { products: { [ProductTypes.ACCOMMODATION]: { [id]: { ...finalValues(values) } } } });
    setComplete(isNilOrEmpty(bookingErrors));
  };

  const onMonthChange = month => {
    onDatesShow(
      hotelUuid,
      id,
      isThisMonth(month) ? formatDate(toDate()) : getStartOfMonth(month),
      getEndOfMonth(month)
    );
    return month;
  };

  const onDayPickerShow = () => onDatesShow(hotelUuid, id, firstDate, getEndOfMonth(lastDate));

  const onObjectChange = curry((name, { handleChange }, value) => {
    handleChange({ target: { name, type: 'object', value } });
    onBookingChange({ products: { [ProductTypes.ACCOMMODATION]: { [id]: { [name]: value } } } });
  });

  const onMealPlanChange = ({ handleChange }) => (e, value) => {
    handleChange(e, value);
    onBookingChange({ products: { [ProductTypes.ACCOMMODATION]: { [id]: { mealPlan: value } } } });
  };

  const mapMealPlans = ({ breakdown = [], products = [] }) => {
    const hasSplitRates = gt(length(breakdown), 1);

    const mapBreakdown = ({ title, dates, total }, i) => (
      <MealPlanRate key={i}>
        {title} - (<MealPlanRatePrice>{total}</MealPlanRatePrice>
        {hasSplitRates && ` | ${head(dates)}${!equals(head(dates), last(dates)) ? ` - ${last(dates)}` : ''}`})
      </MealPlanRate>
    );

    return {
      value: JSON.stringify(products),
      label: mapWithIndex(mapBreakdown, breakdown),
    };
  };

  const renderDay = day => {
    const dayRate = prop(formatDate(day), rates);

    return (
      <span>
        <div>{formatDate(day, 'D')}</div>
        {dayRate && <DatePrice>{prop('price', dayRate)}</DatePrice>}
      </span>
    );
  };

  return (
    <EditForm>
      <EditFormTitle>{name}</EditFormTitle>
      <Form
        initialValues={formValues}
        onSubmit={onFormSubmit}
        validationSchema={validation({ options })}
        validateOnBlur={false}
      >
        {({ values, errors, ...formProps }) => (
          <Loader isLoading={isLoading} showPrev={true} text="Updating...">
            <EditFormSection>
              <GuestSelect
                ageRanges={ageRanges}
                onSelected={onObjectChange('guests', formProps)}
                contentOnly={true}
                selectedValues={map(defaultTo({}), prop('guests', values))}
                minMax={minMax}
                errors={renderGuestSelectErrors(prop('guests', errors))}
                onRoomChange={setRoomContext}
                selectedRoom={roomContext}
              >
                {renderRoomErrors(bookingErrors)}
              </GuestSelect>
            </EditFormSection>
            <EditFormSection>
              <StyledDatePicker
                label={getPlural('date')}
                dayPickerProps={{
                  month: getMonthToDisplay(dates),
                  disabledDays: [
                    ...disabled,
                    {
                      before: new Date(firstDate),
                      after: new Date(lastDate),
                    },
                  ],
                  renderDay,
                  onMonthChange,
                }}
                onDayPickerShow={onDayPickerShow}
                selectedValues={prop('dates', values)}
                onSelected={onObjectChange('dates', formProps)}
              />
            </EditFormSection>
            <EditFormSection>
              <EditFormSectionTitle>{getPlural('mealPlan')}</EditFormSectionTitle>
              <RadioButton
                name="mealPlan"
                value={prop('mealPlan', values)}
                options={pipe(
                  map(mapMealPlans),
                  prepend({ label: 'None', value: '' })
                )(mealPlans[roomContext] || [])}
                onChange={onMealPlanChange(formProps)}
              />
            </EditFormSection>
            <EditFormActions>
              <EditFormButton type="submit">{path(['buttons', 'update'], uiConfig)}</EditFormButton>
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
