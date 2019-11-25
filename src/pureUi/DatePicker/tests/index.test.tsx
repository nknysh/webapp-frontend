import { shallow } from 'enzyme';
import * as React from 'react';
import DatePicker from '../index';

describe('<DatePicker />', () => {
  it('should render without an error', () => {
    const subject = shallow(<DatePicker />);
    expect(subject.length).toBe(1);
  });
});
