export const DATE_RANGE_SELECT_START = 'datePickerState/DATE_SELECT_START';
export const DATE_RANGE_SELECT_END = 'datePickerState/DATE_RANGE_SELECT_END';
export const DATE_RANGE_CHANGE = 'datePickerState/DATE_RANGE_CHANGE';
export const INCREMENT_CURRENT_DATE = 'datePickerState/INCREMENT_CURRENT_DATE';
export const TOGGLE_DATE_PICKER = 'datePickerState/TOGGLE_DATE_PICKER';
export const SET_DATE_PICKER_VISIBILITY = 'datePickerState/SET_DATE_PICKER_VISIBILITY';
export const RESET_DATEPICKER_STATE = 'datePickerState/RESET_DATEPICKER_STATE';

export type ToggleDatePickerAction = ReturnType<typeof toggleDatePickerAction>;
export const toggleDatePickerAction = () => ({
  type: TOGGLE_DATE_PICKER as typeof TOGGLE_DATE_PICKER,
});

export type SetDatePickerVisibilityAction = ReturnType<typeof setDatePickerVisibilityAction>;
export const setDatePickerVisibilityAction = (visible: boolean) => ({
  type: SET_DATE_PICKER_VISIBILITY as typeof SET_DATE_PICKER_VISIBILITY,
  visible,
});

export type DateRangeSelectStartAction = ReturnType<typeof dateRangeSelectStartAction>;
export const dateRangeSelectStartAction = (date: string, isSingleDateSelection: boolean) => ({
  type: DATE_RANGE_SELECT_START as typeof DATE_RANGE_SELECT_START,
  date,
  isSingleDateSelection,
});

export type DateRangeSelectEndAction = ReturnType<typeof dateRangeSelectEndAction>;
export const dateRangeSelectEndAction = (date: string) => ({
  type: DATE_RANGE_SELECT_END as typeof DATE_RANGE_SELECT_END,
  date,
});

export type DateRangeChangeAction = ReturnType<typeof dateRangeChangeAction>;
export const dateRangeChangeAction = (date: string) => ({
  type: DATE_RANGE_CHANGE as typeof DATE_RANGE_CHANGE,
  date,
});

export type IncrementCurrentDateAction = ReturnType<typeof incrementCurrentDateAction>;
export const incrementCurrentDateAction = (step: number) => ({
  type: INCREMENT_CURRENT_DATE as typeof INCREMENT_CURRENT_DATE,
  step,
});

export type ResetDatePickerStateAction = ReturnType<typeof resetDatePickerStateAction>;
export const resetDatePickerStateAction = () => {
  return {
    type: RESET_DATEPICKER_STATE as typeof RESET_DATEPICKER_STATE,
  };
};

export type DatePickerStateAction =
  | DateRangeSelectStartAction
  | DateRangeSelectEndAction
  | DateRangeChangeAction
  | IncrementCurrentDateAction
  | ToggleDatePickerAction
  | SetDatePickerVisibilityAction
  | ResetDatePickerStateAction;
