import React from 'react';
import { Helmet } from 'react-helmet';

import config from 'config';

import { propTypes } from './Layout.props';
import { StyledLayout, LayoutChildren, LayoutHeader, LayoutFooter } from './Layout.styles';

export const Layout = ({ children }) => (
  <React.Fragment>
    <Helmet>
      <title>{config.title}</title>
    </Helmet>
    <StyledLayout>
      <LayoutHeader />
      <LayoutChildren>{children}</LayoutChildren>
      <LayoutFooter />
    </StyledLayout>
  </React.Fragment>
);

Layout.propTypes = propTypes;

export default React.memo(Layout);
