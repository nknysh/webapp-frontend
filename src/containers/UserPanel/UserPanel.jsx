import React, { useState, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { compose, equals } from 'ramda';
import { useTranslation } from 'react-i18next';
import { DropDownMenu } from '@pure-escapes/webapp-ui-components';

import { withAuthentication, withUser } from 'hoc';

import { isSending } from 'store/common';

import connect from './UserPanel.state';
import { propTypes, defaultProps } from './UserPanel.props';
import { StyledUserPanel, Text, Country, CountrySelect, Link } from './UserPanel.styles';

// eslint-disable-next-line
const renderLink = ({ title, ...props }) => (
  <Link key={title} {...props}>
    {title}
  </Link>
);

const shouldDisableCountrySelector = location => {
  const bookingBuilderRegex = /^\/hotels\/.+/;
  return bookingBuilderRegex.test(location.pathname);
};

export const UserPanel = ({
  isAuthenticated,
  user,
  requestStatus,
  token,
  logOut,
  countryContext,
  userCountry,
  countries,
  setCountry,
  isSr,
  location,
}) => {
  const { t } = useTranslation();
  const [logout, setLogout] = useState(false);

  const onSetCountry = useCallback(
    e => {
      setCountry(e.target.value);
    },
    [setCountry]
  );

  const onLogoutClick = useCallback(() => {
    setLogout(true);
    logOut(token);
  }, [logOut, token]);

  if (!isAuthenticated || !user) return null;

  const { firstName, lastName } = user;

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
            Country
            <CountrySelect
              value={countryContext}
              options={countries}
              onChange={onSetCountry}
              disabled={shouldDisableCountrySelector(location)}
            />
          </Country>
        )}
        {renderLink({ title: t('labels.settings'), to: '/settings' })}
        {renderLink({ title: t('labels.logout'), onClick: onLogoutClick })}
      </DropDownMenu>
    </StyledUserPanel>
  );
};

UserPanel.propTypes = propTypes;
UserPanel.defaultProps = defaultProps;

export default compose(
  withAuthentication,
  withUser,
  withRouter,
  connect
)(UserPanel);
