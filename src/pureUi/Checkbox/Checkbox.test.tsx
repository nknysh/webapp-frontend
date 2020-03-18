import React from 'react';
import { mount } from 'enzyme';
import Checkbox from '.';

describe('Checkbox', () => {
  let onChangeSpy;

  beforeEach(() => {
    onChangeSpy = jest.fn();
  });

  it('Emits true when enabled', () => {
    const wrapper = mount(<Checkbox onChange={onChangeSpy} />);
    const checkbox = wrapper.find('[type="checkbox"]');
    checkbox.simulate('change', { currentTarget: { checked: true } });
    expect(onChangeSpy).toHaveBeenCalled();
  });

  it('Emits true when enabled', () => {
    const wrapper = mount(<Checkbox onChange={onChangeSpy} value="true" />);
    const checkbox = wrapper.find('[type="checkbox"]');
    checkbox.simulate('change', { currentTarget: { checked: true } });
    expect(onChangeSpy).toHaveBeenCalled();
  });
});
