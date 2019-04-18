import React from 'react';

import { Form } from './Form';

const getComponent = props => shallow(<Form {...props} />);

describe('<Form />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
    });
  });
});
