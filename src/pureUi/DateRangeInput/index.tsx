import React, { HTMLAttributes, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import DatePicker, { DateHelper } from 'pureUi/DatePicker';
import { pureUiTheme } from '../pureUiTheme';
import { Frame } from '../Frame/index';

export interface DateRangeInputPops extends HTMLAttributes<HTMLButtonElement> {
  displayString: string;
  currentDate: string;
  totalNights: number;
  showDatePicker: boolean;
  selectedDates: string[];
  onDayClick?: React.EventHandler<any>;
  onDayMouseOver?: React.EventHandler<any>;
  onNextClick?: React.EventHandler<any>;
  onPrevClick?: React.EventHandler<any>;
  onClickOutside: (e: MouseEvent) => void;
}

const DateRangeInput = (props: DateRangeInputPops) => {
  const {
    className,
    displayString,
    currentDate,
    totalNights,
    showDatePicker,
    selectedDates,
    onDayClick,
    onDayMouseOver,
    onNextClick,
    onPrevClick,
    onClickOutside,
    ...buttonProps
  } = props;
  const wrapper = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (!wrapper.current!.contains(e.target as Node)) {
        props.onClickOutside(e);
        return;
      }
    },
    [props.onClickOutside]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <div className={props.className} ref={wrapper}>
      <button tabIndex={0} className="pseudoSelect" {...buttonProps}>
        {displayString}
        <span className="badge">
          {totalNights} {totalNights > 1 || totalNights === 0 ? 'Nights' : 'Night'}
        </span>
      </button>
      {showDatePicker && (
        <Frame className="datePickerWrapper">
          <DatePicker
            calendarCount={2}
            currentDate={props.currentDate}
            selectedDates={props.selectedDates}
            onDayClick={props.onDayClick}
            onDayMouseOver={props.onDayMouseOver}
            onNextClick={props.onNextClick}
            onPrevClick={props.onPrevClick}
          />
        </Frame>
      )}
    </div>
  );
};

DateRangeInput.defaultProps = {
  currentDate: new Date().toISOString(),
  totalNights: 0,
  showDatePicker: true,
};

export default styled(DateRangeInput)`
  position: relative;

  /* TODO: Create a component for this... */
  .pseudoSelect {
    border: ${pureUiTheme.colorRoles.lightGreyBorder} 1px solid;
    position: relative;
    text-transform: uppercase;
    padding: 10px;
    font-family: 'HurmeGeometricSans2';
    font-size: 14px;
    color: ${pureUiTheme.colors.black};
    text-align: left;
    width: 100%;
    color: ${pureUiTheme.colors.black};
  }

  .datePickerWrapper {
    position: absolute;
    top: 100%;
  }

  .badge {
    position: absolute;
    top: -16px;
    right: 10px;
    background-color: ${pureUiTheme.colors.aqua};
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 12px;
  }
`;
