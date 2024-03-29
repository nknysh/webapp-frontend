import { useReducer, useCallback, useEffect } from 'react';
import { datePickerStateReducer, IDatePickerState } from './reducer';
import * as Actions from './actions';
import { getDateRangeDisplayString } from './utils';

// TODO:
// This component/provider needs to use the Redux reducer.
// This method makes it impossible to manipulate the stat6e
// of the datepicker externally without providing hacky callbacks.

export interface IDatePickerSateParams extends IDatePickerState {
  handleDayClick: (date: string) => void;
  handleDateMouseOver?: (date: string) => void;
  toggleDatePicker: () => void;
  hideDatePicker: () => void;
  incrementDate: (step: number) => void;
  decrementDate: (step: number) => void;
  resetDatePickerState: () => void;
}

export interface IDatePickerSateProviderProps {
  isSingleDateSelection?: boolean;
  defaultSelectedDates: string[];
  onDateChange: (dateStrings: string[]) => any;
  render: (state: IDatePickerSateParams) => any;
}

export const DatePickerStateProvider = (props: IDatePickerSateProviderProps) => {
  const initialState: IDatePickerState = {
    isPristine: true,
    showDatePicker: false,
    datePickerCurrentDate: props.defaultSelectedDates[0] || new Date().toISOString(),
    dateSelectionInProgress: false,
    anchorDate: undefined,
    startDate: props.defaultSelectedDates[0],
    endDate: props.defaultSelectedDates[props.defaultSelectedDates.length - 1],
    selectedDates: props.defaultSelectedDates,
    totalNights: Math.max(0, props.defaultSelectedDates.length - 1),
    displayString: getDateRangeDisplayString(
      props.defaultSelectedDates[0],
      props.defaultSelectedDates[props.defaultSelectedDates.length - 1]
    ),
  };

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
        dispatch(Actions.dateRangeSelectStartAction(date, Boolean(props.isSingleDateSelection)));
      } else {
        dispatch(Actions.dateRangeSelectEndAction(date));
      }
    },
    [state.dateSelectionInProgress]
  );

  // useReducers dispatch method is async, so in order to call
  // the onDateChange callback with the correct dates, we need to
  // treat it as a sideEffect, hence this useEffect.
  useEffect(() => {
    if (
      (!state.isPristine && props.isSingleDateSelection) ||
      (!state.isPristine && !state.showDatePicker && !state.dateSelectionInProgress)
    ) {
      props.onDateChange(state.selectedDates);
    }
  }, [state.dateSelectionInProgress, state.showDatePicker, state.selectedDates, state.isPristine]);

  const handleDateMouseOver = useCallback(
    (date: string) => {
      if (state.dateSelectionInProgress) {
        dispatch(Actions.dateRangeChangeAction(date));
      }
    },
    [state.dateSelectionInProgress]
  );

  const resetDatePickerState = useCallback(() => {
    dispatch(Actions.resetDatePickerStateAction());
  }, [state.dateSelectionInProgress]);

  return props.render({
    ...state,
    toggleDatePicker,
    hideDatePicker,
    incrementDate: incrementDate(1),
    decrementDate: incrementDate(-1),
    handleDayClick,
    handleDateMouseOver,
    resetDatePickerState,
  });
};
