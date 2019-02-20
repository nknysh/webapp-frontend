// Libraries
import React from 'react';
import { connect } from 'react-redux';

// App
import { fetchBookings } from 'actions/bookings';
import { getCurrentUser } from 'selectors/auth';
import { getBookings } from 'selectors/bookings';

// Components
import { Header, Request, Styled } from 'components';
import { LargeCalendar } from './components';

const Container = Styled.View.extend`
`;

const Content = Styled.View.extend`
`;

const CalendarPage = ({ currentUser, fetchBookings }) => (
  <Container>
    <Header />
    <Content>
      <Request
        getState={(state) => ({ bookings: getBookings(state) })}
        onRequest={() => fetchBookings()}
      >
        {({ bookings }) => (
          <LargeCalendar
            bookings={bookings}
          />
        )}
      </Request>
    </Content>
  </Container>
);

const mapStateToProps = (state) => ({
  currentUser: getCurrentUser(state),
});

export default connect(mapStateToProps, { fetchBookings })(CalendarPage);
