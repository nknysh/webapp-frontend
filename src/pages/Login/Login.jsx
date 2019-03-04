import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import { Form, Label, Link, Modal } from 'components';
import { Home } from 'pages';

import { logIn } from 'store/modules/auth/actions';

import peLogo from 'public/img/PE_logo.png';

import {
  Title,
  Fields,
  Field,
  Actions,
  SubmitButton,
  ForgotPassword,
  Input,
  SubmitText,
  ForgotLink,
} from './Login.styles';
import { propTypes } from './Login.props';

const Login = ({ history, logIn, ...props }) => {
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const onClose = () => setModalIsOpen(false);

  return (
    <Fragment>
      <Home history={history} {...props} />
      <Modal open={modalIsOpen} onBackdropClick={onClose} onEscapeKeyDown={onClose}>
        <img src={peLogo} />
        <Title>Sign In</Title>
        <Form
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={values => {
            logIn(values)
              .then(user => {
                switch (user.type) {
                  case 'admin':
                    return history.push('/admin');
                  case 'rates-admin':
                    return history.push('/');
                  case 'sr':
                    return history.push('/');
                  case 'ta':
                    return history.push('/');
                  default:
                    return history.push('/');
                }
              })
              .catch(() => {
                // TODO(mark): Throw a SubmissionError with server errors.
                // console.log('Log in server error', error);
              });
          }}
        >
          {({ values, handleChange, handleBlur, handleSubmit }) => (
            <form>
              <Fields>
                <Field>
                  <Label htmlFor="email">EMAIL ADDRESS</Label>
                  <Input name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
                </Field>
                <Field style={{ marginTop: 30 }}>
                  <Label htmlFor="password">PASSWORD</Label>
                  <Input
                    secureTextEntry
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>
              </Fields>
              <Actions>
                <SubmitButton onClick={handleSubmit}>
                  <SubmitText>SIGN IN</SubmitText>
                </SubmitButton>
                <ForgotPassword>
                  <Link to="/password/reset">
                    <ForgotLink>FORGOT YOUR PASSWORD?</ForgotLink>
                  </Link>
                </ForgotPassword>
              </Actions>
            </form>
          )}
        </Form>
      </Modal>
    </Fragment>
  );
};

Login.propTypes = propTypes;

export default connect(
  undefined,
  { logIn }
)(Login);

// export default Login;
