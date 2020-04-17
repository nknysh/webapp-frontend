import React, { useCallback } from 'react';
import DateRangeInput from 'pureUi/DateRangeInput';
import { CloseButton, AddButton, RemoveButton, ActionButton } from '../../Buttons/index';
import { DatePickerStateProvider, IDatePickerSateParams } from 'pureUi/providers/DatePickerStateProvider';
import styled from 'styled-components';

export interface IMultiDateRangeProps extends React.HTMLAttributes<HTMLDivElement> {
  dateRanges: string[][];
  enablePastDates?: boolean;
  onNewDate: () => void;
  onRemoveDate: (idx: number) => void;
  onDateChange: (dates: string[][]) => void;
}

export const MultiDateRangeComponent = (props: IMultiDateRangeProps): JSX.Element => {
  const handleRemoveDate = useCallback(
    (idx: number) => () => {
      props.onRemoveDate(idx);
    },
    [props]
  );

  const handleDateChange = useCallback(
    (idx: number) => (newDate: string[]) => {
      const newDates = props.dateRanges.map((d, i) => (i === idx ? newDate : d));
      props.onDateChange(newDates);
    },
    [props]
  );

  return (
    <div className={props.className}>
      {props.dateRanges.map((selectedDates, idx) => {
        return (
          <div key={`${idx}-${selectedDates[0]}-${selectedDates[selectedDates.length - 1]}`} className="row">
            <DatePickerStateProvider
              defaultSelectedDates={selectedDates}
              onDateChange={handleDateChange(idx)}
              render={(params: IDatePickerSateParams) => (
                <DateRangeInput
                  displayString={params.displayString}
                  currentDate={params.datePickerCurrentDate}
                  totalNights={params.totalNights}
                  selectedDates={params.selectedDates}
                  onDayClick={params.handleDayClick}
                  onDayMouseOver={params.handleDateMouseOver}
                  showDatePicker={params.showDatePicker}
                  onNextClick={params.incrementDate}
                  onPrevClick={params.decrementDate}
                  onMouseDown={params.toggleDatePicker}
                  onClickOutside={params.hideDatePicker}
                  enablePastDates={Boolean(props.enablePastDates)}
                />
              )}
            />
            <CloseButton data-role="removeAtIndexButton" onClick={handleRemoveDate(idx)}>
              Delete
            </CloseButton>
          </div>
        );
      })}
      <ActionButton action="add" data-role="addButton" onClick={props.onNewDate}>
        Add Date Range
      </ActionButton>
    </div>
  );
};

export const MultiDateRange = styled(MultiDateRangeComponent)`
  .row {
    display: grid;
    grid-template-columns: auto 24px;
    align-items: center;
    grid-gap: 20px;
    margin-bottom: 20px;
  }

  [data-role='addButton'] {
  }

  [data-role='removeAtIndexButton'] {
    align-self: right;
  }
`;
