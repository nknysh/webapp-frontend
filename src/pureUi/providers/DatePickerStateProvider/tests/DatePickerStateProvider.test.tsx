import React from 'react';
import { mount } from 'enzyme';
import { DatePickerStateProvider, IDatePickerSateProviderProps, IDatePickerState } from '../';

let defaultSelectedDates;
let onDateChangeSpy;
let renderSpy;
let defaultProps: IDatePickerSateProviderProps;
let testState: IDatePickerState;

beforeEach(() => {
  defaultSelectedDates = [
    '2019-12-17T00:00:00.000Z',
    '2019-12-18T00:00:00.000Z',
    '2019-12-19T00:00:00.000Z',
    '2019-12-20T00:00:00.000Z',
    '2019-12-21T00:00:00.000Z',
    '2019-12-22T00:00:00.000Z',
    '2019-12-23T00:00:00.000Z',
    '2019-12-24T00:00:00.000Z',
    '2019-12-25T00:00:00.000Z',
    '2019-12-26T00:00:00.000Z',
    '2019-12-27T00:00:00.000Z',
    '2019-12-28T00:00:00.000Z',
    '2019-12-29T00:00:00.000Z',
    '2019-12-30T00:00:00.000Z',
    '2019-12-31T00:00:00.000Z',
  ];

  onDateChangeSpy = jest.fn();
  renderSpy = jest.fn((state: IDatePickerState) => {
    console.log('testState', state);
    testState = state;
    return null;
  });

  defaultProps = {
    render: renderSpy,
    onDateChange: onDateChangeSpy,
    defaultSelectedDates,
  };
});

describe('DatePickerStateProvider', () => {
  it('starts with the correct display string', done => {
    let subject = mount(<DatePickerStateProvider {...defaultProps} />);
    expect(testState.displayString).toEqual('17 - 31 Dec 2019');
  });
});
