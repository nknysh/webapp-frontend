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
  datePickerLeft?: boolean;
  datePickerTop?: boolean;
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
        <span className="displayString">{displayString}</span>
        <span className="countBadge">
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
    display: flex;
    align-items: center;
    border: ${pureUiTheme.colorRoles.lightGreyBorder} 1px solid;
    position: relative;
    text-transform: uppercase;
    padding: 0 10px;
    font-family: 'HurmeGeometricSans2';
    font-size: 14px;
    color: ${pureUiTheme.colors.black};
    text-align: left;
    width: 100%;
    height: 39px;
    color: ${pureUiTheme.colors.black};

    transition: all 0.15s ease-out;
    box-shadow: 0 0 0 2px transparent;
    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px ${pureUiTheme.colors.marine};
    }
  }

  .datePickerWrapper {
    position: absolute;

    ${props => (props.datePickerTop ? 'bottom: 100%' : 'top: 100%;')}
    ${props => (props.datePickerLeft ? 'right: 0%' : '')}
  }

  .displayString {
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .countBadge {
    position: relative;
    background-color: ${pureUiTheme.colors.aqua};
    padding: 5px 10px;

    border-radius: 4px;
    font-size: 12px;
    box-shadow: 0 1px 1px 0px rgba(0, 0, 0, 0.1);
    flex-shrink: 0;
    margin-left: 10px;
  }
`;
