// Libraries
import React from 'react';

// App
import { colors } from 'styles';
import { updateBooking } from 'store/modules/bookings/actions';
import { getHotel } from 'store/modules/hotels/selectors';

// Components
import { Connect, Form, Styled } from 'components';
import { GuestDetailsForm } from '../../GuestDetails/components';

const Container = Styled.View.extend`
  flex: 1;
`;

const Content = Styled.View.extend`
`;

const Sections = Styled.View.extend`
`;

const Name = Styled.H4.extend`
  color: ${colors.gold10};
`;

const BookingDetails = ({ booking }) => (
  <Container>
    <Connect getState={state => ({ hotel: getHotel(state, booking.hotelId) })}>
      {({ hotel }) => (
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
          onSubmit={values => {
            // TODO(mark): Should this show a validation of some sort?
            updateBooking(values);
          }}
        >
          {({ values, handleChange, handleBlur }) => (
            <Content>
              <Sections>
                <Name>{`${booking.guestFirstName} ${booking.guestLastName}`}</Name>
                <GuestDetailsForm
                  booking={booking}
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              </Sections>
            </Content>
          )}
        </Form>
      )}
    </Connect>
  </Container>
);

export default BookingDetails;
