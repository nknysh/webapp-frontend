import React from 'react';

import { BookingList } from './BookingList';

const getComponent = props => shallow(<BookingList {...props} />);

describe.only('<BookingList />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
    });
  });
});
