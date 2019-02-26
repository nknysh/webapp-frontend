import React from 'react';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { prop, compose } from 'ramda';

import config from 'config';

import { propTypes } from './Layout.props';
import { StyledLayout, LayoutChildren, LayoutHeader, LayoutFooter } from './Layout.styles';

export const Layout = ({ children, location: { pathname } }) => (
  <React.Fragment>
    <Helmet>
      <title>{prop('title', config)}</title>
    </Helmet>
    <StyledLayout>
      <LayoutHeader currentPath={pathname} />
      <LayoutChildren>{children}</LayoutChildren>
      <LayoutFooter currentPath={pathname} />
    </StyledLayout>
  </React.Fragment>
);

Layout.propTypes = propTypes;

export default compose(
  withRouter,
  React.memo
)(Layout);
