// Libraries
import React from 'react';
import { connect } from 'react-redux';

// App
import { resetBookings, searchBookings } from 'actions/bookings';
import { getBookings } from 'selectors/bookings';
import { colors } from 'styles';

// Components
import { Form, Header, Request, Styled } from 'components';
import { BookingsTable } from 'pages/Bookings/components';
import { BookingsFilters } from './components';

const Container = Styled.View.extend`
`;

const Content = Styled.View.extend`
  align-self: center;
  width: 1160px;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: ${colors.gray14};
`;

const Main = Styled.View.extend`
`;

const BookingList = ({ resetBookings, searchBookings }) => (
  <Container>
    <Header />
    <Request
      getState={(state) => ({ bookings: getBookings(state) })}
      onRequest={(values) => {
        resetBookings();
        return searchBookings({
          q: values.query,
          where: (values.country || values.status) && {
            status: values.status,
            country: values.country,
          },
          query: {
            hotel: {},
          },
        });
      }}
    >
      {({ bookings, handleRequest }) => (
        <Form
          initialValues={{
            query: '',
            country: '',
            status: '',
          }}
          onSubmit={handleRequest}
        >
          {({ values, handleChange, handleSubmit, setFieldValue, submitForm }) => (
            <Content>
              <Main>
                <BookingsFilters
                  {...values}
                  setFieldValue={setFieldValue}
                  handleSubmit={handleSubmit}
                  onChange={handleChange}
                  onSubmit={submitForm}
                />
                <BookingsTable
                  bookings={bookings}
                />
              </Main>
            </Content>
          )}
        </Form>
      )}
    </Request>
  </Container>
);

export default connect(undefined, { resetBookings, searchBookings })(BookingList);
