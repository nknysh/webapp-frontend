import React from 'react';
import { MultiDateRange, IMultiDateRangeProps } from '../index';
import { shallow, mount } from 'enzyme';
import DateRangeInput from 'pureUi/DateRangeInput';
import { ActionButton, CloseButton } from 'pureUi/Buttons';

const getProps = (overrides?: Partial<IMultiDateRangeProps>): IMultiDateRangeProps => {
  const defaultProps: IMultiDateRangeProps = {
    dateRanges: [],
    onDateChange: jest.fn(),
    onRemoveDate: jest.fn(),
    onNewDate: jest.fn(),
  };

  return {
    ...defaultProps,
    ...overrides,
  };
};

describe('MultiDateRange', () => {
  it('renders ZERO daterange inputs, when given an empty array', () => {
    let wrapper = mount(<MultiDateRange {...getProps()} />);
    let inputs = wrapper.find(DateRangeInput);
    expect(inputs).toHaveLength(0);
  });

  it('renders THREE daterange inputs, when given an array of 3 dates', () => {
    const overrides: Partial<IMultiDateRangeProps> = {
      dateRanges: [['2019-01-01'], ['2019-01-02'], ['2019-01-03']],
    };

    let wrapper = mount(<MultiDateRange {...getProps(overrides)} />);
    let inputs = wrapper.find(DateRangeInput);
    expect(inputs).toHaveLength(3);
  });

  it('renders an Add action button', () => {
    let wrapper = mount(<MultiDateRange {...getProps()} />);
    let actionButtons = wrapper.find(ActionButton);
    expect(actionButtons).toHaveLength(1);
  });

  it('fires the onNewDate callback', () => {
    const props = getProps();
    let wrapper = mount(<MultiDateRange {...props} />);
    let actionButton = wrapper.find(ActionButton).first();
    actionButton.simulate('click');
    expect(props.onNewDate).toHaveBeenCalledTimes(1);
  });

  it('renders THREE remove buttons', () => {
    const overrides: Partial<IMultiDateRangeProps> = {
      dateRanges: [['2019-01-01'], ['2019-01-02'], ['2019-01-03']],
    };
    const props = getProps(overrides);
    let wrapper = mount(<MultiDateRange {...props} />);
    let closeButtons = wrapper.find(CloseButton);
    expect(closeButtons).toHaveLength(3);
  });

  it('fires the onRemoveDate callback (First)', () => {
    const overrides: Partial<IMultiDateRangeProps> = {
      dateRanges: [['2019-01-01'], ['2019-01-02'], ['2019-01-03']],
    };
    const props = getProps(overrides);
    let wrapper = mount(<MultiDateRange {...props} />);
    let closeButtons = wrapper.find(CloseButton);
    closeButtons.first().simulate('click');
    expect(props.onRemoveDate).toHaveBeenCalledWith(0);
  });

  it('fires the onRemoveDate callback (Last)', () => {
    const overrides: Partial<IMultiDateRangeProps> = {
      dateRanges: [['2019-01-01'], ['2019-01-02'], ['2019-01-03']],
    };
    const props = getProps(overrides);
    let wrapper = mount(<MultiDateRange {...props} />);
    let closeButtons = wrapper.find(CloseButton);
    closeButtons.last().simulate('click');
    expect(props.onRemoveDate).toHaveBeenCalledWith(2);
  });
});
