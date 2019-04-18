import React from 'react';

import { Checkbox } from './Checkbox';

const getComponent = props => shallow(<Checkbox {...props} />);

describe('<Checkbox />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
    });
  });
});
