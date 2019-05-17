import React from 'react';
import { prop } from 'ramda';

import headerLinks from 'config/links/header';

import { Header } from './Header';

const getComponent = props =>
  shallow(<Header menu={prop('loggedOut', headerLinks)} isAuthenticated={false} {...props} />);

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
