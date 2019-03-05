import React from 'react';

import { PasswordReset } from './PasswordReset';

const getComponent = props => shallow(<PasswordReset {...props} />);

describe('<PasswordReset />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
    });
  });
});
