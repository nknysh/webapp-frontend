import React from 'react';

import Slider from './Slider';

const getComponent = props => shallow(<Slider {...props} />);

describe('<Slider />', () => {
  describe('render', () => {
    it('matches snapshots', () => {
      expect(getComponent({ children: [<div key="1" />, <div key="2" />, <div key="3" />] })).toMatchSnapshot();
    });
  });
});
