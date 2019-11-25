import { shallow } from 'enzyme';
import * as expect from 'expect';
import * as React from 'react';
import DateButton from '../index';

describe('<DateButton />', () => {
  it('should render without an error', () => {
    const subject = shallow(<DateButton dateObject={{ dateString: '2017-06-12T23:00:00.000Z', date: 12, month: 6 }} />);
    expect(subject.length).toBe(1);
  });
});
