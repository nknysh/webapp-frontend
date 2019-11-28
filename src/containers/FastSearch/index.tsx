import React, { FormEvent } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import StyledFastSearchContainer from './styles';
import SearchSettings from 'pureUi/SearchSettings';
import PredictiveTextInput from 'pureUi/PredictiveTextInput';
import { RangeValueType } from 'pureUi/RangeInput';
import { LodgingsEditor } from '../../pureUi/LodgingsEditor/index';
import SidebarGroup from 'pureUi/SidebarGroup';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { Heading2 } from 'styles';
import { PrimaryButton } from 'pureUi/Buttons';
import SearchResultList from 'pureUi/SearchResultsList';
import DateRangeInput from 'pureUi/DateRangeInput';
import { Icon } from '@material-ui/core';
import Checkbox from 'pureUi/Checkbox';

import {
  initializeQueryAction,
  searchOptionsSelector,
  optionsRequestAction,
  offersSearchRequestAction,
  searchOptionsPendingSelector,
  searchOptionsErrorSelector,
  orderedSearchResults,
  offersQuerySelector,
  activeFiltersSelector,
  offersSearchPendingSelector,
  priceRangeSelector,
  showRegionsSelector,
  toggleFilterAction,
  setAllFiltersAction,
  minPriceChangeAction,
  maxPriceChangeAction,
  toggleStarRatingAction,
  selectMealPlanAction,
  toggleOccasionAction,
  toggleShowRegionsAction,
  toggleRegionAction,
  toggleHighlightsAction,
  destinationChangeAction,
  incrementRoomAction,
  incrementAdultAction,
  incrementChildAction,
  setAgeAction,
  setActiveLodgingIndexAction,
  activeLodingIndexSelector,
  expandedHighlightsSelector,
  totalGuestCountSelector,
  incrementActiveLodgingIndexAction,
  toggleLodgingControlsAction,
  setLodgingControlsVisibilityAction,
  showLodgingControlsSelector,
  nameSearchResultsSelector,
  setNamesSearchResultsVisibilityAction,
  showNameSearchResultsSelector,
  totalStayNightsSelector,
  dateRangeSelector,
  dateRangeDisplayStringSelector,
  selectedDatesSelector,
  datePickerCurrentDateSelector,
  dateRangeSelectStartAction,
  dateRangeSelectEndAction,
  dateRangeChangeAction,
  dateSelectionInProgressSelector,
  incrementCurrentDateAction,
  showDatePickerSelector,
  toggleDatePickerAction,
  setDatePickerVisibilityAction,
  isRepeatGuestSelector,
  toggleRepeatGuestAction,
  queryHasChangedSelector,
  canSearchSelector
} from 'store/modules/fastSearch';

import { clearBookingBuilderAction } from 'store/modules/bookingBuilder';

export class FastSearchContainer extends React.PureComponent<FastSearchProps, {}> {
  componentDidMount() {
    if (!this.props.searchOptions) {
      this.props.getOptions();
    }

    if (window.location.search && !this.props.searchResults) {
      this.props.initializeQuery(window.location.search.replace('?', ''));
    }

    if (!window.location.search && !this.props.searchResults) {
      this.props.getOffers(this.props.searchQuery);
      clearBookingBuilderAction();
    }

    if (this.props.searchResults && this.props.queryHasChanged) {
      this.props.getOffers(this.props.searchQuery);
      clearBookingBuilderAction();
    }

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

  // ---------------------------------------------------

  handleRemoveAllFilters = () => {
    this.props.setAllFilters(false);
  };

  handlePriceRangeChange = (type: RangeValueType, value: string) => {
    if (!isNaN(parseInt(value))) {
      const action = type === 'min' ? this.props.minPriceChange : this.props.maxPriceChange;
      action(parseInt(value, 10));
    }
  };

  handleSearchResultClick = (hotelUuid: string) => {
    this.props.history.push(`/hotels/${hotelUuid}`);
  };

  renderSideBar = () => (
    <div className="sidebar">
      <SidebarGroup>
        {this.props.optionsRequestPending && <h2>Options Loading</h2>}
        {!this.props.optionsRequestPending && this.props.optionsRequestError && (
          <h2>{this.props.optionsRequestError!.errors.map(e => e.title)}</h2>
        )}

        <label className="basicSearchLabel">
          <span>Destination or Resort</span>
          <PredictiveTextInput
            placeholder="Where to"
            value={this.props.searchQuery.name!}
            onChange={this.handleDestinationChange}
            options={this.props.nameSearchResults}
            onOptionSelect={this.props.destinationChange}
            showDropDown={this.props.showNameSearchResults}
            onFocus={this.handleShowNameSearchDropDown(true)}
            onBlur={this.handleShowNameSearchDropDown(false)}
          />
        </label>

        <label className="basicSearchLabel">
          <span>Lodgings *</span>
          <LodgingsEditor
            showControls={this.props.showLodgingControls}
            lodgings={this.props.searchQuery.lodgings}
            activeLodgingIndex={this.props.activeLodingIndex}
            onIncrementIndex={this.props.incrementActiveLodgingIndex}
            onTabSelect={this.props.setActiveLodgingIndex}
            onIncrementRoomCount={this.props.incrementRoom}
            onIncrementAdultCount={this.props.incrementAdult}
            onIncrementChildCount={this.props.incrementChild}
            onChildAgeChange={this.props.setAge}
            totalGuestCount={this.props.totalGuestCount}
            onClick={this.handleToggleLodgingControls}
            onClickOutside={this.handleSetLogdingControlsVisibility(false)}
          />
        </label>

        <label className="basicSearchLabel">
          <span>Dates *</span>
          <DateRangeInput
            displayString={this.props.dateRangeDisplayString}
            currentDate={this.props.currentDate}
            totalNights={this.props.totalStayNights}
            selectedDates={this.props.selectedDates}
            onDayClick={this.handleDayClick}
            onDayMouseOver={this.handleDateMouseOver}
            showDatePicker={this.props.showDatePicker}
            onNextClick={this.handleIncrementCurrentDate(1)}
            onPrevClick={this.handleIncrementCurrentDate(-1)}
            onClick={this.handleToggleDatePicker}
            onClickOutside={this.handleSetDatePickerVisibility(false)}
          />
        </label>

        <label className="basicSearchLabel repeatGuest">
          <span className="label">Repeat Guest</span>
          <Checkbox checked={this.props.isRepeatGuest} onChange={this.props.toggleRepeatGuest} />
        </label>

        <PrimaryButton className="searchButton" disabled={!this.props.canSearch} onClick={this.handleSubmit}>
          Search
        </PrimaryButton>
      </SidebarGroup>

      {this.props.searchOptions && (
        <SearchSettings
          options={this.props.searchOptions}
          query={this.props.searchQuery}
          showRegions={this.props.showRegions}
          onFilterChange={this.props.toggleFilter}
          onStarRatingChange={this.props.toggleStarRating}
          onOccasionChange={this.props.toggleOccasion}
          onMealPlanChange={this.props.selectMealPlan}
          onToggleShowRegions={this.props.toggleShowRegions}
          onRegionChange={this.props.toggleRegion}
          canSubmit={this.props.searchPending}
          onRemoveAllFilters={this.handleRemoveAllFilters}
          onPriceRangeChange={this.handlePriceRangeChange}
          onSubmit={this.handleSubmit}
        />
      )}
      <SidebarGroup>
        <PrimaryButton className="searchButton" disabled={false} onClick={this.handleSubmit}>
          Search
        </PrimaryButton>
      </SidebarGroup>
    </div>
  );

  renderResults = () => {
    if (!this.props.searchResults) {
      return null;
    }

    if (!this.props.searchResults.length) {
      return <h3>No results</h3>;
    }

    return (
      <SearchResultList
        searchResults={this.props.searchResults}
        expandedHighlights={this.props.expandedHighlights}
        onToggleHighlights={this.props.toggleHighlights}
        onNavigateToHotel={this.handleSearchResultClick}
      />
    );
  };

  render() {
    if (!this.props.searchOptions) {
      return null;
    }

    return (
      <StyledFastSearchContainer>
        <Link to="/" className="backButton">
          <Icon className="backIcon">chevron_left</Icon>Back to Homepage
        </Link>
        {this.props.searchPending && <Heading2 className="heading">Loading...</Heading2>}
        {!this.props.searchPending && (
          <Heading2 className="heading">Search Results {this.props.searchResults!.length}</Heading2>
        )}
        <div className="sideBar">{this.renderSideBar()}</div>

        <div className="searchResults">
          <div className="resultsGrid">{this.renderResults()}</div>
        </div>
      </StyledFastSearchContainer>
    );
  }
}

// -----------------------------------------------------------------------------
// Prop Typings
// -----------------------------------------------------------------------------
export type StateToProps = ReturnType<typeof mapStateToProps>;
export type DispatchToProps = typeof actionCreators;
export interface FastSearchProps extends StateToProps, DispatchToProps, RouteComponentProps {
  className: string;
}

const mapStateToProps = createStructuredSelector({
  optionsRequestPending: searchOptionsPendingSelector,
  optionsRequestError: searchOptionsErrorSelector,
  searchOptions: searchOptionsSelector,
  searchPending: offersSearchPendingSelector,
  searchResults: orderedSearchResults,
  searchQuery: offersQuerySelector,
  activeFilters: activeFiltersSelector,
  priceRange: priceRangeSelector,
  showRegions: showRegionsSelector,
  activeLodingIndex: activeLodingIndexSelector,
  expandedHighlights: expandedHighlightsSelector,
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
  queryHasChanged: queryHasChangedSelector,
  canSearch: canSearchSelector
});

const actionCreators = {
  getOptions: optionsRequestAction,
  getOffers: offersSearchRequestAction,
  toggleFilter: toggleFilterAction,
  setAllFilters: setAllFiltersAction,
  minPriceChange: minPriceChangeAction,
  maxPriceChange: maxPriceChangeAction,
  toggleStarRating: toggleStarRatingAction,
  toggleOccasion: toggleOccasionAction,
  selectMealPlan: selectMealPlanAction,
  toggleShowRegions: toggleShowRegionsAction,
  toggleRegion: toggleRegionAction,
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
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

// -----------------------------------------------------------------------------
// Connected
// -----------------------------------------------------------------------------
const withConnect = connect<StateToProps, DispatchToProps, FastSearchProps>(
  mapStateToProps,
  mapDispatchToProps
);

export const FastSearchContainerConnected = compose(
  withConnect,
  withRouter
)(FastSearchContainer);
