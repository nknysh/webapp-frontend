import React from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import StyledFastSearchContainer from './styles';
import { SearchSettings } from 'pureUi/SearchSettings';
import { RangeInput } from 'pureUi/RangeInput';
import { RangeValueType } from '../../pureUi/RangeInput/index';

import {
  searchOptionsSelector,
  optionsRequestAction,
  offersSearchRequestAction,
  searchOptionsPendingSelector,
  searchOptionsErrorSelector,
  orderedSearchResults,
  offersQuerySelector,
  activeFiltersSelector,
  offersSearchPending,
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
  destinationChangeAction
} from 'store/modules/fastSearch';

export class FastSearchContainer extends React.PureComponent<FastSearchProps, {}> {
  componentDidMount() {
    if (!this.props.searchOptions) {
      this.props.getOptions();
    }

    if (!this.props.searchResults) {
      this.props.getOffers(this.props.searchQuery);
    }
  }

  handleDestinationChange = (e: React.FormEvent<HTMLInputElement>) => this.props.destinationChange(e.currentTarget.value)
  handleRemoveAllFilters = () => this.props.setAllFilters(false);
  handleSubmit = () => this.props.getOffers(this.props.searchQuery);
  handlePriceRangeChange = (type: RangeValueType, value: string) => {
    if(!isNaN(parseInt(value))) {
      const action = type === 'min'
        ? this.props.minPriceChange
        : this.props.maxPriceChange;
      action(parseInt(value, 10))
    }
  }

  renderSideBar = () => (
    <div className="sidebar">
      {this.props.optionsRequestPending && <h2>Options Loading</h2>}
      {!this.props.optionsRequestPending && this.props.optionsRequestError && (
        <h2>{this.props.optionsRequestError!.errors.map(e => e.title)}</h2>
      )}

      <label>
        Destination <br />
        <input type="text" value={this.props.searchQuery.name} onChange={this.handleDestinationChange}/>
      </label>

      <RangeInput 
        title="Price Range" 
        min={this.props.priceRange.min?.toString() || ''} 
        max={this.props.priceRange.max?.toString() || ''} 
        onChange={this.handlePriceRangeChange}
      />

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
          onSubmit={this.handleSubmit}
        />
      )}
    </div>
  );

  renderResults = () => {
    if (!this.props.searchResults) {
      return null;
    }

    if(!this.props.searchResults.length) {
      return <h3>No results</h3>
    }

    return this.props.searchResults.map(result => {
      return (
        <div>
          <img
            title={result.bookingBuilder.response.uploads[1] && result.bookingBuilder.response.uploads[1].displayName}
            src={result.bookingBuilder.response.uploads[1] && result.bookingBuilder.response.uploads[1].url}
          />
          <h3>{result.name}</h3>
          <h4>After Discount: {result.bookingBuilder.response.totals.totalForPricedItems}</h4>
          <ul>
            <li>Before Discount: {result.bookingBuilder.response.totals.totalBeforeDiscount}</li>
            <li>Offers Applied: {result.bookingBuilder.response.aggregateTotals.Booking.offers.length}</li>
            <li>Prefferd: {result.bookingBuilder.response.hotel.preferred ? 'Yes' : 'No'}</li>
          </ul>
        </div>
      );
    });
  };

  render() {
    if (!this.props.searchOptions) {
      return null;
    }

    return (
      <StyledFastSearchContainer>
        <div className="sideBar">{this.renderSideBar()}</div>

        <div className="searchResults">
          {this.props.searchPending && <h1>Loading...</h1>}
          {!this.props.searchPending && <h1>Search Results {this.props.searchResults?.length}</h1>}
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
export interface FastSearchProps extends StateToProps, DispatchToProps {
  className: string;
}

const mapStateToProps = createStructuredSelector({
  optionsRequestPending: searchOptionsPendingSelector,
  optionsRequestError: searchOptionsErrorSelector,
  searchOptions: searchOptionsSelector,
  searchPending: offersSearchPending,
  searchResults: orderedSearchResults,
  searchQuery: offersQuerySelector,
  activeFilters: activeFiltersSelector,
  priceRange: priceRangeSelector,
  showRegions: showRegionsSelector,
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
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

// -----------------------------------------------------------------------------
// Connected
// -----------------------------------------------------------------------------
const withConnect = connect<StateToProps, DispatchToProps, FastSearchProps>(
  mapStateToProps,
  mapDispatchToProps
);

export const FastSearchContainerConnected = compose(withConnect)(FastSearchContainer);
