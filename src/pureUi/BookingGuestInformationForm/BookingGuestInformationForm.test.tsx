import React from 'react';
import { shallow } from 'enzyme';
import BookingGuestInformationForm from './index';
import { IBookingInformation } from '../../interfaces';
import TextInput from 'pureUi/TextInput';

const values = (overrides?: IBookingInformation): IBookingInformation => ({
  guestTitle: undefined,
  guestFirstName: undefined,
  guestLastName: undefined,
  flightArrivalNumber: undefined,
  flightDepartureNumber: undefined,
  flightArrivalDate: undefined,
  flightDepartureDate: undefined,
  taMarginType: undefined,
  taMarginAmount: undefined,
  specialRequests: [],
  comments: undefined,
  proposalUuid: undefined,
  travelAgentUserUuid: undefined,
  ...overrides,
});

describe('BookingGuestInformationForm', () => {
  let subject;
  let valueChangeSpy;

  beforeEach(() => {
    valueChangeSpy = jest.fn();
    subject = shallow(<BookingGuestInformationForm bookingGuestFormValues={values()} onValueChange={valueChangeSpy} />);
  });

  it('renders correctly with empty props', () => {
    expect(subject).toMatchSnapshot();
  });

  it('connect the value change function', () => {
    const firstInput = subject.find(TextInput).first();
    const event = { currentTarget: { value: 'TEST' } };
    const expectedValues = {
      comments: undefined,
      flightArrivalDate: undefined,
      flightArrivalNumber: undefined,
      flightDepartureDate: undefined,
      flightDepartureNumber: undefined,
      guestFirstName: 'TEST',
      guestLastName: undefined,
      guestTitle: undefined,
      proposalUuid: undefined,
      specialRequests: [],
      taMarginAmount: undefined,
      taMarginType: undefined,
      travelAgentUserUuid: undefined,
    };
    firstInput.simulate('change', event);
    expect(valueChangeSpy).toHaveBeenCalledTimes(1);
    expect(valueChangeSpy).toHaveBeenCalledWith(expectedValues);
  });
});
