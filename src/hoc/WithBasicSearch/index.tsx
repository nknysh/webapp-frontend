import React, { FormEvent } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import qs from 'qs';
import { FastSearchDomain } from '../../store/modules/fastSearch/model';

import {
  // Selectors
  orderedSearchResults,
  offersQuerySelector,
  offersSearchPendingSelector,
  activeLodingIndexSelector,
  totalGuestCountSelector,
  showLodgingControlsSelector,
  nameSearchResultsSelector,
  showNameSearchResultsSelector,
  totalStayNightsSelector,
  dateRangeSelector,
  dateRangeDisplayStringSelector,
  selectedDatesSelector,
  datePickerCurrentDateSelector,
  dateSelectionInProgressSelector,
  showDatePickerSelector,
  isRepeatGuestSelector,
  canSearchSelector,

  // Actions
  initializeQueryAction,
  clearExtendedQueryAction,
  offersSearchRequestAction,
  toggleHighlightsAction,
  destinationChangeAction,
  incrementRoomAction,
  incrementAdultAction,
  incrementChildAction,
  setAgeAction,
  setActiveLodgingIndexAction,
  incrementActiveLodgingIndexAction,
  toggleLodgingControlsAction,
  setLodgingControlsVisibilityAction,
  setNamesSearchResultsVisibilityAction,
  dateRangeSelectStartAction,
  dateRangeSelectEndAction,
  dateRangeChangeAction,
  incrementCurrentDateAction,
  toggleDatePickerAction,
  setDatePickerVisibilityAction,
  toggleRepeatGuestAction,
} from 'store/modules/fastSearch';

import { clearBookingBuilderAction } from 'store/modules/bookingBuilder';

// Connect to the store
// ---------------------------------------------------------------------------------------------------------------
const mapStateToProps = createStructuredSelector<any, any>({
  searchPending: offersSearchPendingSelector,
  searchResults: orderedSearchResults,
  searchQuery: offersQuerySelector,
  activeLodingIndex: activeLodingIndexSelector,
  totalGuestCount: totalGuestCountSelector,
  showLodgingControls: showLodgingControlsSelector,
  nameSearchResults: nameSearchResultsSelector,
  showNameSearchResults: showNameSearchResultsSelector,
  totalStayNights: totalStayNightsSelector,
  dateRange: dateRangeSelector,
  dateRangeDisplayString: dateRangeDisplayStringSelector,
  selectedDates: selectedDatesSelector,
  currentDate: datePickerCurrentDateSelector,
  dateSelectionInProgress: dateSelectionInProgressSelector,
  showDatePicker: showDatePickerSelector,
  isRepeatGuest: isRepeatGuestSelector,
  canSearch: canSearchSelector
});

const actionCreators = {
  getOffers: offersSearchRequestAction,
  destinationChange: destinationChangeAction,
  incrementRoom: incrementRoomAction,
  incrementAdult: incrementAdultAction,
  incrementChild: incrementChildAction,
  setAge: setAgeAction,
  setActiveLodgingIndex: setActiveLodgingIndexAction,
  toggleHighlights: toggleHighlightsAction,
  incrementActiveLodgingIndex: incrementActiveLodgingIndexAction,
  toggleLodgingControls: toggleLodgingControlsAction,
  setLodgingControlsVisibility: setLodgingControlsVisibilityAction,
  setNamesSearchResultsVisibility: setNamesSearchResultsVisibilityAction,
  dateRangeSelectStart: dateRangeSelectStartAction,
  dateRangeSelectEnd: dateRangeSelectEndAction,
  dateRangeChange: dateRangeChangeAction,
  incrementCurrentDate: incrementCurrentDateAction,
  toggleDatePicker: toggleDatePickerAction,
  setDatePickerVisibility: setDatePickerVisibilityAction,
  initializeQuery: initializeQueryAction,
  toggleRepeatGuest: toggleRepeatGuestAction,
  clearBookingBuilderAction,
  clearExtendedQuery: clearExtendedQueryAction
};

export interface IWithBasicSearchHandlers {
  handleDestinationChange: (e: FormEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  handleNavigateToSearch: () => void;
  handleToggleLodgingControls: () => void;
  handleSetLogdingControlsVisibility: (visible: boolean) => (e: any) => void;
  handleToggleDatePicker: () => void;
  handleSetDatePickerVisibility: (visible: boolean) => (e: any) => void;
  handleShowNameSearchDropDown: (visible: boolean) => (e: any) => void;
  handleDayClick: (date: string) => void;
  handleDateMouseOver: (date: string) => void;
  handleIncrementCurrentDate: (step: number) => (e: any) => void;
  toggleRepeatGuest: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);
type IStateToProps = ReturnType<typeof mapStateToProps>;
type IDispatchToProps = typeof actionCreators;
export interface IWithBasicSearchProps extends IStateToProps, IDispatchToProps, RouteComponentProps {
  basicSearchHandlers: IWithBasicSearchHandlers;
}

// ----------------------------------------------------------
// For testing purposes, create the class with a function so
// we can test the unconnected version
// ----------------------------------------------------------
export const makeWithBasicSearch = (WrappedComponent: any) =>
  class WithBasicSearch extends React.Component<IWithBasicSearchProps> {
    static displayName = `WithBasicSearch(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
    componentDidMount() {
      if (this.props.searchQuery.name === '') {
        this.props.destinationChange('');
      }
    }
    handleDestinationChange = (e: FormEvent<HTMLInputElement>) => {
      this.props.destinationChange(e.currentTarget.value);
    };

    handleSubmit = () => {
      this.props.getOffers(this.props.searchQuery);
      clearBookingBuilderAction();
    };

    handleNavigateToSearch = () => {
      this.props.clearExtendedQuery();
      this.props.history.push(`/search/beta/?${qs.stringify(this.props.searchQuery)}`);
    };

    handleToggleLodgingControls = () => {
      this.props.toggleLodgingControls();
    };

    handleSetLogdingControlsVisibility = (visible: boolean) => () => {
      this.props.setLodgingControlsVisibility(visible);
    };

    handleToggleDatePicker = () => {
      if (!this.props.showDatePicker) {
        this.props.toggleDatePicker();
      }
    };

    handleSetDatePickerVisibility = (visible: boolean) => () => {
      if (visible === false && this.props.dateSelectionInProgress) {
        return;
      }
      this.props.setDatePickerVisibility(visible);
    };

    handleShowNameSearchDropDown = (visible: boolean) => () => {
      this.props.setNamesSearchResultsVisibility(visible);
    };

    handleDayClick = (date: string) => {
      if (this.props.dateSelectionInProgress) {
        this.props.dateRangeSelectEnd(date, this.props.dateRange.start);
      } else {
        this.props.dateRangeSelectStart(date);
      }
    };

    handleDateMouseOver = (date: string) => {
      if (this.props.dateSelectionInProgress) {
        this.props.dateRangeChange(date, this.props.dateRange.start);
      }
    };

    handleIncrementCurrentDate = (step: number) => () => {
      this.props.incrementCurrentDate(step);
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          basicSearchHandlers={{
            handleDestinationChange: this.handleDestinationChange,
            handleSubmit: this.handleSubmit,
            handleNavigateToSearch: this.handleNavigateToSearch,
            handleToggleLodgingControls: this.handleToggleLodgingControls,
            handleSetLogdingControlsVisibility: this.handleSetLogdingControlsVisibility,
            handleToggleDatePicker: this.handleToggleDatePicker,
            handleSetDatePickerVisibility: this.handleSetDatePickerVisibility,
            handleShowNameSearchDropDown: this.handleShowNameSearchDropDown,
            handleDayClick: this.handleDayClick,
            handleDateMouseOver: this.handleDateMouseOver,
            handleIncrementCurrentDate: this.handleIncrementCurrentDate,
          }}
        />
      );
    }
  };

export const WithBasicSearch = () => WrappedComponent => {
  const instance = makeWithBasicSearch(WrappedComponent);
  const withConnect = connect<IWithBasicSearchProps, IStateToProps, IDispatchToProps>(
    mapStateToProps,
    mapDispatchToProps
  );

  const composed = compose(
    withRouter,
    withConnect
  )(instance);

  return hoistNonReactStatics(composed, WrappedComponent);
};

export default WithBasicSearch;
