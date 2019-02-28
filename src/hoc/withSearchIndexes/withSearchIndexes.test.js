import React from 'react';
import { compose } from 'ramda';

import withSearchIndexes from './withSearchIndexes';

const MockComponent = () => <div />;

describe('withSearchIndexes HOC', () => {
  describe('render', () => {
    it('connected component', () => {
      const Component = compose(withSearchIndexes([]))(MockComponent);
      const mountedComponent = shallow(<Component />);
      expect(mountedComponent).toMatchSnapshot();
    });
  });
});
