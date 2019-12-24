import * as Actions from './actions';
import { initialState, IBookingsListDomain } from './model';

const bookingListReducer = (
  state: IBookingsListDomain = initialState,
  action: Actions.BookingsListAction
): IBookingsListDomain => {
  switch (action.type) {
    case Actions.GET_BOOKING_LIST_REQUEST:
      return {
        ...state,
        requestPending: true,
        totalResults: 0,
        bookings: null,
      };

    case Actions.GET_BOOKING_LIST_SUCCESS:
      return {
        ...state,
        requestPending: false,
        totalResults: action.totalResults,
        bookings: action.bookings,
        error: null,
      };

    case Actions.GET_BOOKING_LIST_FAILURE:
      return {
        ...state,
        requestPending: false,
        error: action.error,
      };

    case Actions.SET_FILTER:
      return {
        ...state,
        currentPage: 0,
        filter: action.filter,
      };

    case Actions.SET_PAGE_NUMBER:
      return {
        ...state,
        currentPage: action.pageNumber,
      };

    case Actions.SET_SORT:
      return {
        ...state,
        sortBy: action.sortBy,
        sortOrder: action.sortOrder,
      };
    case Actions.SET_TRAVEL_AGENT_UUID:
      return {
        ...state,
        travelAgentUuid: action.travelAgentUuid,
      };
    case Actions.SET_HOTEL:
      return {
        ...state,
        hotel: action.hotel,
      };
    case Actions.SET_STATUS:
      return {
        ...state,
        bookingStatus: action.status,
      };

    default:
      return state;
  }
};

export default bookingListReducer;
