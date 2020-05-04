import * as React from 'react';
import { render } from 'enzyme';
import Badge, { BadgeProps } from './';

const createProps = (overwrites: Partial<BadgeProps> = {}) => {
  return {
    count: 3,
    showZero: false,
    ...overwrites
  };
};

describe('Badge', () => {

  it('renders non-zero count correctly', () => {
    const props = createProps();
    const wrapper = render(<Badge {...props} />);

    expect(wrapper.find('.badge-indicator').text()).toBe('3');
  });

  it('renders zero count correctly', () => {
    let props = createProps({ count: 0 });
    let wrapper = render(<Badge {...props} />);

    expect(wrapper.find('.badge-indicator')).toHaveLength(0);

    props = createProps({ count: 0, showZero: true });
    wrapper = render(<Badge {...props} />);

    expect(wrapper.find('.badge-indicator').text()).toBe('0');
  });

});
