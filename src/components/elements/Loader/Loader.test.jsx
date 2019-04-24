import React from 'react';

import Loader from './Loader';

const getComponent = props => shallow(<Loader {...props} />);

describe('<Loader />', () => {
  describe('render', () => {
    it('matches snapshots', () => {
      expect(getComponent()).toMatchSnapshot();
      expect(getComponent({ isLoading: true, text: 'Loading' })).toMatchSnapshot();
      expect(getComponent({ isLoading: true })).toMatchSnapshot();
      expect(getComponent({ isLoading: false, children: 'Loaded content' })).toMatchSnapshot();
    });
  });
});
