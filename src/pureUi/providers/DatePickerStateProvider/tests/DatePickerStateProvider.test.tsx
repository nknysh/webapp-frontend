import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { DatePickerStateProvider, IDatePickerSateProviderProps, IDatePickerSateParams } from '../';

let defaultSelectedDates;
let onDateChangeSpy;
let renderSpy;
let defaultProps: IDatePickerSateProviderProps;
let testState: IDatePickerSateParams;
let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);

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
  renderSpy = jest.fn((state: IDatePickerSateParams) => {
    // Useful if you need to inspect the inner state while writing tests
    // console.log('testState', state);
    testState = state;
    return null;
  });

  defaultProps = {
    isSingleDateSelection: false,
    render: renderSpy,
    onDateChange: onDateChangeSpy,
    defaultSelectedDates,
  };
});

describe('DatePickerStateProvider', () => {
  it('initializes with the correct state', () => {
    mount(<DatePickerStateProvider {...defaultProps} />);
    expect(testState.displayString).toEqual('17 - 31 Dec 2019');
    expect(testState.totalNights).toEqual(14);
    expect(testState.startDate).toEqual(defaultSelectedDates[0]);
    expect(testState.endDate).toEqual(defaultSelectedDates[14]);
    expect(testState.datePickerCurrentDate).toEqual(defaultSelectedDates[0]);
  });

  it('initializes with the correct state is defaultSelectedDates are empty', () => {
    mount(<DatePickerStateProvider defaultSelectedDates={[]} onDateChange={onDateChangeSpy} render={renderSpy} />);
    expect(testState.displayString).toEqual('Select date range');
    expect(testState.totalNights).toEqual(0);
    expect(testState.startDate).toEqual(undefined);
    expect(testState.endDate).toEqual(undefined);
    expect(testState.datePickerCurrentDate.split('T')[0]).toEqual(new Date().toISOString().split('T')[0]);
  });

  it('sets the correct state when handleClick is called', () => {
    const testDate = '2019-12-01T00:00:00.000Z';
    act(() => {
      ReactDOM.render(<DatePickerStateProvider {...defaultProps} />, container);
      testState.handleDayClick(testDate);
    });
    expect(testState.displayString).toEqual('1 Dec 2019');
    expect(testState.totalNights).toEqual(0);
    expect(testState.startDate).toEqual(testDate);
    expect(testState.endDate).toEqual(testDate);
    expect(testState.selectedDates).toEqual([testDate]);
  });

  it('sets the correct state when handleMouseOver is called', () => {
    const testDate = '2019-12-01T00:00:00.000Z';
    const hoverDate = '2019-12-04T00:00:00.000Z';
    const expectedSelection = [
      '2019-12-01T00:00:00.000Z',
      '2019-12-02T00:00:00.000Z',
      '2019-12-03T00:00:00.000Z',
      '2019-12-04T00:00:00.000Z',
    ];
    act(() => {
      ReactDOM.render(<DatePickerStateProvider {...defaultProps} />, container);
      testState.handleDayClick(testDate);
    });
    act(() => {
      testState.handleDateMouseOver!(hoverDate);
    });

    expect(testState.displayString).toEqual('1 - 4 Dec 2019');
    expect(testState.totalNights).toEqual(3);
    expect(testState.startDate).toEqual(testDate);
    expect(testState.endDate).toEqual(hoverDate);
    expect(testState.selectedDates).toEqual(expectedSelection);
  });

  it('it calls the onDateChange callback when date selection ends', () => {
    const testDate = '2019-12-01T00:00:00.000Z';
    const testDate2 = '2019-12-02T00:00:00.000Z';
    act(() => {
      ReactDOM.render(<DatePickerStateProvider {...defaultProps} />, container);
    });

    act(() => {
      testState.toggleDatePicker();
    });

    act(() => {
      testState.handleDayClick(testDate);
    });

    act(() => {
      testState.handleDayClick(testDate2);
    });

    expect(onDateChangeSpy).toBeCalledTimes(1);
    expect(onDateChangeSpy).toHaveBeenCalledWith(['2019-12-01T00:00:00.000Z', '2019-12-02T00:00:00.000Z']);
  });

  it('it calls the onDateChange callback correctly when date selection ends and the second date is a previous date', () => {
    const testDate = '2019-12-01T00:00:00.000Z';
    const testDate2 = '2019-11-30T00:00:00.000Z';
    act(() => {
      ReactDOM.render(<DatePickerStateProvider {...defaultProps} />, container);
    });

    act(() => {
      testState.toggleDatePicker();
    });

    act(() => {
      testState.handleDayClick(testDate);
    });

    act(() => {
      testState.handleDayClick(testDate2);
    });

    expect(onDateChangeSpy).toBeCalledTimes(1);
    expect(onDateChangeSpy).toHaveBeenCalledWith(['2019-11-30T00:00:00.000Z', '2019-12-01T00:00:00.000Z']);
  });

  it('Automatically adds 1 day if the start and end dates are the same when the selection ends', () => {
    const testDate = '2019-12-01T00:00:00.000Z';
    act(() => {
      ReactDOM.render(<DatePickerStateProvider {...defaultProps} />, container);
    });

    act(() => {
      testState.toggleDatePicker();
    });

    act(() => {
      testState.handleDayClick(testDate);
    });

    act(() => {
      testState.handleDayClick(testDate);
    });
    expect(onDateChangeSpy).toHaveBeenCalledWith(['2019-12-01T00:00:00.000Z', '2019-12-02T00:00:00.000Z']);
  });

  it('sets `showDatePicker` to false when date selection ends', () => {
    const testDate = '2019-12-01T00:00:00.000Z';
    act(() => {
      ReactDOM.render(<DatePickerStateProvider {...defaultProps} />, container);
    });

    act(() => {
      testState.toggleDatePicker();
    });

    act(() => {
      testState.handleDayClick(testDate);
    });

    act(() => {
      testState.handleDayClick(testDate);
    });
    expect(testState.showDatePicker).toEqual(false);
  });

  describe('Single Date Selection', () => {
    it('sets the correct state when handleClick is called and isSingleSelection is true', () => {
      const testDate = '2019-12-01T00:00:00.000Z';
      const props = {
        ...defaultProps,
        isSingleDateSelection: true,
      };

      act(() => {
        ReactDOM.render(<DatePickerStateProvider {...props} />, container);
      });

      act(() => {
        testState.toggleDatePicker();
      });

      act(() => {
        testState.handleDayClick(testDate);
      });

      expect(testState.displayString).toEqual('1 Dec 2019');
      expect(testState.totalNights).toEqual(0);
      expect(testState.startDate).toEqual(testDate);
      expect(testState.endDate).toEqual(testDate);
      expect(testState.selectedDates).toEqual([testDate]);
      expect(testState.dateSelectionInProgress).toEqual(false);
      expect(testState.showDatePicker).toEqual(false);
    });

    it('it calls the onDateChange callback correctly on first click if isSingleDateSelection is true', () => {
      const testDate = '2019-12-01T00:00:00.000Z';
      const props = {
        ...defaultProps,
        isSingleDateSelection: true,
      };
      act(() => {
        ReactDOM.render(<DatePickerStateProvider {...props} />, container);
      });

      act(() => {
        testState.handleDayClick(testDate);
      });

      expect(onDateChangeSpy).toBeCalledTimes(1);
      expect(onDateChangeSpy).toHaveBeenCalledWith([testDate]);
    });
  });
});
