import React from 'react';

import NumberSelect from './NumberSelect';

const getComponent = props => shallow(<NumberSelect {...props} />);

describe('<NumberSelect />', () => {
  describe('render', () => {
    it('matches snapshots', () => {
      expect(getComponent()).toMatchSnapshot();
      expect(getComponent({ startAt: 5 })).toMatchSnapshot();
    });
  });
});
