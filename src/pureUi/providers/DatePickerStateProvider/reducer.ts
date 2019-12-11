import * as Actions from './actions';
import { addDays, addMonths, differenceInCalendarDays } from 'date-fns';
import { DateHelper } from 'pureUi/DatePicker';
import { getDateRangeDisplayString } from './utils';

export interface IDatePickerState {
  showDatePicker: boolean;
  datePickerCurrentDate: string;
  dateSelectionInProgress: boolean;
  anchorDate?: string | undefined;
  startDate: string;
  endDate: string;
  selectedDates: string[];
  totalNights: number;
  displayString: string;
}

export const datePickerStateReducer = (
  state: IDatePickerState,
  action: Actions.DatePickerStateAction
): IDatePickerState => {
  switch (action.type) {
    case Actions.DATE_RANGE_SELECT_START:
      return {
        ...state,
        dateSelectionInProgress: true,
        anchorDate: action.date,
        startDate: action.date,
        endDate: action.date,
        displayString: getDateRangeDisplayString(state.startDate, state.endDate),
      };

    case Actions.DATE_RANGE_CHANGE:
    case Actions.DATE_RANGE_SELECT_END:
      const isFutureDate = !state.anchorDate || action.date <= state.anchorDate! ? false : true;
      const newStartDate = isFutureDate ? state.anchorDate! : action.date;
      const newEndDate = isFutureDate ? action.date : state.anchorDate!;
      const totalNights = differenceInCalendarDays(new Date(newEndDate), new Date(newStartDate!));
      const firstTimestamp = new Date(newStartDate!).getTime();
      const selectedDates = DateHelper.generateDatesFrom(firstTimestamp, totalNights + 1, 'en-US').map(
        d => d.dateString
      );

      return {
        ...state,
        dateSelectionInProgress: action.type === Actions.DATE_RANGE_CHANGE ? true : false,
        // TODO: Figure out how to block the toggleDatePicker action that prevents us closing the datepicker
        showDatePicker: action.type === Actions.DATE_RANGE_CHANGE ? true : false,
        startDate: newStartDate,
        endDate: newEndDate,
        selectedDates,
        totalNights,
        displayString: getDateRangeDisplayString(newStartDate, newEndDate),
      };

    case Actions.INCREMENT_CURRENT_DATE:
      const currentDateObj = new Date(state.datePickerCurrentDate);
      return {
        ...state,
        datePickerCurrentDate:
          action.step > 0 ? addMonths(currentDateObj, 1).toISOString() : addMonths(currentDateObj, -1).toISOString(),
      };

    case Actions.TOGGLE_DATE_PICKER:
      return {
        ...state,
        showDatePicker: !state.showDatePicker,
      };

    case Actions.SET_DATE_PICKER_VISIBILITY:
      return {
        ...state,
        showDatePicker: action.visible,
      };

    default:
      return state;
  }
};
