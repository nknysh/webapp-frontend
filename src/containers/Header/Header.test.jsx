import React from 'react';

import headerLinks from 'config/links/header--logged-out';

import { Header } from './Header';

const getComponent = props => shallow(<Header menu={headerLinks} isAuthenticated={false} {...props} />);

describe('<Header />', () => {
  describe('render', () => {
    it('matches logged out snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
    });
    it('matches logged in snapshot', () => {
      expect(getComponent({ isAuthenticated: true })).toMatchSnapshot();
    });
  });
});
