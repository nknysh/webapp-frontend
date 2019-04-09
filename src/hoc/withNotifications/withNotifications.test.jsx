import React from 'react';
import { compose } from 'ramda';

import withNotifications from './withNotifications';

const MockComponent = () => <div />;

describe('withNotifications HOC', () => {
  describe('render', () => {
    it('connected component', () => {
      const Component = compose(withNotifications)(MockComponent);
      const mountedComponent = shallow(<Component />);
      expect(mountedComponent).toMatchSnapshot();
    });
  });
});
