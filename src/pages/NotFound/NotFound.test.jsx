import React from 'react';

import NotFound from './NotFound';

const getComponent = props => shallow(<NotFound {...props} />);

describe('<NotFound />', () => {
  describe('render', () => {
    it('matches snapshots', () => {
      expect(getComponent()).toMatchSnapshot();
    });
  });
});
