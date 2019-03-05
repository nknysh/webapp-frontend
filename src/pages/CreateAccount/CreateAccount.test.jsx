import React from 'react';

import { CreateAccount } from './CreateAccount';

const getComponent = props => shallow(<CreateAccount {...props} />);

describe('<CreateAccount />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
    });
  });
});
