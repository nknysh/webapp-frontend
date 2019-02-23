import React from 'react';
import { connect } from 'react-redux';

import { signUp } from 'store/modules/auth/actions';

import { Form, Label, RadioButton, SelectInput } from 'components';

import peLogo from 'public/img/PE_logo.png';

import { Container, Content, Modal, Title, Fields, Row, Group,Field,Input,Actions,SubmitButton,SubmitText, Columns, Column } from './CreateAccount.styles';

const CreateUser = ({ history, signUp }) => (
  <Container>
    <Content>
      <Modal>
        <img src={peLogo} />
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
          onSubmit={values => {
            signUp(values).then(() => history.push('/login'));
          }}
        >
          {({ values, handleChange, handleBlur, handleSubmit, setFieldValue, setFieldTouched }) => (
            <form>
              <Fields>
                <Columns>

                  <Column>
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
                  </Column>
                  
                  <Column>
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
                    <Columns>
                      <Column>
                        <Field>
                          <Label htmlFor="companyName">COMPANY NAME</Label>
                          <Input
                            name="companyName"
                            value={values.companyName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Field>
                        <Field>
                          <Label htmlFor="landline">LANDLINE</Label>
                          <Input
                            name="landline"
                            value={values.landline}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Field>
                      </Column>

                      <Column>
                        <Field>
                          <Label htmlFor="companyCountry">COMPANY COUNTRY</Label>
                          <Input
                            name="companyCountry"
                            value={values.companyCountry}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Field>
                        <Field>
                          <Label htmlFor="mobile">MOBILE</Label>
                          <Input
                            name="mobile"
                            value={values.mobile}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Field>
                      </Column>
                    </Columns>
                    
                    <Field>
                      <RadioButton
                        name="agreeToTerms"
                        placeholder="I AGREE TO THE TERMS & CONDITIONS"
                        value={values.agreeToTerms}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Field>
                  </Column>
                </Columns>
              </Fields>
              <Actions>
                <SubmitButton onClick={handleSubmit}>
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

export default connect(
  undefined,
  { signUp }
)(CreateUser);