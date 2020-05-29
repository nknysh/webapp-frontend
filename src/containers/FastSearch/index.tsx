import React, { FormEvent } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import StyledFastSearchContainer from './styles';
import SearchSettings from 'pureUi/SearchSettings';
import PredictiveTextInput from 'pureUi/PredictiveTextInput';
import { RangeValueType } from 'pureUi/RangeInput';
import { LodgingsEditor } from 'pureUi/LodgingsEditor/index';
import SidebarGroup from 'pureUi/SidebarGroup';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { Heading2 } from 'styles';
import { PrimaryButton } from 'pureUi/Buttons';
import SearchResultList from 'pureUi/SearchResultsList';
import DateRangeInput from 'pureUi/DateRangeInput';
import { Icon } from '@material-ui/core';
import Checkbox from 'pureUi/Checkbox';
import { clearBookingBuilderAction } from 'store/modules/bookingBuilder';
import { DatePickerStateProvider, IDatePickerSateParams } from 'pureUi/providers/DatePickerStateProvider';

import { getTaFullName } from '../../store/utils';

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
  selectedDatesSelector,
  isRepeatGuestSelector,
  toggleRepeatGuestAction,
  queryHasChangedSelector,
  canSearchSelector,
  dateRangeChangeAction,
  updateQueryStringAction,
  resetSearchQueryAction,
  taCompaniesRequestAction,
  taCompanyChangeAction,
  selectedTaChangeAction,
  taCompaniesSelector,
  taNamesSelector,
  travelAgentsSelector,
  isFetchingTaSelector,
  selectedTaCompanySelector,
  selectedTaSelector,
} from 'store/modules/fastSearch';
import { updateBookingTravelAgentUserIdAction } from 'store/modules/bookingBuilder/actions';
import { isSR } from 'store/modules/auth';

import { getUserCountryContext } from 'store/modules/auth';

interface FastSearchState {
  showTaCompanies: boolean;
  showTravelAgents: boolean;
}

export class FastSearchContainer extends React.PureComponent<FastSearchProps, FastSearchState> {
  readonly state: FastSearchState = {
    showTaCompanies: false,
    showTravelAgents: false
  };

  componentDidMount() {
    if (!this.props.searchOptions) {
      this.props.getOptions();
    }

    if (this.props.isSr && !this.props.taCompanies) {
      this.props.getCompanies();
    }

    // Automatically execute the URL search query
    if (window.location.search && !this.props.searchResults) {
      this.props.initializeQuery(window.location.search.replace('?', ''));
    }

    // The UI Back button does not go "back" in history, so we lose the
    // Query String info. This condition puts it back
    if (!window.location.search && this.props.searchResults) {
      this.props.updateQueryString();
    }

    if (!window.location.search && !this.props.searchResults) {
      this.fetchAvailableOffers();
      clearBookingBuilderAction();
    }

    // If the user has search results, then navigates back to the homepage,
    // edits the query, and hit's search again, trigger a search
    if (this.props.queryHasChanged) {
      this.fetchAvailableOffers();
      clearBookingBuilderAction();
    }
  }

  componentDidUpdate(prevProps) {
    const prevCompanyId = prevProps.selectedTaCompany ? prevProps.selectedTaCompany.uuid : undefined;
    const newCompanyId = this.props.selectedTaCompany ? this.props.selectedTaCompany.uuid : undefined;

    const companyHasChanged = newCompanyId && newCompanyId !== prevCompanyId;
    const countryHasChanged = this.props.actingCountryCode !== prevProps.actingCountryCode;
    if (countryHasChanged || companyHasChanged) {
      this.fetchAvailableOffers();
    }
  }

  componentWillUnmount() {
    this.props.resetSearchQuery();
  }

  // ----------------------

  fetchAvailableOffers() {
    const { isSr, getOffers, searchQuery, selectedTaCompany } = this.props;
    if (isSr && selectedTaCompany) {
      const searchMetadata = {
        predefinedTaCompany: selectedTaCompany
      };
      getOffers(searchQuery, searchMetadata);
    }
    else {
      getOffers(searchQuery);
    }
  }

  handleDestinationChange = (e: FormEvent<HTMLInputElement>) => {
    this.props.destinationChange(e.currentTarget.value);
  };

  handleSubmit = () => {
    this.fetchAvailableOffers();
    clearBookingBuilderAction();
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

  handleShowTaCompaniesDropDown = (visible: boolean) => () => {
    this.setState({ showTaCompanies: visible });
  };

  handleShowTravelAgentsDropDown = (visible: boolean) => () => {
    this.setState({ showTravelAgents: visible });
  };

  // ---------------------------------------------------

  handleRemoveAllFilters = () => {
    this.props.setAllFilters(false);
  };

  handlePriceRangeChange = (type: RangeValueType, value: string) => {
    const action = type === 'min' ? this.props.minPriceChange : this.props.maxPriceChange;

    if (!isNaN(parseInt(value))) {
      action(parseInt(value, 10));
    }

    if (isNaN(parseInt(value))) {
      action(undefined);
    }
  };

  handleTaCompanyChange = (value: string) => {
    const selectedCompany = this.props.taCompanies && this.props.taCompanies.find(c => c.name === value) || null;
    this.props.taCompanyChange(selectedCompany);
    // we clean selected TA if we change company
    this.props.updateBookingTravelAgentUser();
  };

  handleTaNameChange = (taFullName: string) => {
    const agents = this.props.travelAgents || [];
    const selectedTA = agents.find(ta => getTaFullName(ta) === taFullName) || null;
    this.props.selectedTaChange(selectedTA);
    const taId = selectedTA && selectedTA.uuid || null;
    this.props.updateBookingTravelAgentUser(taId);
  };

  handleSearchResultClick = (hotelUuid: string) => {
    this.props.history.push(`/hotels/${hotelUuid}`);
  };

  renderSideBar = () => (
    <div className="sidebar">
      {this.props.isSr &&
      <SidebarGroup>
        <label className="basicSearchLabel">
          <span>TA Company</span>
          {
            this.props.taCompanies ?
              <PredictiveTextInput
                placeholder="Select company..."
                value={this.props.selectedTaCompany ? this.props.selectedTaCompany.name : ''}
                // onChange={this.handleTaCompanyChange}
                options={[this.props.taCompanies.map(c => c.name)]}
                onOptionSelect={this.handleTaCompanyChange}
                showDropDown={this.state.showTaCompanies}
                onFocus={this.handleShowTaCompaniesDropDown(true)}
                onBlur={this.handleShowTaCompaniesDropDown(false)}
              />
              : <span>TA Companies Loading...</span>
          }
        </label>
        {this.props.selectedTaCompany &&
        <label className="basicSearchLabel">
          <span>Travel Agent</span>
          {
            this.props.isFetchingTA ?
              <span>Loading travel agents...</span>
              :
              <PredictiveTextInput
                placeholder="Select agent..."
                value={this.props.selectedTa ? getTaFullName(this.props.selectedTa) : ''}
                // onChange={this.handleDestinationChange}
                options={[this.props.taNames]}
                onOptionSelect={this.handleTaNameChange}
                showDropDown={this.state.showTravelAgents}
                onFocus={this.handleShowTravelAgentsDropDown(true)}
                onBlur={this.handleShowTravelAgentsDropDown(false)}
              />
          }
        </label>
        }
      </SidebarGroup>
      }
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
          <span>Rooms *</span>
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
          <DatePickerStateProvider
            defaultSelectedDates={this.props.selectedDates}
            onDateChange={this.props.dateRangeChangeAction}
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
              />
            )}
          />
        </label>

        {this.props.isSr && (
          <label className="basicSearchLabel repeatGuest">
            <span className="label">Repeat Guest</span>
            <Checkbox checked={this.props.isRepeatGuest} onChange={this.props.toggleRepeatGuest} />
          </label>
        )}

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
        <PrimaryButton className="searchButton" disabled={!this.props.canSearch} onClick={this.handleSubmit}>
          Search
        </PrimaryButton>
      </SidebarGroup>
    </div>
  );

  renderResults = () => {
    if (this.props.searchPending) {
      return null;
    }

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
  selectedDates: selectedDatesSelector,
  isRepeatGuest: isRepeatGuestSelector,
  queryHasChanged: queryHasChangedSelector,
  canSearch: canSearchSelector,
  actingCountryCode: getUserCountryContext,
  isSr: isSR,
  taCompanies: taCompaniesSelector,
  taNames: taNamesSelector,
  travelAgents: travelAgentsSelector,
  isFetchingTA: isFetchingTaSelector,
  selectedTa: selectedTaSelector,
  selectedTaCompany: selectedTaCompanySelector
});

const actionCreators = {
  getCompanies: taCompaniesRequestAction,
  taCompanyChange: taCompanyChangeAction,
  selectedTaChange: selectedTaChangeAction,
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
  initializeQuery: initializeQueryAction,
  toggleRepeatGuest: toggleRepeatGuestAction,
  clearBookingBuilderAction,
  dateRangeChangeAction,
  updateQueryString: updateQueryStringAction,
  resetSearchQuery: resetSearchQueryAction,
  updateBookingTravelAgentUser: updateBookingTravelAgentUserIdAction,
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

// -----------------------------------------------------------------------------
// Connected
// -----------------------------------------------------------------------------
const withConnect = connect<StateToProps, DispatchToProps, FastSearchProps>(mapStateToProps, mapDispatchToProps);

export const FastSearchContainerConnected = compose(withConnect, withRouter)(FastSearchContainer);
