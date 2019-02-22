// Libraries
import React from 'react';
import { connect } from 'react-redux';

// App
import { resetBookings, fetchBookings, searchBookings } from 'store/modules/bookings/actions';
import { fetchHotels } from 'store/modules/hotels/actions';
import { getBookings } from 'store/modules/bookings/selectors';
import { getCurrentUser } from 'store/modules/auth/selectors';
import { colors } from 'styles';

// Components
import { Form, Header, Request, Styled } from 'components';
import BookingOptionsTable from '../components/BookingOptionsTable';
import BookingOptionsFilter from './BookingOptionsFilter';

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

const Holds = ({ resetBookings, searchBookings }) => (
  <Container>
    <Header />
    <Request
      getState={state => ({ bookingsWithOptions: getBookings(state) })}
      onRequest={values => {
        resetBookings();
        return searchBookings({ q: values.query, where: { status: 'provisional' }, query: { hotel: {} } });
      }}
    >
      {({ bookingsWithOptions, handleRequest }) => (
        <Form
          initialValues={{
            query: '',
          }}
          onSubmit={handleRequest}
        >
          {({ values, handleChange, submitForm, resetForm }) => (
            <Content>
              <Main>
                <BookingOptionsFilter {...values} onChange={handleChange} onSubmit={submitForm} resetForm={resetForm} />
                <BookingOptionsTable holds={bookingsWithOptions} />
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
  { fetchBookings, searchBookings, resetBookings, fetchHotels }
)(Holds);
