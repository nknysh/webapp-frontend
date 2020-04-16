import React, { useMemo, Fragment } from 'react';

import produce from 'immer';
import TextInput from 'pureUi/TextInput';
import PureUiLabel, { ILabelProps } from 'pureUi/Label';
import Select from 'pureUi/Select';
import Checkbox from 'pureUi/Checkbox';
import Textarea from 'pureUi/Textarea';
import { DatePickerStateProvider, IDatePickerSateParams } from 'pureUi/providers/DatePickerStateProvider';
import DateRangeInput from 'pureUi/DateRangeInput';
import { formatDate, addDaysUTC, subDaysUTC } from 'utils';
import {
  IValueLabelPair,
  IBookingGuestInformationForm,
  IBookingGuestInformationFormValidation
} from '../../interfaces';
import { BookingGuestInformationFormStyles } from './styles';

const titles: IValueLabelPair[] = [
  {
    value: '',
    label: 'None Set',
  },
  {
    value: 'master',
    label: 'Master',
  },
  {
    value: 'miss',
    label: 'Miss',
  },
  {
    value: 'mr',
    label: 'Mr.',
  },
  {
    value: 'mrs',
    label: 'Mrs.',
  },
  {
    value: 'ms',
    label: 'Ms.',
  },
];

const Label = (props: ILabelProps) => {
  const { className, isError, ...rest } = props;
  
  const finalClassName = useMemo(
    () => [className, isError ? 'error': null].filter(item => Boolean(item)).join(' '),
    [className, isError]
  );

  return (
    <PureUiLabel
      className={finalClassName}
      isError={isError}
      {...rest}
    />
  );
};

export const BookingGuestInformationForm = (props: IBookingGuestInformationForm) => {
  const {
    bookingGuestFormValues,
    onValueChange,
    sections = {
      guestInfo: true,
      flightInfo: true,
      specialRequests: true,
      comments: true
    },
    validation = {}
  } = props;

  const isError = (key: keyof IBookingGuestInformationFormValidation) => 
    Boolean(validation[key]?.length);

  if (sections.specialRequests && !bookingGuestFormValues.specialRequests) {
    bookingGuestFormValues.specialRequests = [];
  }

  const handleValueChange = (valueName, newValue) => {
    return produce(bookingGuestFormValues, draft => {
      draft[valueName] = newValue;
    });
  };

  const toggleCheckboxValue = valueName => {
    return {
      [valueName]: !bookingGuestFormValues[valueName],
    };
  };

  const toggleSpecialRequest = specialRequestName => {
    return produce(bookingGuestFormValues, draft => {
      if (draft.specialRequests?.includes(specialRequestName)) {
        draft.specialRequests.splice(draft.specialRequests.indexOf(specialRequestName), 1);
      } else {
        draft.specialRequests?.push(specialRequestName);
      }
      return draft;
    });
  };

  const minDate = bookingGuestFormValues.flightArrivalDate ? 
    addDaysUTC(bookingGuestFormValues.flightArrivalDate, 1).toISOString() : undefined;
  
  const maxDate = bookingGuestFormValues.flightDepartureDate ? 
    subDaysUTC(bookingGuestFormValues.flightDepartureDate, 1).toISOString() : undefined;


  return (
    <BookingGuestInformationFormStyles>
      {sections.guestInfo && (
        <Fragment>
          <Label className="title error" text="Title" isError={isError('guestTitle')}>
            <Select
              value={bookingGuestFormValues.guestTitle || ''}
              options={titles}
              onChange={e => onValueChange(handleValueChange('guestTitle', e.target.value))}
            ></Select>
          </Label>
          
          <Label className="firstName" text="First Name" isError={isError('guestFirstName')}>
            <TextInput
              value={bookingGuestFormValues.guestFirstName || ''}
              onChange={e => onValueChange(handleValueChange('guestFirstName', e.currentTarget.value))}
            />
          </Label>
          
          <Label className="lastName" text="Last Name" isError={isError('guestLastName')}>
            <TextInput
              value={bookingGuestFormValues.guestLastName || ''}
              onChange={e => onValueChange(handleValueChange('guestLastName', e.currentTarget.value))}
            />
          </Label>
        </Fragment>
      )}
      {sections.flightInfo && (
        <div className="flightInfo">
          <Label className="flightInfoLabel">Flight Information</Label>

          <Label className="arrivalNumber" text="Arrival Number" isError={isError('flightArrivalNumber')}>
            <TextInput
              value={bookingGuestFormValues.flightArrivalNumber || ''}
              onChange={e => onValueChange(handleValueChange('flightArrivalNumber', e.currentTarget.value))}
            />
          </Label>

          <Label className="arrivalDate" text="Arrival Date" isError={isError('flightArrivalDate')}>
            <DatePickerStateProvider
              isSingleDateSelection={true}
              defaultSelectedDates={[]}
              onDateChange={dateTimeStrings => {
                onValueChange(handleValueChange('flightArrivalDate', formatDate(dateTimeStrings[0])));
              }}
              render={(params: IDatePickerSateParams) => (
                <DateRangeInput
                noPortal
                className="serachBarDateRangeInput"
                displayString={params.displayString}
                currentDate={params.datePickerCurrentDate}
                selectedDates={params.selectedDates}
                onDayClick={params.handleDayClick}
                showDatePicker={params.showDatePicker}
                onNextClick={params.incrementDate}
                onPrevClick={params.decrementDate}
                onMouseDown={params.toggleDatePicker}
                onClickOutside={params.hideDatePicker}
                maxDate={maxDate}
                />
                )}
                />
          </Label>

          <Label className="departureNumber" text="Dearture Number" isError={isError('flightDepartureNumber')}>
            <TextInput
              value={bookingGuestFormValues.flightDepartureNumber || ''}
              onChange={e => onValueChange(handleValueChange('flightDepartureNumber', e.currentTarget.value))}
            />
          </Label>

          <Label className="departureDate" text="Departure Date" isError={isError('flightDepartureDate')}>
            <DatePickerStateProvider
              isSingleDateSelection={true}
              defaultSelectedDates={[]}
              onDateChange={dateTimeStrings => {
                onValueChange(handleValueChange('flightDepartureDate', formatDate(dateTimeStrings[0])));
              }}
              render={(params: IDatePickerSateParams) => (
                <DateRangeInput
                  noPortal
                  className="serachBarDateRangeInput"
                  displayString={params.displayString}
                  currentDate={params.datePickerCurrentDate}
                  selectedDates={params.selectedDates}
                  onDayClick={params.handleDayClick}
                  showDatePicker={params.showDatePicker}
                  onNextClick={params.incrementDate}
                  onPrevClick={params.decrementDate}
                  onMouseDown={params.toggleDatePicker}
                  onClickOutside={params.hideDatePicker}
                  minDate={minDate}
                />
              )}
            />
          </Label>
        </div>
      )}
      {sections.specialRequests && bookingGuestFormValues.specialRequests && (
        <div className="specialRequests">
          <Label isError={isError('specialRequests')}>Special Requests</Label>
          <div className="twoColumn">
            <Label text="Crib Cob" inline reverse>
              <Checkbox
                checked={bookingGuestFormValues.specialRequests.includes('cribCob')}
                onChange={() => onValueChange(toggleSpecialRequest('cribCob'))}
              />
            </Label>

            <Label text="Bed Guard" inline reverse>
              <Checkbox
                checked={bookingGuestFormValues.specialRequests.includes('bedGuard')}
                onChange={() => onValueChange(toggleSpecialRequest('bedGuard'))}
              />
            </Label>
          
            <Label text="Adjacent Rooms" inline reverse>
              <Checkbox
                checked={bookingGuestFormValues.specialRequests.includes('adjacentRooms')}
                onChange={() => onValueChange(toggleSpecialRequest('adjacentRooms'))}
              />
            </Label>
          
            <Label text="Connecting Rooms" inline reverse>
              <Checkbox
                checked={bookingGuestFormValues.specialRequests.includes('connectingRooms')}
                onChange={() => onValueChange(toggleSpecialRequest('connectingRooms'))}
              />
            </Label>
          
            <Label text="Accessible Room" inline reverse>
              <Checkbox
                checked={bookingGuestFormValues.specialRequests.includes('accessibleRoom')}
                onChange={() => onValueChange(toggleSpecialRequest('accessibleRoom'))}
              />
            </Label>
          
            <Label text="Dietary" inline reverse>
              <Checkbox
                checked={bookingGuestFormValues.specialRequests.includes('dietary')}
                onChange={() => onValueChange(toggleSpecialRequest('dietary'))}
              />
            </Label>
          </div>
        </div>
      )}
      {sections.comments && (
        <div className="comments">
          <Label text="Comments" isError={isError('comments')}>
            <Textarea
              value={bookingGuestFormValues.comments || ''}
              onChange={e => onValueChange(handleValueChange('comments', e.target.value))}
            />
          </Label>
        </div>
      )}
    </BookingGuestInformationFormStyles>
  );
};

export default BookingGuestInformationForm;
