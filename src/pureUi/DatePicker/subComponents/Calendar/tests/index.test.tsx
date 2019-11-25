import { shallow } from 'enzyme';
import * as React from 'react';
import Calendar from '../index';

describe('<Calendar />', () => {
  it('should render without an error', () => {
    const subject = shallow(<Calendar />);
    expect(subject.length).toBe(1);
  });
});
