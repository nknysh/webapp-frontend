import React, { forwardRef } from 'react';
import { Formik } from 'formik';

import { propTypes } from './Form.props';

export const Form = forwardRef(({ children, ...props }, ref) => (
  <Formik ref={ref} {...props}>
    {({ handleSubmit, ...formProps }) => <form onSubmit={handleSubmit}>{children(formProps)}</form>}
  </Formik>
));

Form.displayName = 'Form';
Form.propTypes = propTypes;

export default Form;
