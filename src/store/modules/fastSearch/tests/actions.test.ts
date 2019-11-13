import * as Actions from '../actions';
import { Filters } from 'services/BackendApi';

// prettier-ignore
const testCases = [
  [Actions.destinationChangeAction, 'hello'],
  [Actions.toggleFilterAction, Filters.BEST_FOR_FAMILIES],
  [Actions.toggleRepeatGuestAction],
  [Actions.dateRangeStartChangeAction, '2020-01-01'],
  [Actions.dateRangeEndChangeAction, '2020-01-07'],
  [Actions.minPriceChangeAction, '10'],
  [Actions.maxPriceChangeAction, '100'],
  [Actions.incrementRoomAction, 1],
  [Actions.decrementRoomAction, 1],
  [Actions.incrementAdultAction, 1],
  [Actions.decrementAdultAction, 1],
  [Actions.incrementChildAction, 1],
  [Actions.decrementChildAction, 1],
  [Actions.ageChangeAction, 0, 0, '10'],
  [Actions.searchRequestAction],
  [Actions.searchSuccessAction, 'test'],
  [Actions.searchFailureAction, 'test'],
];

describe('fastSearchActions Snapshot tests', () => {
  it('Matches snapshots', () => {
    // All actions return object literals, so snapshot testing just
    // gives us coverage.
    expect(Actions.destinationChangeAction('hello')).toMatchSnapshot();
    expect(Actions.toggleFilterAction(Filters.BEST_FOR_FAMILIES)).toMatchSnapshot();
    expect(Actions.toggleRepeatGuestAction()).toMatchSnapshot();
    expect(Actions.dateRangeStartChangeAction('2020-01-01')).toMatchSnapshot();
    expect(Actions.dateRangeEndChangeAction('2020-01-07')).toMatchSnapshot();
    expect(Actions.minPriceChangeAction('10')).toMatchSnapshot();
    expect(Actions.maxPriceChangeAction('100')).toMatchSnapshot();
    expect(Actions.incrementRoomAction(1)).toMatchSnapshot();
    expect(Actions.decrementRoomAction(1)).toMatchSnapshot();
    expect(Actions.incrementAdultAction(1)).toMatchSnapshot();
    expect(Actions.decrementAdultAction(1)).toMatchSnapshot();
    expect(Actions.incrementChildAction(1)).toMatchSnapshot();
    expect(Actions.decrementChildAction(1)).toMatchSnapshot();
    expect(Actions.ageChangeAction(0, 0, '10')).toMatchSnapshot();
    expect(Actions.searchRequestAction()).toMatchSnapshot();
    expect(Actions.searchSuccessAction('test' as any)).toMatchSnapshot();
    expect(Actions.searchFailureAction('test' as any)).toMatchSnapshot();
  });
});
