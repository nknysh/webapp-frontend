import React from 'react';

import { Input } from './Input';

const getComponent = props => shallow(<Input {...props} />);

describe('<Input />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
    });
  });
});
