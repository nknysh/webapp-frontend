// Libraries
import React from 'react';
import { connect } from 'react-redux';

// App
import { colors } from 'styles';
import { updateUser } from 'store/modules/users/actions';

// Components
import { Form, Label, Styled } from 'components';

const Container = Styled.View.extend`
`;

const Title = Styled.H4.extend`
  color: ${colors.gold10};
`;

const Content = Styled.View.extend`
`;

const Fields = Styled.View.extend`
  margin-top: 20px;
`;

const Field = Styled.View.extend`
`;

const Input = Styled.TextInput.H8.extend`
  margin-top: 10px;
  width: 400px;
`;

const Actions = Styled.View.extend`
  flex-direction: row;
  margin-vertical: 50px;
`;

const SubmitButton = Styled.Button.extend`
  width: 200px;
`;

const SubmitText = Styled.H7.extend`
  color: ${colors.white16};
`;

const PasswordButton = Styled.Button.extend`
  margin-left: 20px;
  width: 200px;
`;

const PasswordText = Styled.H7.extend`
  color: ${colors.white16};
`;

const ValidationError = Styled.H8.extend`
  margin-top: 5px;
  color: ${colors.red14};
`;

const validate = values => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = 'Please enter your first name.';
  }

  if (!values.lastName) {
    errors.lastName = 'Please enter your last name.';
  }

  if (!values.email) {
    errors.email = 'Please enter an email address.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Please enter a valid email address';
  }

  return errors;
};

const ProfileForm = ({ user, updateUser }) => (
  <Container>
    <Title>Profile Details</Title>
    <Form
      initialValues={{
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }}
      validate={validate}
      onSubmit={values => {
        updateUser({ id: user.id, ...values }).then(response => {
          console.log('updated user', response);
        });
      }}
    >
      {({ touched, values, errors, handleChange, handleBlur, handleSubmit }) => (
        <Content>
          <Fields>
            <Field>
              <Label htmlFor="firstName">FIRST NAME</Label>
              <Input
                name="firstName"
                placeholder="TYPE HERE"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.firstName && errors.firstName && <ValidationError>{errors.firstName}</ValidationError>}
            </Field>
            <Field style={{ marginTop: 30 }}>
              <Label htmlFor="lastName">LAST NAME</Label>
              <Input
                name="lastName"
                placeholder="TYPE HERE"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.lastName && errors.lastName && <ValidationError>{errors.lastName}</ValidationError>}
            </Field>
            <Field style={{ marginTop: 30 }}>
              <Label htmlFor="email">EMAIL</Label>
              <Input
                name="email"
                placeholder="TYPE HERE"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.email && errors.email && <ValidationError>{errors.email}</ValidationError>}
            </Field>
          </Fields>
          <Actions>
            <SubmitButton onPress={handleSubmit}>
              <SubmitText>UPDATE DETAILS</SubmitText>
            </SubmitButton>
            <PasswordButton onPress={() => {}}>
              <PasswordText>UPDATE PASSWORD</PasswordText>
            </PasswordButton>
          </Actions>
        </Content>
      )}
    </Form>
  </Container>
);

export default connect(
  undefined,
  { updateUser }
)(ProfileForm);
