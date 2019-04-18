import React from 'react';

import { BackButton } from './BackButton';

const getComponent = props => shallow(<BackButton {...props} />);

describe('<BackButton />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
    });
  });
});
