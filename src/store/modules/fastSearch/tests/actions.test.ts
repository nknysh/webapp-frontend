import * as Actions from '../actions';
import { Filters, StarRating } from 'services/BackendApi';
import { sampleQuery } from 'services/BackendApi/tests/fixtures/sampleQuery';

describe('fastSearchActions Snapshot tests', () => {
  it('Matches snapshots', () => {
    // All actions return object literals, so snapshot testing just
    // gives us coverage.
    expect(Actions.initializeQueryAction('test')).toMatchSnapshot();
    expect(Actions.destinationChangeAction('hello')).toMatchSnapshot();
    expect(Actions.toggleFilterAction(Filters.BEST_FOR_FAMILIES)).toMatchSnapshot();
    expect(Actions.setFiltersAction([Filters.BEST_FOR_FAMILIES], true)).toMatchSnapshot();
    expect(Actions.setAllFiltersAction(true)).toMatchSnapshot();
    expect(Actions.toggleRepeatGuestAction()).toMatchSnapshot();
    expect(Actions.toggleStarRatingAction(StarRating.FiveStar)).toMatchSnapshot();
    expect(Actions.minPriceChangeAction(10)).toMatchSnapshot();
    expect(Actions.maxPriceChangeAction(100)).toMatchSnapshot();
    expect(Actions.incrementRoomAction(1)).toMatchSnapshot();
    expect(Actions.incrementAdultAction(1, 1)).toMatchSnapshot();
    expect(Actions.incrementChildAction(1, 1)).toMatchSnapshot();
    expect(Actions.setAgeAction(0, 0, '10')).toMatchSnapshot();
    expect(Actions.offersSearchRequestAction(sampleQuery)).toMatchSnapshot();
    expect(Actions.offersSearchSuccessAction('test' as any)).toMatchSnapshot();
    expect(Actions.offersSearchFailureAction('test' as any)).toMatchSnapshot();
  });
});

/*



  | ToggleStarRatingAction
  | ToggleOccasionAction
  | ToggleShowRegionsAction
  | ToggleRegionAction
  | ToggleHighlightsAction
  | ToggleLodgingControlsAction
  | SetLodgingControlsVisibilityAction
  | SelectMealPlanAction
  | SetFiltersAction
  | SetAllFiltersAction
  | MinPriceChangeAction
  | MaxPriceChangeAction
  | IncrementRoomAction
  | IncrementAdultAction
  | IncrementChildAction
  | SetAgeAction
  | SearchRequestAction
  | OffersSearchSuccessAction
  | OffersSearchFailureAction
  | OptionsRequestAction
  | OptionsSuccessAction
  | OptionsFailureAction
  | SetActiveLodgingIndexAction
  | IncrementActiveLodgingIndexAction
  | NamesSearchSuccessAction
  | NamesSearchFailureAction
  | SetNamesSearchResultsVisibilityAction
  | PopulateQueryAction
  | ClearExtendedQueryAction
  | DateRangeChangeAction
  | UpdateQueryStringAction
  | ResetSearchQueryAction;
*/
