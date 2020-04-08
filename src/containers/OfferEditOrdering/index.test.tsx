import React from 'react';
import { OfferEditOrderingContainer, IOfferEditOrderingProps } from './';
import { shallow } from 'enzyme';
import SortableList from 'pureUi/SortableList';

const createProps = (overrides?: Partial<IOfferEditOrderingProps>): IOfferEditOrderingProps => ({
  orderedOffersList: Array.from(
    { length: 5 },
    (v, i) => ({ uuid: `${i}-${i}`, name: `Item ${i}` })
  ),
  setOrderedOffersListAction: jest.fn(),
  hotelUuid: '1111-2222-3333-4444',
  ...overrides
});

describe('OfferEditOrdering', () => {

  it('renders offers', () => {
    const props = createProps();
    const wrapper = shallow(<OfferEditOrderingContainer {...props}/>);
    const list = wrapper.find(SortableList);

    expect(list).toBeTruthy();
    expect(list.prop('items')).toEqual(props.orderedOffersList);
    expect(list.prop('onChange')).toEqual(props.setOrderedOffersListAction);
    expect(list.prop('keySelector')).toBeTruthy();
    expect(list.prop('renderItem')).toBeTruthy();

  });
});
