import React, { useCallback, useMemo, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { prop, compose, pick, keys } from 'ramda';
import { Grid } from '@material-ui/core';

import { Form, Section, Button, Status, Loader, Link } from 'components';
import { withAuthentication, withUser } from 'hoc';

import { fields, validation } from 'config/forms/settings';

import connect from './SettingsForm.state';
// import { propTypes, defaultProps } from './SettingsForm.props';
import { Settings, Title } from './SettingsForm.styles';
import { isActive } from 'store/common';

const renderForm = (t, { formValues, onSubmit }) => (
  <Form initialValues={formValues} onSubmit={onSubmit} enableReinitialize={true} validationSchema={validation}>
    {({ values, ...formProps }) => (
      <Fragment>
        {Form.renderField('title', prop('title', values), prop('title', fields), formProps)}
        {Form.renderField('firstName', prop('firstName', values), prop('firstName', fields), formProps)}
        {Form.renderField('lastName', prop('lastName', values), prop('lastName', fields), formProps)}
        {Form.renderField('email', prop('email', values), prop('email', fields), formProps)}
        <Link button={true} to="/settings/password">
          {t('buttons.updatePassword')}
        </Link>
        <Button type="submit">{t('buttons.updateDetails')}</Button>
      </Fragment>
    )}
  </Form>
);

export const SettingsForm = ({ usersStatus, user, isSr, updateMe }) => {
  const { t } = useTranslation();

  const { uuid, status } = user;

  const onSubmit = useCallback(
    values => {
      updateMe(uuid, values);
    },
    [updateMe, uuid]
  );

  const formValues = useMemo(() => pick(keys(fields), user), [user]);

  return (
    <Settings>
      <Title>{t('labels.profileDetails')}</Title>
      <Loader isLoading={isActive(usersStatus)} showPrev={true}>
        <Grid container spacing={32}>
          <Grid item xs={12} sm={6}>
            {renderForm(t, { formValues, onSubmit })}
          </Grid>
          <Grid item xs={12} sm={6}>
            {!isSr && (
              <Fragment>
                <Section label="Your Pure Escapes Representative">Mr Sales Rep</Section>
                <Section label="Your Account Status">
                  <Status data-status={status}>{status}</Status>
                </Section>
              </Fragment>
            )}
          </Grid>
        </Grid>
      </Loader>
    </Settings>
  );
};

// SettingsForm.propTypes = propTypes;
// SettingsForm.defaultProps = defaultProps;

export default compose(
  withAuthentication,
  withUser,
  connect
)(SettingsForm);
