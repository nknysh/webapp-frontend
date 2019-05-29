import React from 'react';

import Range from './Range';

const getComponent = props => shallow(<Range {...props} />);

describe('<Range />', () => {
  describe('render', () => {
    it('matches snapshots', () => {
      expect(getComponent()).toMatchSnapshot();
      expect(getComponent({ min: 5, max: 1000 })).toMatchSnapshot();
    });
  });
});
