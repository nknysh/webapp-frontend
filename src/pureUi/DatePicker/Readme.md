# DatePicker

Provides a UI to allow users to see and interact with dates. This is a higher order component, composed
of `<Calendar />` and `<DateButton />` components.

The Date Picker contains no state of it's own, allowing you to adapt the the DatePicker to your local needs,
such as applying business logic to exclude national holidays from user selections.

## Props

##### calendarCount?: number;

How many calendars to present to the user

##### currentDate?: string; // An ISO8601 Date string

The current date of the first calendar. The month of the current date will be used at the month of the first calendar.

##### selectedDates?: string[]; // An array of ISO8601 Date strings

An array of ISO861 DateString representing selected dates.

##### onDayClick?: React.EventHandler<any>;

An event handler, triggered whenever a date it clicked. The callback takes one parameter

`date`: an ISO861 Date string.

##### onDayMouseOver?: React.EventHandler<any>;

An even handler, triggered whenever the mouse moves over a date. The callback takes one parameter

`date`: an ISO861 Date string.

##### onNextClick?: React.EventHandler<any>;

An event handler, triggered when the user clicks the next button.

##### onPrevClick?: React.EventHandler<any>;

An event handler, triggered when the user clicks the prev button.

##### locale?: string;

A string with a BCP 47 language tag. Defaults to `en-US`.

##### localeDates?: string;

Same requirement as `locale`. Used to handle separate date formatting, e.g. only showing date numbers in Western untis. Defaults to `en-US`.

##### firstDayOfWeek?: number;

An integer from 0-6 representing which day weeks should start on. Defaults to 0.

## Helpers

This component also exposes a DateHelper object, a stateless object that offers some useful methods for
processing dates.

**Note** These methods are stateless. You may want to consider memoizing theses methods
when using them.

##### Usage

`import { DateHelper } from '../path/to/DatePicker'`;

##### daysInMonth(month: number, year: number): number

Return the total number of days in a calendar months

##### firstDayOfMonth(month: number, year: number): number

Returns the index of the first day of a month. 0 = Sunday, 6 = Saturday

##### lastDayOfMonth(month: number, year: number): number

Returns the index of the last day of a month. 0 = Sunday, 6 = Saturday

##### weeksInMonth(month: number, year: number, firstDayOfWeek: number): number

Returns the number of weeks in a month.

##### startDateForMonthInView(month: number, year: number, firstDayOfWeek: number): string

Returns an ISO8601 Date String for the first date to be shown for a month. This
will often be a day from the previous month.

##### startDateOffset(a: number, b: number)

Returns an offset between 0 and 6.

Takes a flat array and returns a two 2D array of a given length and chunk size

##### create2DArray(arr: any[], length: number, chunkSize: number): any[][]

##### generateDatesFrom(startTime: number, length: number, locale: string): IDateObject[]

Generate an array of date objects starting from a given timestamp

##### daysBetween(startDate: string, endDate: string): number

Get the number of days between two date strings. Result can be positive or
negative, and mis not guaranteed to be an integer.

##### addMonths(dateString: string, increment: number): string

Adds n months to a date string, and returns the new date string

Returns an array of localised weekday labels

##### weekdayHeadingsWithLocale(locale: string, firstDayOfWeek: number): string[]

Returns a 2 dimensional array of ISO8601 date strings

##### generateDatesFor(month: number, year: number, firstDayOfWeek: number, locale: string): IDateObject[][]
