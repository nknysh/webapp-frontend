import React, { Fragment } from 'react';
import { path, prop } from 'ramda';
import { useTranslation } from 'react-i18next';

import { Form, FormField, Button } from 'components/elements';

import { getFormPath } from 'utils';

import { defaultProps, propTypes } from './BookingConfirmationForm.props';

const renderField = (name, value, field, { handleChange, handleBlur, errors }, checked) => (
  <FormField
    name={name}
    value={value}
    checked={checked}
    onChange={handleChange}
    onBlur={handleBlur}
    error={path(getFormPath(name), errors)}
    {...field}
  />
);

export const BookingConfirmationForm = ({ fields, validation, onRequest, ...props }) => {
  const { t } = useTranslation();

  return (
    <Form validationSchema={validation(onRequest)} {...props}>
      {({ values, ...formProps }) => (
        <Fragment>
          {renderField('overrideTotal', prop('overrideTotal', values), prop('overrideTotal', fields), formProps)}
          {renderField('bookingComments', prop('bookingComments', values), prop('bookingComments', fields), formProps)}
          {renderField(
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
