// Libraries
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// App
import { updateHotel } from 'actions/hotels';

// Components
import { Form, Styled } from 'components';
import { HotelFields } from 'pages/Admin/Hotels/components';
import HotelUpdateHeader from './HotelUpdateHeader';
import HotelRooms from './HotelRooms';

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

const HotelUpdateForm = ({ history, hotel, updateHotel }) => (
  <Form
    initialValues={{
      id: hotel.id,
      name: hotel.name,
      address: hotel.address,
      country: hotel.country,
      overview: hotel.overview,
      availableForOnlineBooking: hotel.availableForOnlineBooking,
      preferred: hotel.preferred,
    }}
    onSubmit={values => {
      updateHotel(values).then(hotel => {
        console.log('Updated hotel', hotel);
      });
    }}
  >
    {({ values, handleChange, handleBlur, handleSubmit, setFieldValue, setFieldTouched }) => (
      <Content>
        <HotelUpdateHeader hotel={hotel} onSubmit={handleSubmit} />
        <Main>
          <Sides>
            <Side style={{ marginRight: 10 }}>
              <HotelFields
                values={values}
                onChange={handleChange}
                onBlur={handleBlur}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
              />
            </Side>
            <Side style={{ marginLeft: 10 }}>
              <HotelRooms hotel={hotel} />
            </Side>
          </Sides>
        </Main>
      </Content>
    )}
  </Form>
);

export default withRouter(
  connect(
    undefined,
    { updateHotel }
  )(HotelUpdateForm)
);
