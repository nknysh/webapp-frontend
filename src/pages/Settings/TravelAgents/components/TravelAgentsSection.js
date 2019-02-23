// Libraries
import React from 'react';
import { connect } from 'react-redux';

// App
import { colors } from 'styles';
import { inviteUser } from 'store/modules/users/actions';

// Components
import { Form, Label, Modal, Styled } from 'components';

const Container = Styled.View.extend`
  padding: 30px;
  background-color: ${colors.gray16};
`;

const Row = Styled.View.extend`
  flex-direction: row;
  justify-content: space-between;
`;

const Title = Styled.H4.extend`
  color: ${colors.gold10};
`;

const CreateButton = Styled.Button.extend`
  width: 200px;
`;

const CreateText = Styled.H7.extend`
  color: ${colors.white16};
`;

const Content = Styled.View.extend`
  padding: 40px;
  background-color: ${colors.white16};
`;

const ModalTitle = Styled.H6.extend`
  color: ${colors.black3};
  text-align: center;
`;

const ModalDescription = Styled.H7.extend`
  margin-top: 20px;
  color: ${colors.gray11};
  text-align: center;
`;

const Field = Styled.View.extend`
  margin-top: 20px;
`;

const Input = Styled.TextInput.H8.extend`
  margin-top: 10px;
`;

const Actions = Styled.View.extend`
  margin-top: 20px;
`;

const SubmitButton = Styled.Button.extend`
  width: 100%;
`;

const SubmitText = Styled.H7.extend`
  color: ${colors.white16};
`;

const TravelAgentsSection = ({ user, inviteUser }) => (
  <Container>
    <Row>
      <Title>Company Travel Agents</Title>
      <Modal
        width={600}
        trigger={({ handleOpen }) => (
          <CreateButton onPress={handleOpen}>
            <CreateText>ADD NEW TRAVEL AGENT</CreateText>
          </CreateButton>
        )}
      >
        {({ handleClose }) => (
          <Content>
            <ModalTitle>INVITE A NEW TRAVEL AGENT</ModalTitle>
            <ModalDescription>
              Pure Escapes, the No 1 seller of luxury resorts in the Maldives and Seychelles invites you to sign up to
              their online system, to have access to the best rates on the market and instant availability as well as
              the ability to take holds and create your own proposals for your clients.
            </ModalDescription>
            <Form
              initialValues={{
                id: user.id,
                email: '',
              }}
              onSubmit={values => {
                inviteUser(values)
                  .then(() => handleClose())
                  .catch(error => {
                    console.log('Server error', error);
                  });
              }}
            >
              {({ values, handleChange, handleBlur, handleSubmit }) => (
                <form>
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
                  <Actions>
                    <SubmitButton onPress={handleSubmit}>
                      <SubmitText>SEND INVITE</SubmitText>
                    </SubmitButton>
                  </Actions>
                </form>
              )}
            </Form>
          </Content>
        )}
      </Modal>
    </Row>
  </Container>
);

export default connect(
  undefined,
  { inviteUser }
)(TravelAgentsSection);
