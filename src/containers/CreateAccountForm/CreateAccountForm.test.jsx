import React from 'react';

import { CreateAccountForm } from './CreateAccountForm';

const getComponent = props => shallow(<CreateAccountForm {...props} />);

describe('<CreateAccountForm />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
    });
  });
});
