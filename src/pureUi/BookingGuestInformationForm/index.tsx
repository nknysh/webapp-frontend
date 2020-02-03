import React, { useEffect } from 'react';

import produce from 'immer';
import TextInput from 'pureUi/TextInput';
import Label from 'pureUi/Label';
import Select from 'pureUi/Select';
import Checkbox from 'pureUi/Checkbox';
import Textarea from 'pureUi/Textarea';
import { DatePickerStateProvider, IDatePickerSateParams } from 'pureUi/providers/DatePickerStateProvider';
import DateRangeInput from 'pureUi/DateRangeInput';
import { formatDate } from 'utils';
import { IValueLabelPair, IBookingGuestInformationForm } from '../../interfaces';
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

export const BookingGuestInformationForm = (props: IBookingGuestInformationForm) => {
  const { bookingGuestFormValues, onValueChange } = props;

  if (!bookingGuestFormValues.specialRequests) {
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

  return (
    <BookingGuestInformationFormStyles>      
        <Label className="title" text="Title">
          <Select
            value={bookingGuestFormValues.guestTitle || ''}
            options={titles}
            onChange={e => onValueChange(handleValueChange('guestTitle', e.target.value))}
          ></Select>
        </Label>
        
        <Label className="firstName" text="First Name">
          <TextInput
            value={bookingGuestFormValues.guestFirstName || ''}
            onChange={e => onValueChange(handleValueChange('guestFirstName', e.currentTarget.value))}
          />
        </Label>
        
        <Label className="lastName" text="Last Name">
          <TextInput
            value={bookingGuestFormValues.guestLastName || ''}
            onChange={e => onValueChange(handleValueChange('guestLastName', e.currentTarget.value))}
          />
        </Label>
        
        <Label className="repeatGuest" text="This client is a repeating guest" inline reverse>
          <Checkbox
            checked={bookingGuestFormValues.isRepeatGuest || false}
            onChange={() => {
              try {
                return onValueChange(toggleCheckboxValue('isRepeatGuest'));
              } catch (e) {
                console.error(`Error ${e}`);
              }
            }}
          />
        </Label>

        <Label className="flightInfoLabel">Flight Information</Label>

        <Label className="arrivalNumber" text="Arrival Number">
          <TextInput
            value={bookingGuestFormValues.flightArrivalNumber || ''}
            onChange={e => onValueChange(handleValueChange('flightArrivalNumber', e.currentTarget.value))}
          />
        </Label>
        
        <Label className="arrivalDate" text="Arrival Date">
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
              />
              )}
              />
        </Label>
        
        <Label className="departureNumber" text="Dearture Number">
          <TextInput
            value={bookingGuestFormValues.flightDepartureNumber || ''}
            onChange={e => onValueChange(handleValueChange('flightDepartureNumber', e.currentTarget.value))}
          />
        </Label>
        
        <Label className="departureDate" text="Departure Date">
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
              />
            )}
          />
        </Label>
        <div className="specialRequests">
          <Label>Special Requests</Label>
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
        
        <div className="comments">
          <Label text="Comments">
            <Textarea
              value={bookingGuestFormValues.comments || ''}
              onChange={e => onValueChange(handleValueChange('comments', e.target.value))}
            />
          </Label>
        </div>
      
    </BookingGuestInformationFormStyles>
  );
};

export default BookingGuestInformationForm;
