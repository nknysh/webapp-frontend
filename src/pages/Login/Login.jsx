import React from 'react';
import { connect } from 'react-redux';

import { Form, Label, Link } from 'components';

import { logIn } from 'store/modules/auth/actions';

import peLogo from 'public/img/PE_logo.png';

import {
  Container,
  Content,
  Modal,
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

const Login = ({ history, logIn }) => (
  <Container>
    <Content>
      <Modal>
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
              .catch(error => {
                // TODO(mark): Throw a SubmissionError with server errors.
                console.log('Log in server error', error);
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
    </Content>
  </Container>
);

Login.propTypes = propTypes;

export default connect(
  undefined,
  { logIn }
)(Login);

// export default Login;
