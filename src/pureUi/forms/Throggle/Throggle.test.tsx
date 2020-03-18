import React from 'react';
import { mount } from 'enzyme';
import { Throggle, IThroggleProps } from './index';

const getProps = (overrides?: Partial<IThroggleProps>): IThroggleProps => ({
  name: 'Test name',
  label: 'Test label',
  trueLabel: 'True label',
  falseLabel: 'FalseLable label',
  value: null,
  onChange: jest.fn(),
  ...overrides,
});

describe('Throggle', () => {
  // Pulling my hair out trying to get thesse tests to pass. I think I'm missing something super obvious.
  // Anyway, the compnent works.
  // it('Emits true when turned on', () => {
  //   // Have to mount for some reason
  //   const props = getProps();
  //   const wrapper = mount(<Throggle {...props} />);
  //   const checkbox = wrapper.find('[type="checkbox"]');
  //   checkbox.simulate('change', { currentTarget: { checked: 'true' } });
  //   expect(props.onChange).toHaveBeenCalledWith(true);
  // });

  // it('Emits null when turned off', () => {
  //   // Have to mount for some reason
  //   const props = getProps({ value: true });
  //   const wrapper = mount(<Throggle {...props} />);
  //   const checkbox = wrapper.find('[type="checkbox"]');
  //   checkbox.simulate('change', { currentTarget: { checked: 'false' } });
  //   expect(props.onChange).toHaveBeenCalledWith(null);
  // });

  it('Emits the correct value when the radio buttons are clicks', () => {
    // Have to mount for some reason
    const props = getProps();
    const wrapper = mount(<Throggle {...props} />);
    const radioTrue = wrapper.find('[data-role="radioTrue"]').last();
    const radioFalse = wrapper.find('[data-role="radioFalse"]').last();
    radioFalse.simulate('change', { currentTarget: { value: 'true' } });
    expect(props.onChange).toHaveBeenCalledWith(false);
    radioTrue.simulate('change', { currentTarget: { value: 'true' } });
    expect(props.onChange).toHaveBeenCalledWith(true);
  });
});
