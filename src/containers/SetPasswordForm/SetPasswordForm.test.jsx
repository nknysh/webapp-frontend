import React from 'react';

import { SetPasswordForm } from './SetPasswordForm';

const getComponent = props => shallow(<SetPasswordForm {...props} />);

describe('<SetPasswordForm />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
    });
  });
});
