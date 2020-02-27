import { format, isSameMonth, isSameYear } from 'date-fns';
import { formatDateRangeDisplay } from 'utils/date';

export const getDateRangeDisplayStringDeprecated = (startDate: string, endDate: string): string => {
  if (!endDate) {
    return startDate ? format(new Date(startDate), 'LLL') : 'Select date range';
  }

  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);
  const startDay = format(startDateObj, 'd');
  const endDay = format(endDateObj, 'd');
  const startMonth = format(startDateObj, 'LLL');
  const endMonth = format(endDateObj, 'LLL');
  const startYear = format(startDateObj, 'yyyy');
  const endYear = format(endDateObj, 'yyyy');
  const inSameMonth = isSameMonth(startDateObj, endDateObj);
  const inSameYear = isSameYear(startDateObj, endDateObj);

  if (startDate === endDate) {
    return `${startDay} ${startMonth} ${startYear}`;
  }

  if (!inSameMonth && inSameYear) {
    return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${endYear}`;
  }

  if (!inSameMonth && !inSameYear) {
    return `${startDay} ${startMonth} ${startYear} - ${endDay} ${endMonth} ${endYear}`;
  }

  //  Default same month/year
  return `${startDay} - ${endDay} ${startMonth} ${endYear}`;
};

export const getDateRangeDisplayString = (startDate: string, endDate: string): string => {
  return formatDateRangeDisplay(startDate, endDate) || 'Select date range';
};
