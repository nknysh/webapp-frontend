import React, { Fragment } from 'react';
import { prop } from 'ramda';
import { useTranslation } from 'react-i18next';
import { Form, Button } from '@pure-escapes/webapp-ui-components';

import { defaultProps, propTypes } from './BookingConfirmationForm.props';

export const BookingConfirmationForm = ({ fields, validation, onRequest, ...props }) => {
  const { t } = useTranslation();

  return (
    <Form validationSchema={validation(onRequest)} {...props}>
      {({ values, ...formProps }) => (
        <Fragment>
          {Form.renderField('overrideTotal', prop('overrideTotal', values), prop('overrideTotal', fields), formProps)}
          {Form.renderField(
            'bookingComments',
            prop('bookingComments', values),
            prop('bookingComments', fields),
            formProps
          )}
          {Form.renderField(
            'internalComments',
            prop('internalComments', values),
            prop('internalComments', fields),
            formProps
          )}
          <Button>{t('buttons.bookingConfirm')}</Button>
        </Fragment>
      )}
    </Form>
  );
};

BookingConfirmationForm.propTypes = propTypes;
BookingConfirmationForm.defaultProps = defaultProps;

export default BookingConfirmationForm;
