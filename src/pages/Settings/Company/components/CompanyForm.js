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

const Row = Styled.View.extend`
  flex-direction: row;
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

const CompanyForm = ({ user, updateUser }) => (
  <Container>
    <Title>Company Details</Title>
    <Form
      initialValues={{
        company: '',
        address1: user.address1,
        address2: user.address2,
        city: user.city,
        postalCode: user.postalCode,
        country: user.country,
        website: user.website,
      }}
      onSubmit={values => {
        console.log('update company', values);
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit }) => (
        <Content>
          <Fields>
            <Field>
              <Label htmlFor="company">COMPANY NAME</Label>
              <Input
                name="company"
                placeholder="TYPE HERE"
                value={values.company}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
            <Field style={{ marginTop: 30 }}>
              <Label htmlFor="address1">ADDRESS LINE 1</Label>
              <Input
                name="address1"
                placeholder="TYPE HERE"
                value={values.address1}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
            <Field style={{ marginTop: 30 }}>
              <Label htmlFor="address2">ADDRESS LINE 2</Label>
              <Input
                name="address2"
                placeholder="TYPE HERE"
                value={values.address2}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
            <Row style={{ marginTop: 30 }}>
              <Field>
                <Label htmlFor="city">CITY</Label>
                <Input
                  name="city"
                  placeholder="TYPE HERE"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{ width: 190 }}
                />
              </Field>
              <Field style={{ marginLeft: 20 }}>
                <Label htmlFor="postalCode">POSTAL CODE</Label>
                <Input
                  name="postalCode"
                  placeholder="TYPE HERE"
                  value={values.postalCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{ width: 190 }}
                />
              </Field>
            </Row>
            <Field style={{ marginTop: 30 }}>
              <Label htmlFor="country">COUNTRY</Label>
              <Input
                name="country"
                placeholder="TYPE HERE"
                value={values.country}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
            <Field style={{ marginTop: 30 }}>
              <Label htmlFor="website">WEBSITE URL</Label>
              <Input
                name="website"
                placeholder="TYPE HERE"
                value={values.website}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
          </Fields>
          <Actions>
            <SubmitButton onPress={handleSubmit}>
              <SubmitText>UPDATE DETAILS</SubmitText>
            </SubmitButton>
          </Actions>
        </Content>
      )}
    </Form>
  </Container>
);

export default connect(
  undefined,
  { updateUser }
)(CompanyForm);
