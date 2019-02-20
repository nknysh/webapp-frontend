// Libraries
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// App
import { createHotel } from 'actions/hotels';

// Components
import { Form, Styled } from 'components';
import { HotelFields } from 'pages/Admin/Hotels/components';
import HotelCreateHeader from './HotelCreateHeader';

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

const HotelCreateForm = ({ history, createHotel }) => (
  <Form
    initialValues={{
      name: '',
      address: '',
      country: '',
      overview: '',
      availableForOnlineBooking: true,
      preferred: false,
    }}
    onSubmit={(values) => {
      createHotel(values).then((hotel) => {
        history.push(`/admin/hotels/${hotel.id}/edit`);
      });
    }}
  >
    {({ values, handleChange, handleBlur, handleSubmit, setFieldValue, setFieldTouched }) => (
      <Content>
        <HotelCreateHeader onSubmit={handleSubmit} />
        <Main>
          <Sides>
            <Side>
              <HotelFields
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

export default withRouter(connect(undefined, { createHotel })(HotelCreateForm));
