import React from 'react';

import { Search } from './Search';

const getComponent = props => shallow(<Search {...props} />);

describe('<Search />', () => {
  describe('render', () => {
    it.skip('matches snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
    });
  });
});
