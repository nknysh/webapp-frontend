import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

const Form = ({ children, ...props }) => <Formik {...props} render={children} />;

Form.propTypes = {
  children: PropTypes.any,
};

export default Form;
