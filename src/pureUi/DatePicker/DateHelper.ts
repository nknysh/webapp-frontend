import { IDateObject } from './types';
// Provides a stateless service that performs operations useful for dates processing.

class DateHelper {
  // -----------------------------------------------------------------------------
  // Returns the number of days in a given month

  daysInMonth = (month: number, year: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  // -----------------------------------------------------------------------------
  // Returns the index of the first day of a month. 0 = Sunday, 6 = Saturday

  firstDayOfMonth = (month: number, year: number): number => {
    return new Date(year, month, 1).getDay();
  };

  // -----------------------------------------------------------------------------
  // Returns the index of the last day of a month. 0 = Sunday, 6 = Saturday

  lastDayOfMonth = (month: number, year: number): number => {
    const lastDate = this.daysInMonth(month, year);
    return new Date(year, month, lastDate).getDay();
  };

  // -----------------------------------------------------------------------------
  // Returns a date, set to a given day for a given week, e.g the first sunday

  nthWeekdayOfMonth = (weekday: number, week: number, date: Date): Date => {
    const nDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
    // console.info('nDate', nDate);
    const add = ((weekday - nDate.getUTCDay() + 7) % 7) + (week - 1) * 7;
    //  console.info(add)
    nDate.setUTCDate(1 + add);
    // console.info('nDate again', nDate);
    return nDate;
  };

  // -----------------------------------------------------------------------------
  // Returns the number of weeks in a month.

  weeksInMonth = (month: number, year: number, firstDayOfWeek: number): number => {
    const firstOfMonth = new Date(year, month, 1);
    const lastOfMonth = new Date(year, month + 1, 0);
    const numberOfDaysInMonth = lastOfMonth.getDate();
    const firstWeekDay = (firstOfMonth.getDay() - firstDayOfWeek + 7) % 7;
    const used = firstWeekDay + numberOfDaysInMonth;
    return Math.ceil(used / 7);
  };

  // -----------------------------------------------------------------------------
  // Returns an ISO8601 Date String for the first date to be shown for a month. This
  // will often be a day from the previous month.

  startDateForMonthInView = (month: number, year: number, firstDayOfWeek: number): string => {
    const startTime = Date.UTC(year, month, 1, 0, 0, 0, 0);
    const startDate = new Date();
    startDate.setTime(startTime);
    const firstDayOfMonth = startDate.getUTCDay();
    const firstDayOffset = this.startDateOffset(firstDayOfWeek, firstDayOfMonth);
    return new Date(startDate.getTime() - firstDayOffset * (86400 * 1000)).toISOString();
  };

  startDateOffset = (a: number, b: number) => {
    return (-1 * (a - b - 7)) % 7;
  };

  // -----------------------------------------------------------------------------
  // Takes a flat array and returns a two 2D array of a given length and chunk size

  create2DArray = (arr: any[], length: number, chunkSize: number): any[][] => {
    // Create a two dimensional array containing our dates chunked by week
    const chunks = Array(length)
      .fill(0)
      .map(() => Array());

    arr.forEach((date, index) => {
      const chunkIndex = Math.floor(index / chunkSize);
      chunks[chunkIndex].push(date);
    });

    return chunks;
  };

  // -----------------------------------------------------------------------------
  // Generate an array of date objects starting from a given timestamp

  generateDatesFrom = (startTime: number, length: number, locale: string): IDateObject[] => {
    if (length === 0) {
      return [];
    }

    return Array(Math.abs(length))
      .fill(0)
      .map(
        (u, i): IDateObject => {
          const increment = length > 0 ? 86400 * 1000 * i : -1 * (86400 * 1000) * i;

          const timestamp = startTime + increment;
          const date = new Date(timestamp);
          return {
            date: parseInt(date.toLocaleString(locale, { day: 'numeric', timeZone: 'GMT' }), 10),
            month: date.getUTCMonth(),
            dateString: date.toISOString(),
          };
        }
      );
  };

  // -----------------------------------------------------------------------------
  // Get the number of days between two date strings. Result can be positive or
  // negative, and mis not guaranteed to be an integer.

  daysBetween = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return (end.getTime() - start.getTime()) / 86400000;
  };

  // -----------------------------------------------------------------------------
  // Adds n months to a date string, and returns the new date string

  addMonths = (dateString: string, increment: number): string => {
    const newDate = new Date(dateString);
    const currentMonth = newDate.getMonth();
    newDate.setMonth(currentMonth + increment);
    return newDate.toISOString();
  };

  // -----------------------------------------------------------------------------
  // Returns an array of localised weekday labels

  weekdayHeadingsWithLocale = (locale: string, firstDayOfWeek: number): string[] => {
    const now = new Date();
    const nowUtc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    const referenceDate = this.nthWeekdayOfMonth(0, 1, nowUtc); // sunday
    const startDate = referenceDate.getUTCDate();
    const headings = 'SMTWTFS'.split('').map((day, index) => {
      referenceDate.setUTCDate(startDate + index);
      return referenceDate.toLocaleString(locale, { weekday: 'narrow', timeZone: 'GMT' });
    });
    const returnVal = headings.concat(headings.splice(0, firstDayOfWeek));
    return returnVal;
  };

  // -----------------------------------------------------------------------------
  // Returns a 2 dimensional array of ISO8601 date strings

  generateDatesFor = (month: number, year: number, firstDayOfWeek: number, locale: string): IDateObject[][] => {
    const startTime = new Date(this.startDateForMonthInView(month, year, firstDayOfWeek)).getTime();
    const totalWeeks = this.weeksInMonth(month, year, firstDayOfWeek);
    const daysInMonth = this.daysInMonth(month, year);
    const extraDays = totalWeeks * 7 - daysInMonth;
    const totalDays = daysInMonth + extraDays;
    const datesArray = this.generateDatesFrom(startTime, totalDays, locale);
    return this.create2DArray(datesArray, totalWeeks, 7);
  };
}

export default new DateHelper();
