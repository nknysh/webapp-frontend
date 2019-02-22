// Libraries
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// App
import { createRoom } from 'store/modules/rooms/actions';

// Components
import { Form, Styled } from 'components';
import { RoomFields } from 'pages/Admin/Rooms/components';
import RoomCreateHeader from './RoomCreateHeader';

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

const RoomCreateForm = ({ history, hotel, createRoom }) => (
  <Form
    initialValues={{
      name: '',
      minAdults: 1,
      minChildren: 0,
      maxAdults: 1,
      maxChildren: 0,
      extraAdultPerNight: 0,
      extraChildPerNight: 0,
      count: 0,
      size: 0,
      bedType: '',
      bedDescription: '',
    }}
    onSubmit={values => {
      createRoom(values).then(room => {
        // NOTE(mark): We navigate back to the edit form which has editable rooms.
        history.push(`/admin/hotels/${hotel.id}/edit`);
      });
    }}
  >
    {({ values, handleChange, handleBlur, handleSubmit, setFieldValue, setFieldTouched }) => (
      <Content>
        <RoomCreateHeader hotel={hotel} onSubmit={handleSubmit} />
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
        </Main>
      </Content>
    )}
  </Form>
);

export default withRouter(
  connect(
    undefined,
    { createRoom }
  )(RoomCreateForm)
);
