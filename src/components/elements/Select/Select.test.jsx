import React from 'react';

import { Select } from './Select';

const getComponent = props => shallow(<Select {...props} />);

describe('<Select />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
    });
  });
});
