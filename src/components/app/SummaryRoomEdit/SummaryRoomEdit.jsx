import React, { useState, Fragment } from 'react';
import {
  all,
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
  toPairs,
  toUpper,
  values,
} from 'ramda';
import { isThisMonth } from 'date-fns';

import uiConfig, { getPlural } from 'config/ui';

import { RadioButton, Form, FormFieldError } from 'components/elements';
import GuestSelect from 'components/app/GuestSelect';
import { useEffectBoundary } from 'effects';
import { formatDate, getEndOfMonth, getStartOfMonth, toDate, isEmptyOrNil, isArray, mapWithIndex } from 'utils';

import { validation } from 'config/forms/roomEdit';

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
  MealPlanRateWrapper,
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
  details: { name, rates },
  guests,
  mealPlan,
  mealPlans,
  onSubmit,
  onChange,
  onDatesShow,
  checks,
  details,
}) => {
  const [formValues, setFormValues] = useState({ mealPlan, dates, guests });
  const [complete, setComplete] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { firstDate, lastDate, disabled } = getOptionsFromRates(rates);

  useEffectBoundary(() => {
    const finished = allPermitted(checks);
    submitted && setComplete(finished);
    setSubmitted(finished);
  }, [checks]);

  useEffectBoundary(() => {
    complete && onSubmit({ rooms: { [id]: { ...formValues } } });
  }, [complete]);

  const ageRanges = getAgeRanges(details);
  const minMax = getMinMax(details);

  const onFormSubmit = values => {
    setFormValues(values);
    onChange(hotelUuid, { rooms: { [id]: { ...values } } });
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

  const mapMealPlans = ([productUuid, details]) => {
    const rates = pipe(
      prop('rates'),
      values
    )(details);

    const hasSplitRates = gt(length(rates), 1);

    // eslint-disable-next-line
    const renderRatePrice = ({ rates, dates }, uuid) => {
      const splitDates = hasSplitRates ? ` | ${head(dates)} - ${last(dates)}` : '';

      const renderRate = curry(
        (isMulti, { name, rate }) =>
          !isEmptyOrNil(rate) && (
            <MealPlanRate key={name}>
              (+ <MealPlanRatePrice>{rate}</MealPlanRatePrice>
              {isMulti && ` ${name}`}
              {splitDates})
            </MealPlanRate>
          )
      );

      const mapRates = map(renderRate(gt(length(rates), 1)));

      return <MealPlanRateWrapper key={uuid}>{mapRates(rates)}</MealPlanRateWrapper>;
    };

    const prices = mapObjIndexed(renderRatePrice, rates);

    return {
      value: productUuid,
      label: (
        <span>
          {prop('name', details)} {values(prices)}
        </span>
      ),
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

  const onObjectChange = curry((name, { handleChange }, value) =>
    handleChange({ target: { name, type: 'object', value } })
  );

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
          <Fragment>
            <EditFormSection>
              <GuestSelect
                ageRanges={ageRanges}
                onSelected={onObjectChange('guests', formProps)}
                contentOnly={true}
                selectedValues={map(defaultTo({}), prop('guests', values))}
                minMax={minMax}
                errors={renderGuestSelectErrors(prop('guests', errors))}
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
                  toPairs,
                  map(mapMealPlans),
                  prepend({ label: 'None', value: '' })
                )(mealPlans)}
                onChange={prop('handleChange', formProps)}
              />
            </EditFormSection>
            <EditFormActions>
              <EditFormButton type="submit">{path(['buttons', 'update'], uiConfig)}</EditFormButton>
            </EditFormActions>
          </Fragment>
        )}
      </Form>
    </EditForm>
  );
};

SummaryRoomEdit.propTypes = propTypes;
SummaryRoomEdit.defaultProps = defaultProps;

export default SummaryRoomEdit;
