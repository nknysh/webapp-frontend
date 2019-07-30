import React from 'react';
import { compose } from 'ramda';

import withUser from './withUser';

const MockComponent = () => <div />;

describe('withUser HOC', () => {
  describe('render', () => {
    it('connected component', () => {
      const Component = compose(withUser)(MockComponent);
      const mountedComponent = shallow(<Component />);
      expect(mountedComponent).toMatchSnapshot();
    });
  });
});
