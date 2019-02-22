// Libraries
import React from 'react';
import { connect } from 'react-redux';

// App
import { fetchBooking, updateBooking } from 'actions/bookings';
import { getBooking } from 'selectors/bookings';
import { colors } from 'styles';

// Components
import { Form, Header, Request, Styled } from 'components';
import { BookingSidebar } from '../components';
import { BookingPaymentOptions, GuestDetailsForm } from './components';

const Container = Styled.View.extend`
`;

const Content = Styled.View.extend`
  align-self: center;
  width: 1280px;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: ${colors.gray14};
  padding-top: 80px;
`;

const Row = Styled.View.extend`
  flex-direction: row;
`;

const Main = Styled.View.extend`
  flex: 1;
  margin-left: 30px;
`;

const BookingGuestDetails = ({
  match: {
    params: { id },
  },
  history,
  fetchBooking,
  updateBooking,
}) => (
  <Container>
    <Header />
    <Content>
      <Request
        getState={state => ({ booking: getBooking(state, id) })}
        onRequest={() => fetchBooking({ id, query: { hotel: { rooms: {} } } })}
      >
        {({ booking }) => (
          <Form
            initialValues={{
              guestFirstName: '',
              guestLastName: '',
              flightArrivalDate: new Date(),
              flightArrivalNumber: '',
              flightDepartureDate: new Date(),
              flightDepartureNumber: '',
              paymentMethod: '',

              // TODO(mark): Add back.
              // childBirthDate: '',
              // isRepeatGuest: false,
              // comments: '',

              // TODO(mark): Figure out how to render special requests.
            }}
            onSubmit={({ paymentMethod, ...values }) => {
              // TODO(mark): Handle paymentMethod differences.
              updateBooking(values).then(() => {
                history.push(`/bookings/${booking.id}/payment`);
              });
            }}
          >
            {props => (
              <Row>
                <Main>
                  <GuestDetailsForm {...props} booking={booking} />
                </Main>
                <BookingSidebar booking={booking}>
                  <BookingPaymentOptions {...props} booking={booking} />
                </BookingSidebar>
              </Row>
            )}
          </Form>
        )}
      </Request>
    </Content>
  </Container>
);

export default connect(
  undefined,
  { fetchBooking, updateBooking }
)(BookingGuestDetails);
