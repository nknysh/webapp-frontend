import React from 'react';

import { propTypes } from './Layout.props';
import { StyledLayout, LayoutChildren, LayoutHeader, LayoutFooter } from './Layout.styles';

export const Layout = ({ children }) => (
  <StyledLayout>
    <LayoutHeader />
    <LayoutChildren>{children}</LayoutChildren>
    <LayoutFooter />
  </StyledLayout>
);

Layout.propTypes = propTypes;

export default React.memo(Layout);
