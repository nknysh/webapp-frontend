import React from 'react';

import { SearchResults } from './SearchResults';

const getComponent = props => shallow(<SearchResults getResults={() => []} {...props} />);

describe('<SearchResults />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
    });
  });
});
