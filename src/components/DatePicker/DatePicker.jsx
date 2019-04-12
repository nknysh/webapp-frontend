import React, { useRef, forwardRef } from 'react';
import { defaultTo } from 'ramda';
import { isEqual } from 'date-fns';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import DateUtils from 'react-day-picker/lib/src/DateUtils';

import DropDownContent from 'components/DropDownContent';
import { getNumberOfDays, getFromDateFormat, getToDateFormat, formatDate, toDate, isEmptyOrNil } from 'utils';

import { propTypes, defaultProps } from './DatePicker.props';
import {
  datePickerClassnames,
  DatePickerDatesWrapper,
  DatePickerLabel,
  DatePickerNavbar,
  DatePickerNavbarMonth,
  DatePickerNavbarNext,
  DatePickerNavbarPrev,
  DatePickerSummary,
  Picked,
  StyledDatePicker,
} from './DatePicker.styles';

const defaultState = {
  from: undefined,
  to: undefined,
};

// eslint-disable-next-line
const renderNavBar = ({ month, showPreviousButton, showNextButton, onPreviousClick, onNextClick, ...props }) => (
  <DatePickerNavbar>
    {
      <DatePickerNavbarPrev data-hide={!showPreviousButton} onClick={() => onPreviousClick()}>
        keyboard_arrow_left
      </DatePickerNavbarPrev>
    }
    <DatePickerNavbarMonth>{formatDate(month, 'MMMM YYYY')}</DatePickerNavbarMonth>
    {
      <DatePickerNavbarNext data-hide={!showNextButton} onClick={() => onNextClick()}>
        keyboard_arrow_right
      </DatePickerNavbarNext>
    }
  </DatePickerNavbar>
);

const renderLabel = label => label && <DatePickerLabel>{label}</DatePickerLabel>;

export const DatePicker = ({
  className,
  dayPickerProps,
  label,
  onSelected,
  placeholder,
  selectedValues,
  showOverlay,
  summaryText,
  summaryTextPlural,
  multiple,
  ...props
}) => {
  const inputRef = useRef(undefined);

  const todaysDate = toDate();
  const { from, to } = defaultTo({}, selectedValues);
  const isComplete = multiple ? Boolean(from && to) : Boolean(selectedValues);
  const nights = getNumberOfDays(selectedValues);

  const renderInputContent = () => (
    <DatePickerDatesWrapper>
      <Picked>
        {!multiple && !isEmptyOrNil(selectedValues) && formatDate(selectedValues)}
        {!from && !to && placeholder}
        {from && getFromDateFormat(selectedValues)}
        {to && getToDateFormat(selectedValues)}
      </Picked>
      {nights && <DatePickerSummary>{`${nights} ${nights === 1 ? summaryText : summaryTextPlural}`}</DatePickerSummary>}
    </DatePickerDatesWrapper>
  );

  // eslint-disable-next-line
  const renderInput = forwardRef((props, ref) => (
    <DropDownContent
      inputContent={renderInputContent}
      inputProps={{ ref, ...props }}
      maskProps={{
        ['data-empty']: multiple ? !from : isEmptyOrNil(selectedValues),
      }}
    />
  ));

  const onDayClick = day => {
    if (multiple ? (from && isEqual(day, from)) || (to && isEqual(day, to)) : isEqual(day, selectedValues))
      return onSelected(multiple ? defaultState : undefined);

    if (!multiple) return onSelected(day);

    const range = DateUtils.addDayToRange(day, selectedValues);
    onSelected(range);
  };

  const dayPickerCombinedProps = {
    classNames: datePickerClassnames,
    firstDayOfWeek: 1,
    fromMonth: todaysDate,
    navbarElement: renderNavBar,
    onDayClick: onDayClick,
    selectedDays: multiple ? [from, selectedValues] : selectedValues,
    showOutsideDays: true,
    weekdaysShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    ...dayPickerProps,
  };

  return (
    <StyledDatePicker className={className}>
      {renderLabel(label)}
      <DayPickerInput
        ref={inputRef}
        component={renderInput}
        dayPickerProps={dayPickerCombinedProps}
        hideOnDayClick={!showOverlay || isComplete}
        {...props}
      />
    </StyledDatePicker>
  );
};

DatePicker.propTypes = propTypes;
DatePicker.defaultProps = defaultProps;

export default DatePicker;
