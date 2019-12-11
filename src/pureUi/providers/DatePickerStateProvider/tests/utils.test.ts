import { getDateRangeDisplayString } from '../utils';

describe('getDateRangeDisplayString', () => {
  it('generates the correct string for dates in same month and same year', () => {
    const start = '2019-01-01';
    const end = '2019-01-11';
    const expected = '1 - 11 Jan 2019';
    expect(getDateRangeDisplayString(start, end)).toEqual(expected);
  });

  it('generates the correct string for dates in different months and same year', () => {
    const start = '2019-01-01';
    const end = '2019-02-11';
    const expected = '1 Jan - 11 Feb 2019';
    expect(getDateRangeDisplayString(start, end)).toEqual(expected);
  });

  it('generates the correct string for dates in different months and same year', () => {
    const start = '2019-01-01';
    const end = '2020-02-11';
    const expected = '1 Jan 2019 - 11 Feb 2020';
    expect(getDateRangeDisplayString(start, end)).toEqual(expected);
  });

  it('generates the correct string when the start and end dates are the same', () => {
    const start = '2019-01-01';
    const expected = '1 Jan 2019';
    expect(getDateRangeDisplayString(start, start)).toEqual(expected);
  });
});
