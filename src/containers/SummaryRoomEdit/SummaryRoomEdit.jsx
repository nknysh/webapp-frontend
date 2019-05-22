import React, { useState, Fragment } from 'react';
import {
  all,
  compose,
  curry,
  defaultTo,
  equals,
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
  propOr,
  toUpper,
  values,
} from 'ramda';
import { isThisMonth } from 'date-fns';

import uiConfig, { getPlural } from 'config/ui';

import { isActive } from 'store/common';

import { RadioButton, Form, FormFieldError, Loader } from 'components/elements';
import GuestSelect from 'components/app/GuestSelect';
import { useEffectBoundary } from 'effects';
import { formatDate, getEndOfMonth, getStartOfMonth, toDate, isArray, mapWithIndex } from 'utils';

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

const allPermitted = pipe(
  defaultTo([]),
  map(prop('permitted')),
  all(equals(true))
);

export const SummaryRoomEdit = ({
  hotelUuid,
  id,
  dates,
  name,
  rates,
  guests,
  mealPlan,
  mealPlans,
  onComplete,
  onChange,
  onDatesShow,
  checks,
  details,
  status,
  updateBooking,
  options,
}) => {
  const [formValues, setFormValues] = useState({ mealPlan, dates, guests });
  const [complete, setComplete] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [roomContext, setRoomContext] = useState(0);
  const { firstDate, lastDate, disabled } = getOptionsFromRates(rates);

  const isLoading = isActive(status);

  useEffectBoundary(() => {
    roomContext > guests.length - 1 && setRoomContext(guests.length - 1);
  }, [guests]);

  useEffectBoundary(() => {
    const finished = allPermitted(checks);
    submitted && setComplete(finished);
    setSubmitted(finished);
  }, [checks]);

  useEffectBoundary(() => {
    complete && onComplete({});
  }, [complete]);

  const ageRanges = getAgeRanges(options);
  const minMax = getMinMax(options);

  const onBookingChange = (id, values) => updateBooking(hotelUuid, id, values);

  const onFormSubmit = values => {
    setFormValues(values);
    onChange(hotelUuid, { Accommodation: { [id]: { ...values } } });
    setSubmitted(true);
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
    onBookingChange({ Accommodation: { [id]: { [name]: value } } });
  });

  const mapMealPlans = ({ breakdown = [], products = [] }) => {
    const hasSplitRates = gt(length(breakdown), 1);

    // eslint-disable-next-line react/prop-types
    const mapBreakdown = ({ title, dates, total }, i) => (
      <MealPlanRate key={i}>
        {title} - (<MealPlanRatePrice>{total}</MealPlanRatePrice>
        {hasSplitRates && ` | ${head(dates)} - ${last(dates)}`})
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
        {dayRate && <DatePrice>{prop('rate', dayRate)}</DatePrice>}
      </span>
    );
  };

  const renderGuestCheck = (checked, i) => {
    const errors = pipe(
      propOr([], 'errors'),
      map(renderError)
    )(checked);

    return <Fragment key={i}>{errors}</Fragment>;
  };

  const renderGuestsInfo = () => mapWithIndex(renderGuestCheck, defaultTo([], checks));

  return (
    <EditForm>
      <EditFormTitle>{name}</EditFormTitle>
      <Form
        initialValues={formValues}
        onSubmit={onFormSubmit}
        validationSchema={validation(details)}
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
                {renderGuestsInfo()}
              </GuestSelect>
            </EditFormSection>
            <EditFormSection>
              <StyledDatePicker
                label={getPlural('date')}
                dayPickerProps={{
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
                onChange={prop('handleChange', formProps)}
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
