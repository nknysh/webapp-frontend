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
  isPristine: boolean;
}

export const datePickerStateReducer = (
  state: IDatePickerState,
  action: Actions.DatePickerStateAction
): IDatePickerState => {
  switch (action.type) {
    case Actions.RESET_DATEPICKER_STATE:
      return {
        isPristine: true,
        showDatePicker: false,
        datePickerCurrentDate: new Date().toISOString(),
        dateSelectionInProgress: false,
        anchorDate: undefined,
        startDate: '',
        endDate: '',
        selectedDates: [],
        totalNights: 0,
        displayString: 'Select dates...',
      };

    case Actions.DATE_RANGE_SELECT_START:
      return {
        ...state,
        dateSelectionInProgress: action.isSingleDateSelection ? false : true,
        showDatePicker: action.isSingleDateSelection ? false : true,
        anchorDate: action.date,
        startDate: action.date,
        endDate: action.date,
        displayString: getDateRangeDisplayString(action.date, action.date),
        selectedDates: [action.date],
        totalNights: 0,
        isPristine: false,
      };

    case Actions.DATE_RANGE_CHANGE:
    case Actions.DATE_RANGE_SELECT_END:
      const isFutureDate = !state.anchorDate || action.date <= state.anchorDate! ? false : true;
      const newStartDate = isFutureDate ? state.anchorDate! : action.date;
      const newEndDate = isFutureDate ? action.date : state.anchorDate!;
      const adjustedEndDate =
        action.type === Actions.DATE_RANGE_SELECT_END && newStartDate === newEndDate
          ? addDays(new Date(newEndDate), 1).toISOString()
          : newEndDate;

      const totalNights = differenceInCalendarDays(new Date(adjustedEndDate), new Date(newStartDate!));
      const firstTimestamp = new Date(newStartDate!).getTime();
      const selectedDates = DateHelper.generateDatesFrom(firstTimestamp, totalNights + 1, 'en-US').map(
        d => d.dateString
      );

      return {
        ...state,
        dateSelectionInProgress: action.type === Actions.DATE_RANGE_CHANGE ? true : false,
        showDatePicker: action.type === Actions.DATE_RANGE_SELECT_END ? false : true,
        startDate: newStartDate,
        endDate: adjustedEndDate,
        selectedDates,
        totalNights,
        displayString: getDateRangeDisplayString(newStartDate, adjustedEndDate),
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
