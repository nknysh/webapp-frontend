import {
  toDate,
  getNumberOfDays,
  formatDate,
  getToDateFormat,
  getFromDateFormat,
  getStartOfMonth,
  getEndOfMonth,
  generateArrayOfDatesBetween,
} from './date';

describe('date', () => {
  describe('toDate', () => {
    it('returns a new date object', () => {
      expect(toDate('2019-04-10')).toBeInstanceOf(Date);
      expect(toDate()).toBeInstanceOf(Date);
    });
  });
  describe('getNumberOfDays', () => {
    it('returns days between 2 dates', () => {
      expect(
        getNumberOfDays({
          startDate: new Date('2019-04-10'),
          endDate: new Date('2019-05-10'),
        })
      ).toMatchSnapshot();
      expect(getNumberOfDays({ startDate: new Date('2019-04-10') })).toMatchSnapshot();
    });
  });
  describe('getFromDateFormat', () => {
    it('returns formatted from date', () => {
      expect(
        getFromDateFormat({
          startDate: new Date('2019-04-10'),
          endDate: new Date('2019-05-10'),
        })
      ).toMatchSnapshot();
    });
  });
  describe('getToDateFormat', () => {
    it('returns formatted to date', () => {
      expect(
        getToDateFormat({
          startDate: new Date('2019-04-10'),
          endDate: new Date('2019-05-10'),
        })
      ).toMatchSnapshot();
    });
  });
  describe('formatDate', () => {
    it('returns formatted date', () => {
      const date = new Date('2019-05-22');
      expect(formatDate(date)).toMatchSnapshot();
      expect(formatDate(date, 'd MM yyyy')).toMatchSnapshot();
      expect(formatDate(date, 'yyyy')).toMatchSnapshot();
    });
  });
  describe('getStartOfMonth', () => {
    it('returns first date of month', () => {
      expect(getStartOfMonth(new Date('2019-07-01'))).toMatchSnapshot();
    });
  });
  describe('getEndOfMonth', () => {
    it('returns last date of month', () => {
      expect(getEndOfMonth(new Date('2019-07-01'))).toMatchSnapshot();
    });
  });

  describe('generateArrayOfDatesBetween', () => {
    it('handles strings', () => {
      const array = generateArrayOfDatesBetween('2020-01-01', '2020-01-05');

      expect(array).toEqual(['2020-01-01', '2020-01-02', '2020-01-03', '2020-01-04', '2020-01-05']);
    });

    it('handles dates', () => {
      const array = generateArrayOfDatesBetween(new Date('2020-01-01'), new Date('2020-01-05'));

      expect(array).toEqual(['2020-01-01', '2020-01-02', '2020-01-03', '2020-01-04', '2020-01-05']);
    });
  });
});
