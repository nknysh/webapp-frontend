// Libraries
import React from 'react';
import { connect } from 'react-redux';

// App
import { signUp } from 'actions/auth';
import { colors } from 'styles';

// Components
import { CoverPhoto, Form, Label, RadioButton, SelectInput, Styled } from 'components';

const Container = Styled.View.extend`
  background-color: ${colors.gray11};
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
  align-items: center;
  align-self: center;
  margin-top: 40px;
  margin-bottom: 100px;
`;

const Modal = Styled.View.extend`
  width: 800px;
  padding: 80px;
  background-color: ${colors.white16};
`;

const Title = Styled.H4.extend`
  text-align: center;
`;

const Fields = Styled.View.extend`
  margin-top: 80px;
`;

const Row = Styled.View.extend`
  flex-direction: row;
  align-items: center;
  margin-top: 40px;
`;

const Group = Styled.View.extend`
  flex-direction: row;
  align-items: center;
  margin-right: 40px;
`;

const Field = Styled.View.extend`
`;

const Input = Styled.TextInput.H8.extend`
  margin-top: 10px;
`;

const Actions = Styled.View.extend`
  align-items: center;
  margin-top: 50px;
`;

const SubmitButton = Styled.Button.extend`
  width: 400px;
`;

const SubmitText = Styled.H7.extend`
  color: ${colors.white16};
`;

const CreateUser = ({ history, signUp }) => (
  <Container>
    <Fill>
      <CoverPhoto />
    </Fill>
    <Content>
      <Modal>
        <Title>Create an account</Title>
        <Form
          initialValues={{
            title: '',
            firstName: '',
            lastName: '',
            company: '',
            address1: '',
            address2: '',
            city: '',
            postalCode: '',
            country: '',
            phoneNumber: '',
            email: '',
            website: '',
            companyRegistrationNumber: '',
            isExistingPartner: false,
            agreeToTerms: '',
            type: 'ta',
            password: '',
          }}
          onSubmit={(values) => {
            signUp(values).then(() => history.push('/login'));
          }}
        >
          {({ values, handleChange, handleBlur, handleSubmit, setFieldValue, setFieldTouched }) => (
            <form>
              <Fields>
                <Row style={{ zIndex: 100 }}>
                  <Group>
                    <Field>
                      <Label htmlFor="title">TITLE</Label>
                      <SelectInput
                        name="title"
                        placeholder="SELECT TITLE"
                        value={values.title}
                        options={[
                          { value: 'MR', label: 'Mr.' },
                          { value: 'MRS', label: 'Mrs.' },
                          { value: 'MS', label: 'Ms.' },
                        ]}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        Input={Input}
                      />
                    </Field>
                  </Group>
                  <Group>
                    <Field>
                      <Label htmlFor="firstName">FIRST NAME</Label>
                      <Input
                        name="firstName"
                        placeholder="FIRST NAME"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Field>
                  </Group>
                  <Field>
                    <Label htmlFor="lastName">LAST NAME</Label>
                    <Input
                      name="lastName"
                      placeholder="LAST NAME"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Field>
                </Row>
                <Row>
                  <Group>
                    <Field>
                      <Label htmlFor="company">COMPANY</Label>
                      <Input
                        name="company"
                        placeholder="COMPANY"
                        value={values.company}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Field>
                  </Group>
                  <Group>
                    <Field>
                      <Label htmlFor="address1">ADDRESS LINE 1</Label>
                      <Input
                        name="address1"
                        placeholder="TYPE HERE"
                        value={values.address1}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Field>
                  </Group>
                  <Field>
                    <Label htmlFor="address2">ADDRESS LINE 2</Label>
                    <Input
                      name="address2"
                      placeholder="TYPE HERE"
                      value={values.address2}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Field>
                </Row>
                <Row>
                  <Group>
                    <Group>
                      <Field>
                        <Label htmlFor="city">CITY</Label>
                        <Input
                          name="city"
                          placeholder="TYPE HERE"
                          value={values.city}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Field>
                    </Group>
                    <Field>
                      <Label htmlFor="postalCode">POSTAL CODE</Label>
                      <Input
                        name="postalCode"
                        placeholder="TYPE HERE"
                        value={values.postalCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Field>
                  </Group>
                  <Group>
                    <Field>
                      <Label htmlFor="country">COUNTRY</Label>
                      <Input
                        name="country"
                        placeholder="TYPE HERE"
                        value={values.country}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Field>
                  </Group>
                  <Field>
                    <Label htmlFor="phoneNumber">TELEPHONE</Label>
                    <Input
                      name="phoneNumber"
                      placeholder="TYPE HERE"
                      value={values.phoneNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Field>
                </Row>
                <Row>
                  <Group>
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
                  </Group>
                  <Group>
                    <Field>
                      <Label htmlFor="website">WEBSITE</Label>
                      <Input
                        name="website"
                        placeholder="TYPE HERE"
                        value={values.website}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Field>
                  </Group>
                  <Field>
                    <Label htmlFor="companyRegistrationNumber">
                      COMPANY REGISTRATION NUMBER (IF APPLICABLE)
                    </Label>
                    <Input
                      name="companyRegistrationNumber"
                      placeholder="#"
                      value={values.companyRegistrationNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Field>
                </Row>
                <Row>
                  <Group>
                    <Field>
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
                  </Group>
                </Row>
                <Row>
                  <Group>
                    <Field>
                      <Label htmlFor="isExistingPartner">ARE YOU AN EXISTING PARTNER?</Label>
                      <Row style={{ marginTop: 0 }}>
                        <RadioButton
                          name="isExistingPartner"
                          placeholder="YES"
                          value={values.isExistingPartner}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <RadioButton
                          name="existingPartner"
                          placeholder="NO"
                          value={!values.existingPartner}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Row>
                    </Field>
                  </Group>
                  <Field>
                    <RadioButton
                      name="agreeToTerms"
                      placeholder="I AGREE TO THE TERMS & CONDITIONS"
                      value={values.agreeToTerms}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Field>
                </Row>
              </Fields>
              <Actions>
                <SubmitButton
                  onPress={handleSubmit}
                >
                  <SubmitText>SUBMIT REQUEST</SubmitText>
                </SubmitButton>
              </Actions>
            </form>
          )}
        </Form>
      </Modal>
    </Content>
  </Container>
);

export default connect(undefined, { signUp })(CreateUser);
