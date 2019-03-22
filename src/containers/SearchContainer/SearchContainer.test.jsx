import React from 'react';

import { SearchContainer } from './SearchContainer';

const getComponent = props => shallow(<SearchContainer {...props} />);

describe('<SearchContainer />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
    });
  });
});
