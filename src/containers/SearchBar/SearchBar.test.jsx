import React from 'react';

import { SearchBar } from './SearchBar';

const getComponent = props => shallow(<SearchBar isLoading={false} {...props} />);

describe('<SearchBar />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
    });
  });
});
