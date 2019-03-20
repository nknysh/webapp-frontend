import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, map, equals } from 'ramda';

import { propTypes, defaultProps } from './Breadcrumbs.props';
import { StyledBreadcrumbs, Crumb, CrumbLink } from './Breadcrumbs.styles';

export const Breadcrumbs = ({ location: { pathname }, links, ...props }) => {
  // eslint-disable-next-line
  const renderLinks = ({ label, to, ...crumbProps }) => (
    <Crumb key={label}>
      {to ? (
        <CrumbLink data-active={equals(pathname, to)} to={to} {...crumbProps}>
          {label}
        </CrumbLink>
      ) : (
        label
      )}
    </Crumb>
  );
  return <StyledBreadcrumbs {...props}>{map(renderLinks, links)}</StyledBreadcrumbs>;
};

Breadcrumbs.propTypes = propTypes;
Breadcrumbs.defaultProps = defaultProps;

export default compose(withRouter)(Breadcrumbs);
