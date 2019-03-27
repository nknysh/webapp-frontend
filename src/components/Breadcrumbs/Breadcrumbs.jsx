import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, equals } from 'ramda';
import hash from 'object-hash';

import { mapWithIndex } from 'utils';

import { propTypes, defaultProps } from './Breadcrumbs.props';
import { StyledBreadcrumbs, Crumb, CrumbLink } from './Breadcrumbs.styles';

export const Breadcrumbs = ({ location: { pathname }, links, ...props }) => {
  // eslint-disable-next-line
  const renderLinks = ({ label, to, ...crumbProps }, i) => (
    <Crumb key={hash({ label: label && label.toString(), to, i })}>
      {to ? (
        <CrumbLink data-active={equals(pathname, to)} to={to} {...crumbProps}>
          {label}
        </CrumbLink>
      ) : (
        label
      )}
    </Crumb>
  );
  return <StyledBreadcrumbs {...props}>{mapWithIndex(renderLinks, links)}</StyledBreadcrumbs>;
};

Breadcrumbs.propTypes = propTypes;
Breadcrumbs.defaultProps = defaultProps;

export default compose(withRouter)(Breadcrumbs);
