import React from 'react';

import { UserPanel } from './UserPanel';

const getComponent = props => shallow(<UserPanel isLoading={false} {...props} />);

describe('<UserPanel />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
    });
  });
});
