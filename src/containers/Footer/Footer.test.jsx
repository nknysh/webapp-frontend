import React from 'react';

import footerLinks from 'config/links/footer';

import { Footer } from './Footer';

const getComponent = props => shallow(<Footer menu={footerLinks} {...props} />);

describe('<Footer />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
    });
  });
});
