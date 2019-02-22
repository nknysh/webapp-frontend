// Libraries
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// App
import { colors } from 'styles';
import { updateRoom } from 'actions/rooms';

// Components
import { Form, Styled } from 'components';
import { RoomFields } from 'pages/Admin/Rooms/components';
import RoomUpdateHeader from './RoomUpdateHeader';

const Content = Styled.View.extend`
  margin-top: 40px;
`;

const Main = Styled.View.extend`
  margin-top: 40px;
`;

const Sides = Styled.View.extend`
  flex-direction: row;
`;

const Side = Styled.View.extend`
  flex: 1;
`;

const Actions = Styled.View.extend`
  margin-top: 40px;
`;

const Button = Styled.Button.extend`
  align-self: center;
  width: 260px;
`;

const ButtonText = Styled.H7.extend`
  color: ${colors.white16};
`;

const RoomUpdateForm = ({ history, room, updateRoom }) => (
  <Form
    initialValues={{
      id: room.id,
      name: room.name,
      minAdults: room.minAdults,
      minChildren: room.minChildren,
      maxAdults: room.maxAdults,
      maxChildren: room.maxChildren,
      extraAdultPerNight: room.extraAdultPerNight,
      extraChildPerNight: room.extraChildPerNight,
      count: room.count,
      size: room.size,
      bedType: room.bedType,
      bedDescription: room.bedDescription,
    }}
    onSubmit={values => {
      updateRoom(values).then(room => {
        console.log('Updated room', room);
      });
    }}
  >
    {({ values, handleChange, handleBlur, handleSubmit, setFieldValue, setFieldTouched }) => (
      <Content>
        <RoomUpdateHeader room={room} onSubmit={handleSubmit} />
        <Main>
          <Sides>
            <Side>
              <RoomFields
                values={values}
                onChange={handleChange}
                onBlur={handleBlur}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
              />
            </Side>
            <Side />
          </Sides>
          <Actions>
            <Sides>
              <Side>
                <Button onPress={() => console.log('Edit Allotments')}>
                  <ButtonText>EDIT ALLOTMENTS</ButtonText>
                </Button>
              </Side>
              <Side>
                <Button onPress={() => history.push(`/admin/rooms/${room.id}/rates`)}>
                  <ButtonText>EDIT RATES</ButtonText>
                </Button>
              </Side>
            </Sides>
          </Actions>
        </Main>
      </Content>
    )}
  </Form>
);

export default withRouter(
  connect(
    undefined,
    { updateRoom }
  )(RoomUpdateForm)
);
