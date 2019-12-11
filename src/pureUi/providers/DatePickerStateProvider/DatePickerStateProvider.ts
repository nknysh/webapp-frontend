import { useReducer, useCallback, useEffect } from 'react';
import { datePickerStateReducer, IDatePickerState } from './reducer';
import * as Actions from './actions';
import { getDateRangeDisplayString } from './utils';

export interface IDatePickerSateParams extends IDatePickerState {
  handleDayClick: (date: string) => void;
  handleDateMouseOver: (date: string) => void;
  toggleDatePicker: () => void;
  hideDatePicker: () => void;
  incrementDate: (step: number) => void;
  decrementDate: (step: number) => void;
}

export interface IDatePickerSateProviderProps {
  defaultSelectedDates: string[];
  onDateChange: (dateStrings: string[]) => any;
  render: (state: IDatePickerSateParams) => any;
}

export const DatePickerStateProvider = (props: IDatePickerSateProviderProps) => {
  const initialState: IDatePickerState = {
    showDatePicker: false,
    datePickerCurrentDate: new Date().toISOString(),
    dateSelectionInProgress: false,
    anchorDate: undefined,
    startDate: props.defaultSelectedDates[0],
    endDate: props.defaultSelectedDates[props.defaultSelectedDates.length - 1],
    selectedDates: props.defaultSelectedDates,
    totalNights: props.defaultSelectedDates.length,
    displayString: getDateRangeDisplayString(
      props.defaultSelectedDates[0],
      props.defaultSelectedDates[props.defaultSelectedDates.length - 1]
    ),
  };

  console.log('props.defaultSelectedDates', props.defaultSelectedDates.length);

  const [state, dispatch] = useReducer(datePickerStateReducer, initialState);

  const incrementDate = useCallback(
    (step: number) => () => {
      dispatch(Actions.incrementCurrentDateAction(step));
    },
    [state.datePickerCurrentDate]
  );

  const toggleDatePicker = useCallback(() => {
    dispatch(Actions.toggleDatePickerAction());
  }, [state.showDatePicker]);

  const hideDatePicker = useCallback(() => {
    !state.dateSelectionInProgress && dispatch(Actions.setDatePickerVisibilityAction(false));
  }, [state.dateSelectionInProgress]);

  const handleDayClick = useCallback(
    async (date: string) => {
      if (!state.dateSelectionInProgress) {
        dispatch(Actions.dateRangeSelectStartAction(date));
      } else {
        dispatch(Actions.dateRangeSelectEndAction(date));
      }
    },
    [state.dateSelectionInProgress]
  );

  // useReducers dispatch method is async, so in order to call
  // the onDateChange prop with the correct dates, we need to
  // treat it as a sideEffect, hence this useEffect.
  useEffect(() => {
    if (!state.dateSelectionInProgress) {
      props.onDateChange(state.selectedDates);
    }
  }, [state.selectedDates, state.dateSelectionInProgress]);

  const handleDateMouseOver = useCallback(
    (date: string) => {
      if (state.dateSelectionInProgress) {
        dispatch(Actions.dateRangeChangeAction(date));
      }
    },
    [state.dateSelectionInProgress]
  );

  return props.render({
    ...state,
    toggleDatePicker,
    hideDatePicker,
    incrementDate: incrementDate(1),
    decrementDate: incrementDate(-1),
    handleDayClick,
    handleDateMouseOver,
  });
};
