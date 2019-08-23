import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, equals, partial } from 'ramda';
import hash from 'object-hash';

import { mapWithIndex } from 'utils';

import { propTypes, defaultProps } from './Breadcrumbs.props';
import { StyledBreadcrumbs, Crumb, CrumbLink } from './Breadcrumbs.styles';

const renderLinks = ({ pathname }, { label, to, ...props }, i) => (
  <Crumb key={hash({ label: label && label.toString(), to, i })}>
    {to ? (
      <CrumbLink data-active={equals(pathname, to)} to={to} {...props}>
        {label}
      </CrumbLink>
    ) : (
      label
    )}
  </Crumb>
);

export const Breadcrumbs = ({ location: { pathname }, links, ...props }) => (
  <StyledBreadcrumbs {...props}>{mapWithIndex(partial(renderLinks, [{ pathname }]), links)}</StyledBreadcrumbs>
);

Breadcrumbs.propTypes = propTypes;
Breadcrumbs.defaultProps = defaultProps;

export default compose(withRouter)(Breadcrumbs);
