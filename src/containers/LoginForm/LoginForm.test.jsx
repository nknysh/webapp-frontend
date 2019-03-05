import React from 'react';

import { LoginForm } from './LoginForm';

const getComponent = props => shallow(<LoginForm {...props} />);

describe('<LoginForm />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
    });
  });
});
