import React from 'react';

import Offer from './Offer';

const getComponent = props => shallow(<Offer {...props} />);

describe('<Offer />', () => {
  describe('render', () => {
    it('matches snapshots', () => {
      expect(getComponent()).toMatchSnapshot();
    });
  });
});
