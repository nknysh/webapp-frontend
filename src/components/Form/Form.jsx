import React from 'react';
import { Formik } from 'formik';

import { propTypes } from './Form.props';

export const Form = ({ children, ...props }) => (
  <Formik {...props}>
    {({ handleSubmit, ...formProps }) => <form onSubmit={handleSubmit}>{children(formProps)}</form>}
  </Formik>
);

Form.propTypes = propTypes;

export default Form;
