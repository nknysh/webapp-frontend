// Libraries
import React from 'react';
import { Formik } from 'formik';

const Form = ({ children, ...props }) => <Formik {...props} render={children} />;

export default Form;
