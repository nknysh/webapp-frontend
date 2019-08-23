import React from 'react';

import { GuestSelect } from './GuestSelect';

const getComponent = props => shallow(<GuestSelect totalRooms={2} {...props} />);

describe('<GuestSelect />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
    });
  });
});
