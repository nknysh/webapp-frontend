import React, { useMemo } from 'react';
import { withRouter } from 'react-router-dom';
import { compose, prop, pick, includes } from 'ramda';
import { SnackbarProvider } from 'notistack';

import { DRIFT_APP_ID, DRIFT_ENABLED_ROLES } from 'config';
import Notifications from 'components/Notifications';
import { withUser } from 'hoc';
import GlobalBanner from 'pureUi/GlobalBanner';

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

export const Layout = ({ user, children, location: { pathname }, isAppVersionDeprecated }) => {
  return (
    <React.Fragment>
      <StyledLayout>
        <SnackbarProvider anchorOrigin={ANCHOR_ORIGIN}>
          <Notifications />
        </SnackbarProvider>
        <LayoutHeader currentPath={pathname} />
        {isAppVersionDeprecated && (
          <GlobalBanner>
            <p>
              This version of app is deprecated. In order to avoid getting errors, please, reload this page to get the
              latest version.
            </p>
          </GlobalBanner>
        )}
        <LayoutChildren>{children}</LayoutChildren>
        <LayoutFooter currentPath={pathname} />
      </StyledLayout>
    </React.Fragment>
  );
};

Layout.propTypes = propTypes;

export default compose(withRouter, withUser)(Layout);
