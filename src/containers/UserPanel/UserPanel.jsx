import React, { useState } from 'react';
import { compose, path, map, lensPath, set, values } from 'ramda';

import uiConfig from 'config/ui';
import userPanelLinks from 'config/links/user-panel';

import { DropDownMenu, Link } from 'components';
import { withAuthentication } from 'hoc';

import connect from './UserPanel.state';
import { propTypes, defaultProps } from './UserPanel.props';
import { StyledUserPanel, Text } from './UserPanel.styles';
import { isSending } from 'store/common';

const logoutClickLens = lensPath(['logout', 'onClick']);

// eslint-disable-next-line
const renderLink = ({ title, ...props }) => (
  <Link key={title} {...props}>
    {title}
  </Link>
);

export const UserPanel = ({ isAuthenticated, currentUser, requestStatus, token, onLogout }) => {
  if (!isAuthenticated || !currentUser) return null;

  const [logout, setLogout] = useState(false);

  const { firstName, lastName } = currentUser;

  const onLogoutClick = () => {
    setLogout(true);
    onLogout(token);
  };

  const links = set(logoutClickLens, onLogoutClick, userPanelLinks);

  if (logout && isSending(requestStatus))
    return (
      <DropDownMenu
        showArrow={false}
        title={<Text data-placeholder>{path(['messages', 'loggingOut'], uiConfig)}</Text>}
      />
    );

  return (
    <StyledUserPanel>
      <DropDownMenu
        title={
          <Text>
            {firstName} {lastName}
          </Text>
        }
      >
        {values(map(renderLink, links))}
      </DropDownMenu>
    </StyledUserPanel>
  );
};

UserPanel.propTypes = propTypes;
UserPanel.defaultProps = defaultProps;

export default compose(
  withAuthentication,
  connect
)(UserPanel);
