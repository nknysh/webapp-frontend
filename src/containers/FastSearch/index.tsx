import React, {FormEvent} from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import StyledFastSearchContainer from './styles';
import SearchSettings from 'pureUi/SearchSettings';
import PredictiveTextInput from 'pureUi/PredictiveTextInput';
import { RangeValueType} from 'pureUi/RangeInput';
import { LodgingsEditor } from '../../pureUi/LodgingsEditor/index';
import SidebarGroup from 'pureUi/SidebarGroup';
import {Link, withRouter, RouteComponentProps} from 'react-router-dom';
import { List } from 'pureUi/List';
import { Heading2 } from 'styles';
import { PrimaryButton } from 'pureUi/Buttons';
import SearchResultList from 'pureUi/SearchResultsList';

import {
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
} from 'store/modules/fastSearch';

export class FastSearchContainer extends React.PureComponent<FastSearchProps, {}> {
  componentDidMount() {
    if (!this.props.searchOptions) {
      this.props.getOptions();
    }

    if (!this.props.searchResults) {
      this.props.getOffers(this.props.searchQuery);
    }

    if(this.props.searchQuery.name === '') {
      this.props.destinationChange('');
    }
  }

  handleDestinationChange = (e: FormEvent<HTMLInputElement>) => {
    this.props.destinationChange(e.currentTarget.value);
  }
  
  handleRemoveAllFilters = () => {
    this.props.setAllFilters(false);
  }
  
  handleSubmit = () => {
    this.props.getOffers(this.props.searchQuery);
  }
  
  handlePriceRangeChange = (type: RangeValueType, value: string) => {
    if(!isNaN(parseInt(value))) {
      const action = type === 'min'
        ? this.props.minPriceChange
        : this.props.maxPriceChange;
      action(parseInt(value, 10))
    }
  }

  handleSearchResultClick = (hotelUuid: string) => {
    this.props.history.push(`/hotels/${hotelUuid}`);
  }

  handleToggleLodgingControls = () => {
    this.props.toggleLodgingControls();
  }

  handleSetLogdingControlsVisibility = (visible: boolean) => () => {
    console.log('handleSetLogdingControlsVisibility', visible);
    this.props.setLodgingControlsVisibility(visible);
  }

  handleShowNameSearchDown = (visible: boolean) => () => {
    this.props.setNamesSearchResultsVisibility(visible);
  }

  renderSideBar = () => (
    <div className="sidebar">
      <SidebarGroup>
      {this.props.optionsRequestPending && <h2>Options Loading</h2>}
      {!this.props.optionsRequestPending && this.props.optionsRequestError && (
        <h2>{this.props.optionsRequestError!.errors.map(e => e.title)}</h2>
      )}

      <label>
        Destination or Resort <br />
        <PredictiveTextInput 
          placeholder="Where to" 
          value={this.props.searchQuery.name!} 
          onChange={this.handleDestinationChange}
          options={this.props.nameSearchResults}
          onOptionSelect={this.props.destinationChange}
          showDropDown={this.props.showNameSearchResults}
          onFocus={this.handleShowNameSearchDown(true)}
          onBlur={this.handleShowNameSearchDown(false)}
        />

      </label>

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

      <PrimaryButton className="searchButton" disabled={false} onClick={this.handleSubmit}>Search</PrimaryButton>

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
          <PrimaryButton className="searchButton" disabled={false} onClick={this.handleSubmit}>Search</PrimaryButton>
        </SidebarGroup>
    </div>
  );

  renderResults = () => {
    if (!this.props.searchResults) {
      return null;
    }

    if(!this.props.searchResults.length) {
      return <h3>No results</h3>
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
    console.log('this.props.nameSearchResults', this.props.nameSearchResults);
    if (!this.props.searchOptions) {
      return null;
    }

    return (
      <StyledFastSearchContainer>
        <Link to="/" className="backButton">Back to Homepage</Link>
        {this.props.searchPending && <h1 className="heading">Loading...</h1>}
        {!this.props.searchPending && <Heading2 className="heading">Search Results {this.props.searchResults?.length}</Heading2>}
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
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

// -----------------------------------------------------------------------------
// Connected
// -----------------------------------------------------------------------------
const withConnect = connect<StateToProps, DispatchToProps, FastSearchProps>(
  mapStateToProps,
  mapDispatchToProps
);

export const FastSearchContainerConnected = compose(withConnect, withRouter)(FastSearchContainer);
