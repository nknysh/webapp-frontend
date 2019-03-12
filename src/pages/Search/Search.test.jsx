import React from 'react';

import { Search } from './Search';

const getComponent = props => shallow(<Search match={{ params: {} }} {...props} />);

describe('<Search />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
    });
  });
});
