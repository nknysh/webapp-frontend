// Libraries
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// App
import { logIn } from 'actions/auth';
import { colors } from 'styles';

// Components
import { CoverPhoto, Form, Label, Styled } from 'components';

const Container = Styled.View.extend`
`;

const Fill = Styled.View.extend`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Content = Styled.View.extend`
  width: 1160px;
  height: 100%;
  align-items: center;
  align-self: center;
  margin-top: 100px;
  margin-bottom: 100px;
`;

const Modal = Styled.View.extend`
  width: 600px;
  padding: 80px;
  background-color: ${colors.white16};
`;

const Title = Styled.H4.extend`
  text-align: center;
`;

const Fields = Styled.View.extend`
  margin-top: 80px;
`;

const Field = Styled.View.extend`
`;

const Input = Styled.TextInput.H8.extend`
  margin-top: 10px;
`;

const Actions = Styled.View.extend`
  margin-top: 50px;
`;

const ForgotPassword = Styled.View.extend`
  margin-top: 50px;
`;

const ForgotText = Styled.H6.extend`
  text-align: center;
`;

const ForgotLink = Styled.H6.extend`
  text-align: center;
  text-decoration: underline;
  cursor: pointer;
`;

const SubmitButton = Styled.Button.extend`
  width: 100%;
`;

const SubmitText = Styled.H7.extend`
  color: ${colors.white16};
`;

const Login = ({ history, logIn }) => (
  <Container>
    <Fill>
      <CoverPhoto />
    </Fill>
    <Content>
      <Modal>
        <Title>Sign In</Title>
        <Form
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={(values) => {
            logIn(values)
              .then((user) => {
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
              .catch((error) => {
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
                  <Input
                    name="email"
                    placeholder="TYPE HERE"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>
                <Field style={{ marginTop: 30 }}>
                  <Label htmlFor="password">PASSWORD</Label>
                  <Input
                    secureTextEntry
                    name="password"
                    placeholder="TYPE HERE"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>
              </Fields>
              <Actions>
                <SubmitButton
                  onPress={handleSubmit}
                >
                  <SubmitText>SIGN IN</SubmitText>
                </SubmitButton>
                <ForgotPassword>
                  <ForgotText>FORGOT YOUR PASSWORD? <Link to="/password/reset"><ForgotLink>CLICK HERE</ForgotLink></Link></ForgotText>
                </ForgotPassword>
              </Actions>
            </form>
          )}
        </Form>
      </Modal>
    </Content>
  </Container>
);

export default connect(undefined, { logIn })(Login);
