import React from 'react';
import { gt, length, mapObjIndexed, path, pipe, prop, values, toPairs, map, head, last, curry } from 'ramda';
import { isThisMonth } from 'date-fns';

import { getPlural } from 'config/ui';

import { RadioButton } from 'components/elements';
import { GuestSelect } from 'components/app';
import { formatDate, getEndOfMonth, getStartOfMonth, toDate, isEmptyOrNil } from 'utils';

import { propTypes, defaultProps } from './SummaryRoomEdit.props';
import {
  DatePrice,
  EditForm,
  EditFormSection,
  EditFormTitle,
  StyledDatePicker,
  EditFormSectionTitle,
  MealPlanRate,
  MealPlanRatePrice,
  MealPlanRateWrapper,
} from './SummaryRoomEdit.styles';
import { getOptionsFromRates } from './SummaryRoomEdit.utils';

export const SummaryRoomEdit = ({
  hotelUuid,
  id,
  dates,
  ageRanges,
  details: { name, rates },
  quantity,
  mealPlan,
  mealPlans,
  onChange,
  onEdit,
  onDatesShow,
}) => {
  const { firstDate, lastDate, disabled } = getOptionsFromRates(rates);

  const onDateSelected = range => onChange({ accommodationProducts: { [id]: { dates: range } } });
  const onGuestSelect = quantity => {
    onChange({ accommodationProducts: { [id]: { quantity, mealPlan } } });
    onEdit({ id, quantity, mealPlan });
  };

  const renderDay = day => {
    const dayRate = prop(formatDate(day), rates);
    const rateUuid = prop('result', dayRate);
    const rate = path(['entities', 'rates', rateUuid], dayRate);

    return (
      <span>
        <div>{formatDate(day, 'D')}</div>
        {rate && <DatePrice>{prop('rate', rate)}</DatePrice>}
      </span>
    );
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

  const onMealPlanChange = ({ target: { value: value } }) => {
    onChange({ accommodationProducts: { [id]: { mealPlan: value } } });
    onEdit({ id, quantity, mealPlan: value });
  };

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

      return <MealPlanRateWrapper key={uuid}>{map(renderRate(gt(length(rates), 1)), rates)}</MealPlanRateWrapper>;
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

  return (
    <EditForm>
      <EditFormTitle>{name}</EditFormTitle>
      <EditFormSection>
        <GuestSelect ageRanges={ageRanges} onSelected={onGuestSelect} contentOnly={true} selectedValues={quantity} />
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
          selectedValues={dates}
          onSelected={onDateSelected}
        />
      </EditFormSection>
      <EditFormSection>
        <EditFormSectionTitle>{getPlural('mealPlan')}</EditFormSectionTitle>
        <RadioButton
          value={mealPlan}
          options={pipe(
            toPairs,
            map(mapMealPlans)
          )(mealPlans)}
          onChange={onMealPlanChange}
        />
      </EditFormSection>
    </EditForm>
  );
};

SummaryRoomEdit.propTypes = propTypes;
SummaryRoomEdit.defaultProps = defaultProps;

export default SummaryRoomEdit;
