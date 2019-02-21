// Libraries
import React from 'react';
import { connect } from 'react-redux';

// App
import { resetBookings, searchBookings } from 'actions/bookings';
import { getBookings } from 'selectors/bookings';
import { colors } from 'styles';

// Components
import { Form, Header, Request, Styled } from 'components';
import { UserHeader, UserRequest } from 'pages/Users/View/components';
import { BookingsTable } from 'pages/Bookings/components';

const Container = Styled.View.extend`
`;

const Content = Styled.View.extend`
  align-self: center;
  width: 1280px;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: ${colors.gray14};
`;

const Bookings = Styled.View.extend`
  margin-top: 50px;
`;

const UserBookings = ({
  match: {
    params: { id },
  },
  resetBookings,
  searchBookings,
}) => (
  <Container>
    <Header />
    <UserRequest id={id}>
      {({ user }) => (
        <Request
          getState={state => ({ bookings: getBookings(state) })}
          onRequest={values => {
            resetBookings();
            return searchBookings({ q: values.query, query: { hotel: {} } });
          }}
        >
          {({ bookings, handleRequest }) => (
            <Form
              initialValues={{
                query: '',
              }}
              onSubmit={handleRequest}
            >
              {({ values, handleChange, submitForm }) => (
                <Content>
                  <UserHeader user={user} />
                  <Bookings>
                    <BookingsTable bookings={bookings} />
                  </Bookings>
                </Content>
              )}
            </Form>
          )}
        </Request>
      )}
    </UserRequest>
  </Container>
);

export default connect(
  undefined,
  { resetBookings, searchBookings }
)(UserBookings);
