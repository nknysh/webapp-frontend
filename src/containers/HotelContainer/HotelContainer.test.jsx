import React from 'react';

import { noop } from 'utils';

import { HotelContainer } from './HotelContainer';

const getComponent = props =>
  shallow(<HotelContainer getBooking={noop} getAccommodationProducts={noop} getHotelPhotos={noop} {...props} />);

describe('<HotelContainer />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
    });
  });
});
