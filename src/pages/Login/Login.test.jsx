import React from 'react';

import { Login } from './Login';

const getComponent = props => shallow(<Login {...props} />);

describe('<Login />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
    });
  });
});
