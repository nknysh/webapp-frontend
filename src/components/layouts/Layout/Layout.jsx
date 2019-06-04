import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'ramda';
import { SnackbarProvider } from 'notistack';

import { Notifications } from 'components';

import { propTypes } from './Layout.props';
import { StyledLayout, LayoutChildren, LayoutHeader, LayoutFooter } from './Layout.styles';

export const Layout = ({ children, location: { pathname } }) => (
  <React.Fragment>
    <StyledLayout>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Notifications />
      </SnackbarProvider>
      <LayoutHeader currentPath={pathname} />
      <LayoutChildren>{children}</LayoutChildren>
      <LayoutFooter currentPath={pathname} />
    </StyledLayout>
  </React.Fragment>
);

Layout.propTypes = propTypes;

export default compose(withRouter)(Layout);
