import React, { FormEvent } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import qs from 'qs';

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
  toggleRepeatGuestAction,
  dateRangeChangeAction,
} from 'store/modules/fastSearch';

import { isSR } from 'store/modules/auth';

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
  canSearch: canSearchSelector,
  isSr: isSR,
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
  initializeQuery: initializeQueryAction,
  toggleRepeatGuest: toggleRepeatGuestAction,
  clearBookingBuilderAction,
  clearExtendedQuery: clearExtendedQueryAction,
  dateRangeChangeAction,
};

export interface IWithBasicSearchHandlers {
  handleDestinationChange: (e: FormEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  handleNavigateToSearch: () => void;
  handleToggleLodgingControls: () => void;
  handleSetLogdingControlsVisibility: (visible: boolean) => (e: any) => void;
  handleShowNameSearchDropDown: (visible: boolean) => (e: any) => void;
  toggleRepeatGuest: () => void;
  handleDateChange: (dates: string[]) => void;
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

    handleShowNameSearchDropDown = (visible: boolean) => () => {
      this.props.setNamesSearchResultsVisibility(visible);
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
            handleShowNameSearchDropDown: this.handleShowNameSearchDropDown,
            handleDateChange: this.props.dateRangeChangeAction,
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

  const composed = compose(withRouter, withConnect)(instance);

  return hoistNonReactStatics(composed, WrappedComponent);
};

export default WithBasicSearch;
