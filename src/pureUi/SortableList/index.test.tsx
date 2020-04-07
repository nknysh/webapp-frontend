import * as React from 'react';
import { mount } from 'enzyme';

import SortableList, { SortableListProps } from './';

interface SampleItem {
  uuid: string;
  label: string;
}

const createProps = (overwrites: Partial<SortableListProps<SampleItem>> = {}): SortableListProps<SampleItem> => ({
  items: Array.from(
    { length: 5 },
    (v, i) => ({ uuid: `${i}-${i}`, label: `Item ${i}` })
  ),
  keySelector: item => item.uuid,
  renderItem: item => (
    <div className="item">{item.label}</div>
  ),
  onChange: jest.fn(),
  ...overwrites
});

describe('SortableList', () => {

  it('renders items', () => {
    const props = createProps();
    const wrapper = mount(<SortableList<SampleItem> {...props} />);

    expect(wrapper.find('.item')).toHaveLength(5);
    expect(wrapper.find('.item').at(0).text()).toContain('Item 0');
  });

});
