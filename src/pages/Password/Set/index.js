// Libraries
import React from 'react';

// Components
import { Form, Label, Styled } from 'components';

const Container = Styled.View.extend`
`;

const Title = Styled.H3.extend`
`;

const Input = Styled.TextInput.H8.extend`
`;

const SubmitButton = Styled.Button.extend`
`;

const SubmitText = Styled.H7.extend`
`;

const SetPassword = () => (
  <Container>
    <Title>Set a new password</Title>
    <Form
      initialValues={{
        password: '',
        confirmPassword: '',
      }}
      onSubmit={(values) => {
        // TODO
        console.log('submit with values', values);
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit }) => (
        <form>
          <Label htmlFor="password">NEW PASSWORD</Label>
          <Input
            secureTextEntry
            name="password"
            placeholder="TYPE HERE"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Label htmlFor="confirmPassword">CONFIRM PASSWORD</Label>
          <Input
            secureTextEntry
            name="confirmPassword"
            placeholder="TYPE HERE"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <SubmitButton
            onPress={handleSubmit}
          >
            <SubmitText>SUBMIT</SubmitText>
          </SubmitButton>
        </form>
      )}
    </Form>
  </Container>
);

export default SetPassword;
