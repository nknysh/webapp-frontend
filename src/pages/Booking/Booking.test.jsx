import React from 'react';

import { Booking } from './Booking';

const getComponent = props => shallow(<Booking {...props} />);

describe('<Booking />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
    });
  });
});
