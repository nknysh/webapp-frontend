// Libraries
import React from 'react';
import { connect } from 'react-redux';

// App
import { resetBookings, searchBookings } from 'actions/bookings';
import { getBookings } from 'selectors/bookings';
import { getCurrentUser } from 'selectors/auth';
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

const BookingList = ({ resetBookings, searchBookings, currentUser }) => (
  <Container>
    <Header />
    <Request
      getState={state => ({ bookings: getBookings(state) })}
      onRequest={(values, user) => {
        resetBookings();
        return searchBookings({
          q: values.query,
          where: { salesRepresentativeId: currentUser.id },
          query: { hotel: {} },
        });
      }}
    >
      {({ bookings, handleRequest }) => (
        <Form
          initialValues={{
            query: '',
          }}
          onSubmit={handleRequest}
        >
          {({ values, handleChange, submitForm, resetForm }) => (
            <Content>
              <Main>
                <BookingsFilters {...values} onChange={handleChange} onSubmit={submitForm} resetForm={resetForm} />
                <BookingsTable bookings={bookings} />
              </Main>
            </Content>
          )}
        </Form>
      )}
    </Request>
  </Container>
);

const mapStateToProps = state => ({
  currentUser: getCurrentUser(state),
});

export default connect(
  mapStateToProps,
  { resetBookings, searchBookings }
)(BookingList);
