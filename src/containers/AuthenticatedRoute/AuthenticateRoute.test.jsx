import React from 'react';

import { AuthenticatedRoute } from './AuthenticatedRoute';

const MockComponent = () => <div />;
const MockAuthRedirect = () => <p>Custom redirect</p>;

const defaultProps = {
  isAuthLoading: false,
  isAuthenticated: false,
  location: {},
  path: '/about-us',
  component: MockComponent,
};

const getShallow = props => shallow(<AuthenticatedRoute {...defaultProps} {...props} />);

describe('<AuthenticatedRoute />', () => {
  describe('render', () => {
    it('message while authenticating', () => {
      const component = getShallow({ isAuthLoading: true });
      expect(component).toMatchSnapshot();
    });
    it('redirect when not authenticated', () => {
      const component = getShallow({ isAuthenticated: false });
      expect(component).toMatchSnapshot();
    });
    it('route when authenticated', () => {
      const component = getShallow({ isAuthenticated: true });
      expect(component).toMatchSnapshot();
    });
    it('custom auth redirect route when not authenticated', () => {
      const component = getShallow({ isAuthenticated: false, authComponent: MockAuthRedirect });
      expect(component).toMatchSnapshot();
    });
  });
});
