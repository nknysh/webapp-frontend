import React, { useState, useRef, forwardRef, useEffect, Fragment } from 'react';
import { format, differenceInCalendarDays, isEqual } from 'date-fns';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import DateUtils from 'react-day-picker/lib/src/DateUtils';

import { DropDownContent } from 'components';
import { useKeyboard } from 'effects';

import { propTypes, defaultProps } from './DatePicker.props';
import {
  datePickerClassnames,
  DatePickerLabel,
  DatePickerNavbar,
  DatePickerNavbarMonth,
  DatePickerNavbarNext,
  DatePickerNavbarPrev,
  DatePickerSummary,
  StyledDatePicker,
} from './DatePicker.styles';

const defaultState = {
  from: undefined,
  to: undefined,
};

const getFromDateFormat = ({ from, to }) => {
  if (!from) return '';

  const sameMonth = to && from.getMonth() === to.getMonth();
  const sameYear = to && from.getYear() === to.getYear();

  const month = sameMonth && sameYear ? '' : 'MMM';
  const year = sameYear ? '' : 'YYYY';

  return `D ${month} ${year}`;
};

const getNumberOfDays = ({ from, to }) => from && to && differenceInCalendarDays(to, from);

// eslint-disable-next-line
const renderNavBar = ({ month, showPreviousButton, showNextButton, onPreviousClick, onNextClick, ...props }) => (
  <DatePickerNavbar>
    {
      <DatePickerNavbarPrev data-hide={!showPreviousButton} onClick={() => onPreviousClick()}>
        keyboard_arrow_left
      </DatePickerNavbarPrev>
    }
    <DatePickerNavbarMonth>{format(month, 'MMMM YYYY')}</DatePickerNavbarMonth>
    {
      <DatePickerNavbarNext data-hide={!showNextButton} onClick={() => onNextClick()}>
        keyboard_arrow_right
      </DatePickerNavbarNext>
    }
  </DatePickerNavbar>
);

const renderLabel = label => label && <DatePickerLabel>{label}</DatePickerLabel>;

export const DatePicker = ({
  label,
  placeholder,
  summaryText,
  summaryTextPlural,
  dayPickerProps,
  onSelected,
  showOverlay,
  selectedValues,
  ...props
}) => {
  const [selected, setSelected] = useState(selectedValues || defaultState);
  const inputRef = useRef(undefined);

  useKeyboard(27, () => {
    setSelected(defaultState);
  });

  useEffect(() => {
    onSelected(selected);
  }, [selected]);

  const todaysDate = new Date();
  const { from, to } = selected;
  const isComplete = Boolean(from && to);
  const nights = getNumberOfDays(selected);

  const renderInputContent = () => (
    <Fragment>
      {!from && !to && placeholder}
      {from && format(from, getFromDateFormat(selected))}
      {to && ` - ${format(to, 'D MMM YYYY')}`}
      {nights && <DatePickerSummary>{`${nights} ${nights === 1 ? summaryText : summaryTextPlural}`}</DatePickerSummary>}
    </Fragment>
  );

  // eslint-disable-next-line
  const renderInput = forwardRef((props, ref) => (
    <DropDownContent
      inputContent={renderInputContent}
      inputProps={{ ref, ...props }}
      maskProps={{
        ['data-empty']: !from,
      }}
    />
  ));

  const onDayClick = day => {
    if ((from && isEqual(day, from)) || (to && isEqual(day, to))) return setSelected(defaultState);
    const range = DateUtils.addDayToRange(day, selected);
    setSelected(range);
  };

  const dayPickerCombinedProps = {
    classNames: datePickerClassnames,
    firstDayOfWeek: 1,
    fromMonth: todaysDate,
    navbarElement: renderNavBar,
    onDayClick: onDayClick,
    selectedDays: [from, selected],
    showOutsideDays: true,
    weekdaysShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    ...dayPickerProps,
  };

  return (
    <StyledDatePicker>
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
