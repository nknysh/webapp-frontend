// Libraries
import React from 'react';
import { connect } from 'react-redux';

// App
import { fetchBooking } from 'actions/bookings';
import { getBooking } from 'selectors/bookings';
import { colors } from 'styles';

// Components
import { Header, Request, Styled } from 'components';
import { BookingSidebar } from '../components';

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

const BookingPayment = ({
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
        onRequest={() => fetchBooking({ id, query: { hotel: { rooms: {} } } })}
      >
        {({ booking }) => (
          <Row>
            <Main />
            <BookingSidebar booking={booking} />
          </Row>
        )}
      </Request>
    </Content>
  </Container>
);

export default connect(
  undefined,
  { fetchBooking }
)(BookingPayment);
