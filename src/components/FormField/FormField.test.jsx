import React from 'react';

import { FormField } from './FormField';

const getComponent = props => shallow(<FormField {...props} />);

describe('<FormField />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
    });
  });
});
