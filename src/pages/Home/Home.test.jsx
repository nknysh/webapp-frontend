import React from 'react';

import { Home } from './Home';

const getComponent = props => shallow(<Home {...props} />);

describe('<Home />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
    });
  });
});
