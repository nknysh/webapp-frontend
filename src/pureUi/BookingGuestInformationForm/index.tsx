import React, { useEffect } from 'react';

import produce from 'immer';
import Input from 'pureUi/Input';
import Select from 'pureUi/Select';
import Checkbox from 'pureUi/Checkbox';
import Textarea from 'pureUi/Textarea';
import { DatePickerStateProvider, IDatePickerSateParams } from 'pureUi/providers/DatePickerStateProvider';
import DateRangeInput from 'pureUi/DateRangeInput';
import { formatDate } from 'utils';
import { IValueLabelPair, IBookingGuestInformationForm } from '../../interfaces';

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
    <div>
      <div>
        <label>Title</label>
        <Select
          value={bookingGuestFormValues.guestTitle || ''}
          options={titles}
          onChange={e => onValueChange(handleValueChange('guestTitle', e.target.value))}
        ></Select>
      </div>

      <div className="mt-4">
        <label>First Name</label>
        <Input
          value={bookingGuestFormValues.guestFirstName || ''}
          onChange={e => onValueChange(handleValueChange('guestFirstName', e.target.value))}
        />
      </div>

      <div className="mt-4">
        <label>Last Name</label>
        <Input
          value={bookingGuestFormValues.guestLastName || ''}
          onChange={e => onValueChange(handleValueChange('guestLastName', e.target.value))}
        />
      </div>

      <div className="mt-4">
        <label>This client is a repeating guest</label>
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
      </div>

      <hr />

      <div className="mt-4">
        <label>Flight Information</label>
        <div className="flex">
          <div className="w-50 pr-2">
            <label>Arrival Number</label>
            <Input
              value={bookingGuestFormValues.flightArrivalNumber || ''}
              onChange={e => onValueChange(handleValueChange('flightArrivalNumber', e.target.value))}
            />
          </div>
          <div className="w-50 pl-2">
            <label>Arrival Date</label>

            <DatePickerStateProvider
              isSingleDateSelection={true}
              defaultSelectedDates={[]}
              onDateChange={dateTimeStrings => {
                onValueChange(handleValueChange('flightArrivalDate', formatDate(dateTimeStrings[0])));
              }}
              render={(params: IDatePickerSateParams) => (
                <DateRangeInput
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
          </div>
        </div>

        <div className="flex mt-4">
          <div className="w-50 pr-2">
            <label>Dearture Number</label>
            <Input
              value={bookingGuestFormValues.flightDepartureNumber || ''}
              onChange={e => onValueChange(handleValueChange('flightDepartureNumber', e.target.value))}
            />
          </div>
          <div className="w-50 pl-2">
            <label>Departure Date</label>

            <DatePickerStateProvider
              isSingleDateSelection={true}
              defaultSelectedDates={[]}
              onDateChange={dateTimeStrings => {
                onValueChange(handleValueChange('flightDepartureDate', formatDate(dateTimeStrings[0])));
              }}
              render={(params: IDatePickerSateParams) => (
                <DateRangeInput
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
          </div>
        </div>
      </div>

      <hr />

      <div>
        <label>Special Requests</label>

        <div>
          <label>Crib Cob</label>
          <Checkbox
            checked={bookingGuestFormValues.specialRequests.includes('cribCob')}
            onChange={() => onValueChange(toggleSpecialRequest('cribCob'))}
          />
        </div>

        <div>
          <label>Bed Guard</label>
          <Checkbox
            checked={bookingGuestFormValues.specialRequests.includes('bedGuard')}
            onChange={() => onValueChange(toggleSpecialRequest('bedGuard'))}
          />
        </div>

        <div>
          <label>Adjacent Rooms</label>
          <Checkbox
            checked={bookingGuestFormValues.specialRequests.includes('adjacentRooms')}
            onChange={() => onValueChange(toggleSpecialRequest('adjacentRooms'))}
          />
        </div>

        <div>
          <label>Connecting Rooms</label>
          <Checkbox
            checked={bookingGuestFormValues.specialRequests.includes('connectingRooms')}
            onChange={() => onValueChange(toggleSpecialRequest('connectingRooms'))}
          />
        </div>

        <div>
          <label>Accessible Room</label>
          <Checkbox
            checked={bookingGuestFormValues.specialRequests.includes('accessibleRoom')}
            onChange={() => onValueChange(toggleSpecialRequest('accessibleRoom'))}
          />
        </div>

        <div>
          <label>Dietary</label>
          <Checkbox
            checked={bookingGuestFormValues.specialRequests.includes('dietary')}
            onChange={() => onValueChange(toggleSpecialRequest('dietary'))}
          />
        </div>
      </div>

      <hr />

      <div className="mb-4">
        <label>Comments</label>
        <Textarea
          value={bookingGuestFormValues.comments || ''}
          onChange={e => onValueChange(handleValueChange('comments', e.target.value))}
        />
      </div>
    </div>
  );
};

export default BookingGuestInformationForm;
