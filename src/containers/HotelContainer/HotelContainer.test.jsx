import React from 'react';

import { HotelContainer } from './HotelContainer';

const getComponent = props => shallow(<HotelContainer {...props} />);

describe('<HotelContainer />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
    });
  });
});
