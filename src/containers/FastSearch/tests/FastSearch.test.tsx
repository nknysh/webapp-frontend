import React from 'react';
import { FastSearchContainer, FastSearchProps } from '../index';
import * as Actions from '../../../store/modules/fastSearch/actions';
import { clearBookingBuilderAction } from '../../../store/modules/bookingBuilder/actions';
import { shallow } from 'enzyme';
import * as Fixtures from './fixtures';
import { createMemoryHistory } from 'history';
import { updateQueryStringAction } from '../../../store/modules/fastSearch/actions';

const makeProps = (overrides?: Partial<FastSearchProps>) => {
  const defaultProps: FastSearchProps = {
    className: '',

    // State
    optionsRequestPending: false,
    optionsRequestError: null,
    searchOptions: Fixtures.initialStateFixture.options,
    searchPending: false,
    searchResults: Fixtures.serachResultsFixture,
    searchQuery: Fixtures.initialStateFixture.query,
    activeFilters: [],
    priceRange: Fixtures.initialStateFixture.query.priceRange,
    showRegions: false,
    activeLodingIndex: 0,
    expandedHighlights: [],
    totalGuestCount: 2,
    showLodgingControls: false,
    nameSearchResults: [],
    showNameSearchResults: false,
    totalStayNights: 14,
    dateRange: {
      start: '2019-01-01T00:00:00.000Z',
      end: '2019-01-02T00:00:00.000Z',
    },
    dateRangeDisplayString: '1 - 2 Dec 2019',
    selectedDates: [],
    currentDate: '2019-01-02T00:00:00.000Z',
    dateSelectionInProgress: false,
    showDatePicker: false,
    isRepeatGuest: false,
    queryHasChanged: false,
    canSearch: true,

    // Actions
    getOptions: jest.fn(Actions.optionsRequestAction),
    getCompanies: jest.fn(Actions.taCompaniesRequestAction),
    getOffers: jest.fn(Actions.offersSearchRequestAction),
    toggleFilter: jest.fn(Actions.toggleFilterAction),
    setAllFilters: jest.fn(Actions.setAllFiltersAction),
    minPriceChange: jest.fn(Actions.minPriceChangeAction),
    maxPriceChange: jest.fn(Actions.maxPriceChangeAction),
    toggleStarRating: jest.fn(Actions.toggleStarRatingAction),
    toggleOccasion: jest.fn(Actions.toggleOccasionAction),
    selectMealPlan: jest.fn(Actions.selectMealPlanAction),
    toggleShowRegions: jest.fn(Actions.toggleShowRegionsAction),
    toggleRegion: jest.fn(Actions.toggleRegionAction),
    destinationChange: jest.fn(Actions.destinationChangeAction),
    incrementRoom: jest.fn(Actions.incrementRoomAction),
    incrementAdult: jest.fn(Actions.incrementAdultAction),
    incrementChild: jest.fn(Actions.incrementChildAction),
    setAge: jest.fn(Actions.setAgeAction),
    setActiveLodgingIndex: jest.fn(Actions.setActiveLodgingIndexAction),
    toggleHighlights: jest.fn(Actions.toggleHighlightsAction),
    incrementActiveLodgingIndex: jest.fn(Actions.incrementActiveLodgingIndexAction),
    toggleLodgingControls: jest.fn(Actions.toggleLodgingControlsAction),
    setLodgingControlsVisibility: jest.fn(Actions.setLodgingControlsVisibilityAction),
    setNamesSearchResultsVisibility: jest.fn(Actions.setNamesSearchResultsVisibilityAction),
    initializeQuery: jest.fn(Actions.initializeQueryAction),
    toggleRepeatGuest: jest.fn(Actions.toggleRepeatGuestAction),
    clearBookingBuilderAction: jest.fn(clearBookingBuilderAction),
    updateQueryString: jest.fn(updateQueryStringAction),

    // Router props
    match: {
      params: {},
      isExact: true,
      path: 'test/SearchResults',
      url: 'test/SearchResults',
    },
    // @ts-ignore
    history: {},
    // @ts-ignore
    location: '',
  };

  return {
    ...defaultProps,
    ...overrides,
  };
};

describe('FastSearchContainer', () => {
  it('Does NOT perfrom a search if search results exists and query is unchanged', () => {
    const props = makeProps();
    shallow(<FastSearchContainer {...props} />);
    expect(props.getOffers).toHaveBeenCalledTimes(0);
  });
});
