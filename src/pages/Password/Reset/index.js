// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// App
import { resetPassword } from 'store/modules/auth/actions';

// Components
import { Form, Label, Styled } from 'components';
import { colors } from 'styles';

const Container = Styled.View.extend`
  top: 300px;
  margin: auto;
  width: 500px;
`;

const FormContainer = Styled.View.extend`
  width: 85%;
  margin: auto;
`;

const Title = Styled.H7.extend`
  text-align: center;
  font-weight: bold;
  letter-spacing: 1px;  
`;

const Subtitle = Styled.H6.extend`
  margin: 20px 0 10px 0;
  text-align: center;
  color: ${colors.gray11};
  letter-spacing: 2px;
`;

const Input = Styled.TextInput.H8.extend`
  width: 100%;
  background-color: ${colors.white16};
  border: 1px solid ${colors.gray14};
  border-radius: 3px;
`;

const SubmitButton = Styled.Button.extend`
  width: 100%;
  height: 50px;
  margin: 20px auto;
`;

const CancelButton = Styled.Button.extend`
  width: 100%;
  height: 50px;
  margin: 20px auto;
  background-color: ${colors.white16};
`;

const SubmitText = Styled.H7.extend`
  color: ${colors.white16};
  letter-spacing: 3px;
`;

const CancelText = Styled.H7.extend`
  color: ${colors.black3};
  letter-spacing: 3px;
`;

const Info = Styled.H7.extend`
  margin-bottom: 10px;
  text-align: center;
  color: ${colors.black3};
  letter-spacing: 3px;
`;

class ResetPassword extends Component {
  state = { showInfo: 'hidden' };

  render() {
    const { showInfo } = this.state;
    return (
      <Container>
        {/* TODO(james): need to add Pure Escape icon */}
        <Title>RESET YOUR PASSWORD</Title>
        <Subtitle>Enter your email address to reset your password.</Subtitle>
        <Info style={{ visibility: showInfo }}>
          Thank you. Please check your email for instructions on how to reset your password.
        </Info>
        <Form
          initialValues={{
            email: '',
          }}
          onSubmit={values => {
            this.props.resetPassword(values).then(this.setState({ showInfo: 'visible' }));
          }}
        >
          {({ values, handleChange, handleBlur, handleSubmit }) => (
            <FormContainer>
              <form>
                <Label
                  htmlFor="email"
                  style={{
                    display: 'block',
                    color: '#948D8A',
                    letterSpacing: '3px',
                    fontWeight: 'bold',
                  }}
                >
                  EMAIL ADDRESS
                </Label>
                <Input name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
                <SubmitButton onPress={handleSubmit}>
                  <SubmitText>SUBMIT</SubmitText>
                </SubmitButton>
                <Link to="/login">
                  <CancelButton>
                    <CancelText>CANCEL</CancelText>
                  </CancelButton>
                </Link>
              </form>
            </FormContainer>
          )}
        </Form>
      </Container>
    );
  }
}

export default connect(
  undefined,
  { resetPassword }
)(ResetPassword);
