import * as Actions from '../actions';
import { Filters } from 'services/BackendApi';
import { sampleQuery } from 'services/BackendApi/tests/fixtures/sampleQuery';

describe('fastSearchActions Snapshot tests', () => {
  it('Matches snapshots', () => {
    // All actions return object literals, so snapshot testing just
    // gives us coverage.
    expect(Actions.destinationChangeAction('hello')).toMatchSnapshot();
    expect(Actions.toggleFilterAction(Filters.BEST_FOR_FAMILIES)).toMatchSnapshot();
    expect(Actions.setFiltersAction([Filters.BEST_FOR_FAMILIES], true)).toMatchSnapshot();
    expect(Actions.setAllFiltersAction(true)).toMatchSnapshot();
    expect(Actions.toggleRepeatGuestAction()).toMatchSnapshot();
    expect(Actions.dateRangeStartChangeAction('2020-01-01')).toMatchSnapshot();
    expect(Actions.dateRangeEndChangeAction('2020-01-07')).toMatchSnapshot();
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
