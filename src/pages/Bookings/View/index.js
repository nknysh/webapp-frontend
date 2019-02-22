// Libraries
import React from 'react';
import { connect } from 'react-redux';

// App
import { fetchBooking } from 'store/modules/bookings/actions';
import { getBooking } from 'store/modules/bookings/selectors';
import { colors } from 'styles';

// Components
import { Header, Request, Styled } from 'components';
import { BookingSidebar } from '../components';
import { BookingChangeStatus, BookingChangeTravelAgent, BookingDetails } from './components';

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

const BookingView = ({
  match: {
    params: { id },
  },
  fetchBooking,
}) => (
  <Container>
    <Header />
    <Content>
      <Request
        getState={state => ({ booking: getBooking(state, id) })}
        onRequest={() =>
          fetchBooking({
            id,
            query: {
              hotel: { rooms: {} },
              travelAgent: {},
              // invoice: {},
              // itinerary: {},
              // voucher: {},
            },
          })
        }
      >
        {({ booking }) => (
          <Row>
            <Main>
              <BookingDetails booking={booking} />
            </Main>
            <BookingSidebar booking={booking}>
              <BookingChangeStatus booking={booking} />
              <BookingChangeTravelAgent booking={booking} />
            </BookingSidebar>
          </Row>
        )}
      </Request>
    </Content>
  </Container>
);

export default connect(
  undefined,
  { fetchBooking }
)(BookingView);
