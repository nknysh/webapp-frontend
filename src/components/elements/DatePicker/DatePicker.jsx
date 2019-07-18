import React, { useRef, forwardRef, useState, useCallback } from 'react';
import { defaultTo, assoc, partial } from 'ramda';
import { isNilOrEmpty, renameKeys } from 'ramda-adjunct';
import { isEqual } from 'date-fns';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import DateUtils from 'react-day-picker/lib/src/DateUtils';

import { useEffectBoundary } from 'effects';

import DropDownContent from 'components/elements/DropDownContent';
import { getNumberOfDays, getFromDateFormat, getToDateFormat, formatDate, toDate } from 'utils';

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
  startDate: undefined,
  endDate: undefined,
};

const renderNavBar = ({ month, showPreviousButton, showNextButton, onPreviousClick, onNextClick }) => (
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

const renderInput = ({ multiple, values, startDate, endDate, placeholder, nights, summaryText, summaryTextPlural }) =>
  // eslint-disable-next-line react/display-name
  forwardRef((props, ref) => (
    <DropDownContent
      inputContent={partial(renderInputContent, [
        { multiple, values, startDate, endDate, placeholder, nights, summaryText, summaryTextPlural },
      ])}
      inputProps={{ ref, ...props }}
      maskProps={{
        ['data-empty']: multiple ? !startDate : isNilOrEmpty(values),
      }}
    />
  ));

const renderInputContent = ({
  multiple,
  values,
  startDate,
  endDate,
  placeholder,
  nights,
  summaryText,
  summaryTextPlural,
}) => (
  <DatePickerDatesWrapper>
    <Picked>
      {!multiple && !isNilOrEmpty(values) && formatDate(values)}
      {!startDate && !endDate && placeholder}
      {startDate && getFromDateFormat({ startDate, endDate })}
      {endDate && getToDateFormat({ startDate, endDate })}
    </Picked>
    {nights && <DatePickerSummary>{`${nights} ${nights === 1 ? summaryText : summaryTextPlural}`}</DatePickerSummary>}
  </DatePickerDatesWrapper>
);

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
  ranged,
  ...props
}) => {
  const inputRef = useRef(undefined);

  const [values, setValues] = useState(
    multiple ? renameKeys({ startDate: 'from', endDate: 'to' }, selectedValues) : selectedValues
  );

  const { from: startDate, to: endDate } = defaultTo({}, values);

  useEffectBoundary(() => {
    setValues(multiple ? renameKeys({ startDate: 'from', endDate: 'to' }, selectedValues) : selectedValues);
  }, [selectedValues]);

  const todaysDate = toDate();
  const isComplete = multiple ? Boolean(startDate && endDate) : Boolean(values);
  const nights = getNumberOfDays(values);

  const onDayClick = useCallback(
    day => {
      if (!multiple) {
        setValues(day);
        return onSelected(day);
      }

      const equalsStartDate = isEqual(formatDate(day), formatDate(startDate));
      const equalsEndDate = isEqual(formatDate(day), formatDate(endDate));

      if (multiple ? (startDate && equalsStartDate) || (endDate && equalsEndDate) : isEqual(day, values)) {
        setValues(multiple ? defaultState : undefined);
        return onSelected(multiple ? defaultState : undefined);
      }

      if (!ranged && (startDate && endDate)) {
        const startOnly = assoc('startDate', day, defaultState);
        setValues(startOnly);
        return onSelected(startOnly);
      }

      const range = DateUtils.addDayToRange(day, values);

      setValues(range);
      onSelected(range);
    },
    [endDate, multiple, onSelected, ranged, startDate, values]
  );

  const dayPickerCombinedProps = {
    classNames: datePickerClassnames,
    firstDayOfWeek: 1,
    fromMonth: todaysDate,
    navbarElement: renderNavBar,
    onDayClick: onDayClick,
    selectedDays: multiple ? [startDate, values] : values,
    showOutsideDays: true,
    weekdaysShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    ...dayPickerProps,
  };

  return (
    <StyledDatePicker className={className}>
      {renderLabel(label)}
      <DayPickerInput
        ref={inputRef}
        component={renderInput({
          multiple,
          values,
          startDate,
          endDate,
          placeholder,
          nights,
          summaryText,
          summaryTextPlural,
        })}
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
