import React, { useCallback, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { prop, compose } from 'ramda';
import { Form, Button, Title } from '@pure-escapes/webapp-ui-components';

import { withAuthentication } from 'hoc';

import { fields, validation } from 'config/forms/updatePassword';

import connect from './SettingsPasswordForm.state';
import { propTypes, defaultProps } from './SettingsPasswordForm.props';
import { PasswordReset } from './SettingsPasswordForm.styles';

export const SettingsPasswordForm = ({ updatePassword, onComplete }) => {
  const { t } = useTranslation();
  const onSubmit = useCallback(
    values => {
      updatePassword(values);
      onComplete();
    },
    [updatePassword, onComplete]
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
            {Form.renderField('newPassword', prop('newPassword', values), prop('newPassword', fields), formProps)}
            {Form.renderField(
              'newPasswordConfirm',
              prop('newPasswordConfirm', values),
              prop('newPasswordConfirm', fields),
              formProps
            )}
            <Button type="submit">{t('buttons.updatePassword')}</Button>
          </Fragment>
        )}
      </Form>
    </PasswordReset>
  );
};

SettingsPasswordForm.propTypes = propTypes;
SettingsPasswordForm.defaultProps = defaultProps;

export default compose(withAuthentication, connect)(SettingsPasswordForm);
