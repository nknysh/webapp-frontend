import React from 'react';

import { PasswordResetForm } from './PasswordResetForm';

const getComponent = props => shallow(<PasswordResetForm {...props} />);

describe('<PasswordResetForm />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
    });
  });
});
