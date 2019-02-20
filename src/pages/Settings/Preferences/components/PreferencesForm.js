// Libraries
import React from 'react';
import { connect } from 'react-redux';

// App
import { colors } from 'styles';
import { updateUser } from 'actions/users';

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

const Description = Styled.H6.extend`
  margin-vertical: 40px;
`;

const Actions = Styled.View.extend`
  flex-direction: row;
  margin-bottom: 50px;
`;

const SubmitButton = Styled.Button.extend`
  width: 200px;
`;

const SubmitText = Styled.H7.extend`
  color: ${colors.white16};
`;

const PreferencesForm = ({ user, updateUser }) => (
  <Container>
    <Title>Preferences</Title>
    <Form
      initialValues={{
        currency: '',
      }}
      onSubmit={(values) => {
        console.log('update', values);
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit }) => (
        <Content>
          <Fields>
            <Field>
              <Label htmlFor="currency">DISPLAY CURRENCY IN</Label>
              <Input
                name="currency"
                placeholder="TYPE HERE"
                value={values.currency}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
          </Fields>
          <Description>
            We will be taking the daily mid-market rate +2% to display in different currencies, by using https://openexchange.org/ with the caveat that the estimates can fluctuate and they may not reflect real exchange rates at the time a payment is processed.
          </Description>
          <Actions>
            <SubmitButton
              onPress={handleSubmit}
            >
              <SubmitText>UPDATE DETAILS</SubmitText>
            </SubmitButton>
          </Actions>
        </Content>
      )}
    </Form>
  </Container>
);

export default connect(undefined, { updateUser })(PreferencesForm);
