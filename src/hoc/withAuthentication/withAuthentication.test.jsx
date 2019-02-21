import React from 'react';
import { compose } from 'ramda';

import withAuthentication from './withAuthentication';

const MockComponent = () => <div />;

describe('withAuthentication HOC', () => {
  describe('render', () => {
    it('connected component', () => {
      const Component = compose(withAuthentication)(MockComponent);
      const mountedComponent = shallow(<Component />);
      expect(mountedComponent).toMatchSnapshot();
    });
  });
});
