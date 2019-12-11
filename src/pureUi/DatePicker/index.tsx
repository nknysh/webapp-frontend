import * as React from 'react';
import DateHelper from './DateHelper';
import Calendar from './subComponents/Calendar';
import styled from 'styled-components';
import { Icon } from '@material-ui/core';
import { IconButton } from 'pureUi/Buttons';

export interface IDatePickerOwnProps {
  calendarCount: number;
  currentDate: string; // An ISO8601 Date string
  selectedDates?: string[]; // An array of ISO8601 Date strings
  onDayClick?: React.EventHandler<any>;
  onDayMouseOver?: React.EventHandler<any>;
  onNextClick?: React.EventHandler<any>;
  onPrevClick?: React.EventHandler<any>;
  locale?: string;
  localeDates?: string;
  firstDayOfWeek?: number; // 0 = sunday
}
export interface IDatePickerProps extends IDatePickerOwnProps, React.HTMLProps<HTMLDivElement> {}

const DatePicker = (props: IDatePickerProps) => (
  <div className={props.className}>
    <IconButton className="button prevButton" onClick={props.onPrevClick}>
      <Icon>chevron_left</Icon>
    </IconButton>

    <IconButton className="button nextButton" onClick={props.onNextClick}>
      <Icon>chevron_right</Icon>
    </IconButton>

    <div className="calendars">
      {Array(Math.abs(props.calendarCount))
        .fill(0)
        .map((i, index) => (
          <Calendar
            className="calendar"
            key={`calendar-${index}`}
            currentDate={DateHelper.addMonths(props.currentDate, index)}
            selectedDates={props.selectedDates}
            locale={props.locale}
            localeDates={props.localeDates}
            firstDayOfWeek={props.firstDayOfWeek}
            onDayClick={props.onDayClick}
            onDayMouseOver={props.onDayMouseOver}
          />
        ))}
    </div>
  </div>
);

DatePicker.defaultProps = {
  currentDate: new Date().toUTCString(),
  selectedDates: [],
  calendarCount: 1,
  locale: 'en-US',
  localeDates: 'en-US',
  firstDayOfWeek: 1,
};

export default styled(DatePicker)`
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
  position: relative;
  display: flex;
  flex-grow: 1;
  flex-shrink: 1;
  user-select: none;
  z-index: 10;

  .calendars {
    display: flex;
  }

  .calendars .calendar:not(:first-child):not(:last-child) .grid {
    margin-left: 0;
    margin-right: 0;
  }

  .button {
    position: absolute;
    top: 0;
    height: 45px;
    width: 53px;
    padding-top: 8px;
    border: none;
    background-color: transparent;
  }

  .nextButton {
    right: 0;
  }
`;

export { DateHelper };
