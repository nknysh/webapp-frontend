import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { prop, equals } from 'ramda';

import { Sidebar, Link, Modal } from 'components';
import { SettingsForm, SettingsPasswordForm } from 'containers';

import { propTypes } from './User.props';
import { UserContainer, Main, Aside } from './User.styles';

export const User = ({ history, match, ...props }) => {
  const { t } = useTranslation();

  const onClose = useCallback(() => history.push('/settings'), [history]);
  const { params } = match;

  const section = prop('section', params);
  let Component;
  let active = section;

  switch (section) {
    case 'password':
      break;
    default:
      Component = SettingsForm;
      active = 'settings';
  }

  return (
    <UserContainer>
      <Aside>
        <Sidebar
          title={t('labels.settings')}
          links={[
            <Link key="root" to="/settings" data-active={equals('settings', active)}>
              {t('labels.profileDetails')}
            </Link>,
          ]}
        />
      </Aside>
      <Main>{Component && <Component {...props} />}</Main>
      {equals('password', active) && (
        <Modal open={true} onClose={onClose}>
          <SettingsPasswordForm onComplete={onClose} {...props} />
        </Modal>
      )}
    </UserContainer>
  );
};

User.propTypes = propTypes;

export default User;
