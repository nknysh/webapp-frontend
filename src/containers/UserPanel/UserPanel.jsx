import React, { useState } from 'react';
import { compose, map, lensPath, set, values, equals } from 'ramda';
import { useTranslation } from 'react-i18next';

import userPanelLinks from 'config/links/user-panel';

import { DropDownMenu, Link } from 'components';
import { withAuthentication } from 'hoc';

import { isSending } from 'store/common';

import connect from './UserPanel.state';
import { propTypes, defaultProps } from './UserPanel.props';
import { StyledUserPanel, Text, Country, CountrySelect } from './UserPanel.styles';

const logoutClickLens = lensPath(['logout', 'onClick']);

// eslint-disable-next-line
const renderLink = ({ title, ...props }) => (
  <Link key={title} {...props}>
    {title}
  </Link>
);

export const UserPanel = ({
  isAuthenticated,
  currentUser,
  requestStatus,
  token,
  logOut,
  countryContext,
  userCountry,
  countries,
  setCountry,
  isSr,
}) => {
  if (!isAuthenticated || !currentUser) return null;

  const { t } = useTranslation();
  const [logout, setLogout] = useState(false);

  const { firstName, lastName } = currentUser;

  const onSetCountry = e => {
    setCountry(e.target.value);
  };

  const onLogoutClick = () => {
    setLogout(true);
    logOut(token);
  };

  const links = set(logoutClickLens, onLogoutClick, userPanelLinks);

  if (logout && isSending(requestStatus))
    return <DropDownMenu showArrow={false} title={<Text data-placeholder>{t('messages.loggingOut')}</Text>} />;

  return (
    <StyledUserPanel>
      <DropDownMenu
        title={
          <Text>
            {firstName} {lastName} {isSr && !equals(countryContext, userCountry) && `(${countryContext})`}
          </Text>
        }
      >
        {isSr && (
          <Country>
            Country <CountrySelect value={countryContext} options={countries} onChange={onSetCountry} />
          </Country>
        )}
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
