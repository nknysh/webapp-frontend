import React from 'react';

import { HomeAuthenticated } from './HomeAuthenticated';

const getComponent = props => shallow(<HomeAuthenticated {...props} />);

describe('<HomeAuthenticated />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
    });
  });
});
