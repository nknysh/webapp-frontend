import React from 'react';

import { SetPassword } from './SetPassword';

const getComponent = props => shallow(<SetPassword match={{ params: {} }} {...props} />);

describe('<SetPassword />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
    });
  });
});
