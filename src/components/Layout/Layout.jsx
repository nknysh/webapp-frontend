import React, { useMemo } from 'react';
import { withRouter } from 'react-router-dom';
import { compose, prop, pick, includes } from 'ramda';
import { SnackbarProvider } from 'notistack';
import { DriftWidget } from '@pure-escapes/webapp-ui-components';

import { DRIFT_APP_ID, DRIFT_ENABLED_ROLES } from 'config';
import Notifications from 'components/Notifications';
import { withUser } from 'hoc';

import { propTypes } from './Layout.props';
import { StyledLayout, LayoutChildren, LayoutHeader, LayoutFooter } from './Layout.styles';

const ANCHOR_ORIGIN = Object.freeze({
  vertical: 'top',
  horizontal: 'right',
});

/**
 * Drift enabled
 *
 * Compares role to env var to see if drift should be enabled
 *
 * @param {string} role
 * @returns {boolean}
 */
const driftEnabled = role => includes('all', DRIFT_ENABLED_ROLES) || includes(role, DRIFT_ENABLED_ROLES);

export const Layout = ({ user, children, location: { pathname } }) => {
  const enableDrift = useMemo(() => driftEnabled(prop('type', user)), [user]);
  const driftAttributes = useMemo(
    () => pick(['email', 'title', 'firstName', 'lastName', 'phoneNumber', 'mobileNumber'], user || {}),
    [user]
  );
  const userUuid = useMemo(() => prop('uuid', user), [user]);

  return (
    <React.Fragment>
      <StyledLayout>
        <SnackbarProvider anchorOrigin={ANCHOR_ORIGIN}>
          <Notifications />
        </SnackbarProvider>
        <DriftWidget appId={DRIFT_APP_ID} attributes={driftAttributes} enabled={enableDrift} userId={userUuid} />
        <LayoutHeader currentPath={pathname} />
        <LayoutChildren>{children}</LayoutChildren>
        <LayoutFooter currentPath={pathname} />
      </StyledLayout>
    </React.Fragment>
  );
};

Layout.propTypes = propTypes;

export default compose(
  withRouter,
  withUser
)(Layout);
