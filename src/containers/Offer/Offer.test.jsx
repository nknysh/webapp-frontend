import React from 'react';

import { Offer } from './Offer';

// Where are these props meant to be coming from? This test should never
// have passed.
const getComponent = props => shallow(<Offer {...props} />);

describe('<Offer />', () => {
  describe('render', () => {
    it.skip('matches snapshots', () => {
      expect(getComponent()).toMatchSnapshot();
    });
  });
});
