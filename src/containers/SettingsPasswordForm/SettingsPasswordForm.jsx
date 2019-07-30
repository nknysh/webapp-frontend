import React, { useCallback, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { prop, compose } from 'ramda';

import { Form, Button, Title } from 'components';
import { withAuthentication, withUser } from 'hoc';

import { fields, validation } from 'config/forms/updatePassword';

import connect from './SettingsPasswordForm.state';
// import { propTypes, defaultProps } from './SettingsPasswordForm.props';
import { PasswordReset } from './SettingsPasswordForm.styles';

export const SettingsPasswordForm = ({ user, updatePassword }) => {
  const { t } = useTranslation();

  const { uuid } = user;

  const onSubmit = useCallback(
    values => {
      updatePassword(uuid, values);
    },
    [updatePassword, uuid]
  );

  return (
    <PasswordReset>
      <Form onSubmit={onSubmit} enableReinitialize={true} validationSchema={validation}>
        {({ values, ...formProps }) => (
          <Fragment>
            <Title>{t('form.titles.updateYourPassword')}</Title>
            {Form.renderField(
              'currentPassword',
              prop('currentPassword', values),
              prop('currentPassword', fields),
              formProps
            )}
            {Form.renderField('password', prop('password', values), prop('password', fields), formProps)}
            {Form.renderField(
              'passwordConfirm',
              prop('passwordConfirm', values),
              prop('passwordConfirm', fields),
              formProps
            )}
            <Button type="submit">{t('buttons.updatePassword')}</Button>
          </Fragment>
        )}
      </Form>
    </PasswordReset>
  );
};

// SettingsPasswordForm.propTypes = propTypes;
// SettingsPasswordForm.defaultProps = defaultProps;

export default compose(
  withAuthentication,
  withUser,
  connect
)(SettingsPasswordForm);
