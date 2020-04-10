import * as React from 'react';
import { shallow } from 'enzyme';
import BookingStatusHistory, { BookingStatusHistoryProps } from './';
import BookingStatus from '../BookingStatus';


const createProps = (overwrites: Partial<BookingStatusHistoryProps> = {}) => {
  return {
    data: [
      { status: 'requested' , timestamp: '2020-04-10T03:00:37Z' },
      { status: 'confirmed' , timestamp: '2020-04-10T05:43:37Z' },
      { status: 'potential' , timestamp: '2020-04-11T13:00:37Z' },
      { status: 'cancelled'  , timestamp: '2020-04-14T05:00:37Z' },
    ],
    ...overwrites
  };
};

describe('BookingStatusHistory', () => {

  it('renders changelog items correctly', () => {
    const props = createProps();
    const wrapper = shallow(<BookingStatusHistory {...props} />);

    expect(wrapper.find(BookingStatus)).toHaveLength(props.data.length);
    expect(wrapper.find(BookingStatus).at(0).prop('status')).toBe(props.data[0].status);
  });

});
