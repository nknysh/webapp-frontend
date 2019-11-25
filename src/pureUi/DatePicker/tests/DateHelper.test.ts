import DateHelper from '../DateHelper';

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

describe('DateHelper', () => {
  describe('daysInMonth', () => {
    it('Should return the right number of days for all the months of 2017', () => {
      const truth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      const days = months.map(m => DateHelper.daysInMonth(m - 1, 2017));
      expect(days).toEqual(truth);
    });

    it('Should return the right number of days for a leap year', () => {
      const truth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      const days = months.map(m => DateHelper.daysInMonth(m - 1, 2016));
      expect(days).toEqual(truth);
    });
  });

  describe('firstDayOfMonth', () => {
    it('should return the correct index for the first day of the month', () => {
      const truth = [0, 3, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5];
      const firstDays = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(m => DateHelper.firstDayOfMonth(m, 2017));
      expect(firstDays).toEqual(truth);
    });
  });

  describe('lastDayOfMonth', () => {
    it('should return the correct index for the last day of the month', () => {
      const truth = [2, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4, 0];
      const firstDays = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(m => DateHelper.lastDayOfMonth(m, 2017));
      expect(firstDays).toEqual(truth);
    });
  });

  describe('weeksInMonth', () => {
    it('Should return the correct number of weeks for February 2016', () => {
      expect(DateHelper.weeksInMonth(2, 2017, 0)).toEqual(5);
    });

    it('should return the correct number of weeks for each month in 2017', () => {
      const truth = '556556555565'.split('').map(n => Number(n));
      const weeks = months.map(m => DateHelper.weeksInMonth(m, 2017, 0));
      expect(weeks).toEqual(truth);
    });

    it('should return the correct number of weeks for each month in 2017 if week starts on Monday', () => {
      const truth = '555556556555'.split('').map(n => Number(n));
      const weeks = months.map(m => DateHelper.weeksInMonth(m, 2017, 1));
      expect(weeks).toEqual(truth);
    });

    it('should return the correct number of weeks for each month in 2017 is week starts on Saturday', () => {
      const truth = '555555565565'.split('').map(i => Number(i));
      const weeks = months.map(m => DateHelper.weeksInMonth(m, 2017, 6));
      expect(weeks).toEqual(truth);
    });

    it('should return the correct number of weeks for each month in 2017 is week starts on Thursday', () => {
      const truth = '565555655655'.split('').map(n => Number(n));
      const weeks = months.map(m => DateHelper.weeksInMonth(m, 2017, 4));
      expect(weeks).toEqual(truth);
    });

    it('should return the correct number of weeks for each month in a leap year (2016)', () => {
      const truth = '555556556555'.split('').map(n => Number(n));
      const weeks = months.map(m => DateHelper.weeksInMonth(m, 2016, 0));
      expect(weeks).toEqual(truth);
    });

    it('should return the correct number of weeks for each month in 2010', () => {
      const truth = '555655556556'.split('').map(n => Number(n));
      const weeks = months.map(m => DateHelper.weeksInMonth(m, 2010, 0));
      expect(weeks).toEqual(truth);
    });
  });

  describe('startDateForMonth', () => {
    it('Should determine the correct start date for viewing a month in 2010', () => {
      const truth = [
        '2010-01-31T00:00:00.000Z',
        '2010-02-28T00:00:00.000Z',
        '2010-03-28T00:00:00.000Z',
        '2010-04-25T00:00:00.000Z',
        '2010-05-30T00:00:00.000Z',
        '2010-06-27T00:00:00.000Z',
        '2010-08-01T00:00:00.000Z',
        '2010-08-29T00:00:00.000Z',
        '2010-09-26T00:00:00.000Z',
        '2010-10-31T00:00:00.000Z',
        '2010-11-28T00:00:00.000Z',
        '2010-12-26T00:00:00.000Z',
      ];

      const startDates = months.map(m => DateHelper.startDateForMonthInView(m, 2010, 0));
      expect(startDates).toEqual(truth);
    });

    it('Should determine the correct start date for viewing a month in a leap year (2016', () => {
      const truth = [
        '2016-01-31T00:00:00.000Z',
        '2016-02-28T00:00:00.000Z',
        '2016-03-27T00:00:00.000Z',
        '2016-05-01T00:00:00.000Z',
        '2016-05-29T00:00:00.000Z',
        '2016-06-26T00:00:00.000Z',
        '2016-07-31T00:00:00.000Z',
        '2016-08-28T00:00:00.000Z',
        '2016-09-25T00:00:00.000Z',
        '2016-10-30T00:00:00.000Z',
        '2016-11-27T00:00:00.000Z',
        '2017-01-01T00:00:00.000Z',
      ];

      const startDates = months.map(m => DateHelper.startDateForMonthInView(m, 2016, 0));
      expect(startDates).toEqual(truth);
    });
  });

  describe('nthWeekdayOfMonth', () => {
    // August 2010 starts on a sunday, which is convenient for this test
    const expected = [
      '2010-08-01T00:00:00.000Z',
      '2010-08-02T00:00:00.000Z',
      '2010-08-03T00:00:00.000Z',
      '2010-08-04T00:00:00.000Z',
      '2010-08-05T00:00:00.000Z',
      '2010-08-06T00:00:00.000Z',
      '2010-08-07T00:00:00.000Z',
    ];

    const initialDate = new Date(Date.UTC(2010, 7, 20));
    // console.info('Initial Date', initialDate);
    it('should return the first days of the month', () => {
      const result = new Array(7)
        .fill(true)
        .map((ignore, day) => DateHelper.nthWeekdayOfMonth(day, 1, initialDate).toISOString());
      // console.info('Result:', result);
      expect(result).toEqual(expected);
    });

    it('should return the first days of the month when the day is out of bounds (positive)', () => {
      const result = new Array(7)
        .fill(true)
        .map((ignore, day) => DateHelper.nthWeekdayOfMonth(day + 14, 1, initialDate).toISOString());

      expect(result).toEqual(expected);
    });

    it('should return the first days of the month when the day is out of bounds (negative)', () => {
      const result = new Array(7)
        .fill(true)
        .map((ignore, day) => DateHelper.nthWeekdayOfMonth(day - 7, 1, initialDate).toISOString());

      expect(result).toEqual(expected);
    });
  });

  describe('weekdayHeadingsWithLocale', () => {
    /* Note: Node.js doesn't have i18n API's, so we can't test the locales */

    it('should return the correct headings for the en locale', () => {
      expect(DateHelper.weekdayHeadingsWithLocale('en', 0)).toEqual(['S', 'M', 'T', 'W', 'T', 'F', 'S']);
    });

    it('should return the correct headings for the en locale with a firstDay offset of 2', () => {
      expect(DateHelper.weekdayHeadingsWithLocale('en', 2)).toEqual(['T', 'W', 'T', 'F', 'S', 'S', 'M']);
    });
  });

  describe('generateDatesFor()', () => {
    it('should generate to correct dates for January 2016', () => {
      const truth = [
        [
          { date: 31, dateString: '2016-01-31T00:00:00.000Z', month: 0 },
          { date: 1, dateString: '2016-02-01T00:00:00.000Z', month: 1 },
          { date: 2, dateString: '2016-02-02T00:00:00.000Z', month: 1 },
          { date: 3, dateString: '2016-02-03T00:00:00.000Z', month: 1 },
          { date: 4, dateString: '2016-02-04T00:00:00.000Z', month: 1 },
          { date: 5, dateString: '2016-02-05T00:00:00.000Z', month: 1 },
          { date: 6, dateString: '2016-02-06T00:00:00.000Z', month: 1 },
        ],
        [
          { date: 7, dateString: '2016-02-07T00:00:00.000Z', month: 1 },
          { date: 8, dateString: '2016-02-08T00:00:00.000Z', month: 1 },
          { date: 9, dateString: '2016-02-09T00:00:00.000Z', month: 1 },
          { date: 10, dateString: '2016-02-10T00:00:00.000Z', month: 1 },
          { date: 11, dateString: '2016-02-11T00:00:00.000Z', month: 1 },
          { date: 12, dateString: '2016-02-12T00:00:00.000Z', month: 1 },
          { date: 13, dateString: '2016-02-13T00:00:00.000Z', month: 1 },
        ],
        [
          { date: 14, dateString: '2016-02-14T00:00:00.000Z', month: 1 },
          { date: 15, dateString: '2016-02-15T00:00:00.000Z', month: 1 },
          { date: 16, dateString: '2016-02-16T00:00:00.000Z', month: 1 },
          { date: 17, dateString: '2016-02-17T00:00:00.000Z', month: 1 },
          { date: 18, dateString: '2016-02-18T00:00:00.000Z', month: 1 },
          { date: 19, dateString: '2016-02-19T00:00:00.000Z', month: 1 },
          { date: 20, dateString: '2016-02-20T00:00:00.000Z', month: 1 },
        ],
        [
          { date: 21, dateString: '2016-02-21T00:00:00.000Z', month: 1 },
          { date: 22, dateString: '2016-02-22T00:00:00.000Z', month: 1 },
          { date: 23, dateString: '2016-02-23T00:00:00.000Z', month: 1 },
          { date: 24, dateString: '2016-02-24T00:00:00.000Z', month: 1 },
          { date: 25, dateString: '2016-02-25T00:00:00.000Z', month: 1 },
          { date: 26, dateString: '2016-02-26T00:00:00.000Z', month: 1 },
          { date: 27, dateString: '2016-02-27T00:00:00.000Z', month: 1 },
        ],
        [
          { date: 28, dateString: '2016-02-28T00:00:00.000Z', month: 1 },
          { date: 29, dateString: '2016-02-29T00:00:00.000Z', month: 1 },
          { date: 1, dateString: '2016-03-01T00:00:00.000Z', month: 2 },
          { date: 2, dateString: '2016-03-02T00:00:00.000Z', month: 2 },
          { date: 3, dateString: '2016-03-03T00:00:00.000Z', month: 2 },
          { date: 4, dateString: '2016-03-04T00:00:00.000Z', month: 2 },
          { date: 5, dateString: '2016-03-05T00:00:00.000Z', month: 2 },
        ],
      ];
      expect(DateHelper.generateDatesFor(1, 2016, 0, 'en')).toEqual(truth);
    });
  });
});
