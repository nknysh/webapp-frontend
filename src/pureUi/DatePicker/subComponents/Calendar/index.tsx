import * as _ from 'lodash';
import * as React from 'react';
import DateHelper from '../../DateHelper';
import DateButton from '../DateButton';
import { IDateObject } from '../../types';
import { pureUiTheme } from 'pureUi/pureUiTheme';
import styled from 'styled-components';

// Optimisation Warning: Memoized functions
// date.toLocaleString is used for for the following functions. But it's quite slow,
// so we memoize some functions to minimize those calls.
const resolver = (...args) => {
  const key = args.reduce((prev, next) => `${prev}-${next}`);
  return key;
};

const memoizedWeekdayHeadings = _.memoize(DateHelper.weekdayHeadingsWithLocale, resolver);
const memoizedGenerateDatesFor = _.memoize(DateHelper.generateDatesFor, resolver);

export interface ICalendarProps extends React.HTMLProps<HTMLDivElement> {
  locale?: string;
  localeDates?: string; // separate locale formatting for dates
  firstDayOfWeek?: number;
  currentDate: string; // An ISO8601 Date string
  selectedDates?: string[]; // An array of ISO8601 Date strings
  onDayClick?: React.EventHandler<any>;
  onDayMouseOver?: React.EventHandler<any>;
  disablePastDates: boolean;
}

// -----------------------------------------------------------------------------

class Calendar extends React.Component<ICalendarProps, {}> {
  private currentMonth: number;
  private today = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();
  private localeOptions = { year: 'numeric', month: 'long', timeZone: 'GMT' };

  public shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props;
  }

  public static defaultProps: ICalendarProps = {
    currentDate: new Date().toISOString(),
    firstDayOfWeek: 0,
    disablePastDates: true,
  };

  private renderWeek = (week: IDateObject[]): JSX.Element => {
    const key = `week-staring-${week[0].month}-${week[0].date}`;
    return (
      <div key={key} className="calendarWeek">
        {week.map(date => this.renderDate(date))}
      </div>
    );
  };

  private renderDate = (date: IDateObject): JSX.Element => {
    const key = `${this.currentMonth}-date-${date.month}-${date.date}`;
    const isFirstDate = this.props.selectedDates && this.props.selectedDates[0] === date.dateString;
    const isSelected = this.props.selectedDates && this.props.selectedDates.includes(date.dateString);
    return (
      <DateButton
        key={key}
        dateObject={date}
        className="dateButton"
        onClick={this.props.onDayClick}
        onMouseOver={this.props.onDayMouseOver}
        isSelected={isSelected}
        isFirstDate={isFirstDate}
        isExtra={date.month !== this.currentMonth}
        isToday={this.today === date.dateString}
        isDisabled={this.props.disablePastDates && date.dateString < this.today}
      />
    );
  };

  public render() {
    const dateString = this.props.currentDate;
    const date = new Date(dateString);
    this.currentMonth = date.getUTCMonth();

    return (
      <div className={this.props.className}>
        <header className="header">
          <p className="month">{date.toLocaleString(this.props.locale, this.localeOptions)}</p>
        </header>
        <section className="calendarGrid">
          <div className="days">
            {memoizedWeekdayHeadings(this.props.locale, this.props.firstDayOfWeek).map((d, i) => (
              <span key={`wd-${d}${i}`} className="day">
                {d}
              </span>
            ))}
          </div>
          {memoizedGenerateDatesFor
            .call(
              DateHelper,
              this.currentMonth,
              date.getFullYear(),
              this.props.firstDayOfWeek,
              this.props.localeDates || this.props.locale
            )
            .map(week => this.renderWeek(week))}
        </section>
      </div>
    );
  }
}

const StyledCalendar = styled(Calendar)`
  display: flex;
  flex-direction: column;
  user-select: none;
  color: ${pureUiTheme.colors.black};
  text-transform: uppercase;
  background-color: ${pureUiTheme.colors.white};

  .header {
    margin-bottom: 3px;
  }

  .calendarGrid {
    margin: 5px;
    width: 259px;
  }

  & .calendarWeek {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    margin-top: 5px;
  }

  & .month {
    font-weight: 600;
    font-size: 12px;
    background-color: ${pureUiTheme.colors.grayLight};
    margin: 0;
    display: flex;
    height: 48px;
    align-items: center;
    justify-content: center;
    letter-spacing: 0.7px;
  }

  & .days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    font-size: 12px;
    font-weight: 600;
    line-height: 24px;
  }
`;

export default StyledCalendar;
