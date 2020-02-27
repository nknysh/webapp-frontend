import { getDateRangeDisplayString } from '../utils';

describe('getDateRangeDisplayString', () => {
  it('generates the correct string for different dates', () => {
    const start = '2019-01-01';
    const end = '2019-01-11';
    const expected = '01 Jan 19 - 11 Jan 19';
    expect(getDateRangeDisplayString(start, end)).toEqual(expected);
  });

  it('generates the correct string when the start and end dates are the same', () => {
    const start = '2019-01-01';
    const expected = '01 Jan 19';
    expect(getDateRangeDisplayString(start, start)).toEqual(expected);
  });
});
