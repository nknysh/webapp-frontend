import React from 'react';
import { prop } from 'ramda';

import headerLinks from 'config/links/header';

import Menu from './Menu';

const getComponent = props => shallow(<Menu isAuthenticated={false} links={prop('default', headerLinks)} {...props} />);

describe('<Menu />', () => {
  describe('render', () => {
    it('matches logged out snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
    });
    it('matches logged in snapshot', () => {
      expect(getComponent({ isAuthenticated: true })).toMatchSnapshot();
    });
    it('matched route is active in snapshot', () => {
      expect(getComponent({ isAuthenticated: true, currentPath: '/' })).toMatchSnapshot();
    });
  });
});
