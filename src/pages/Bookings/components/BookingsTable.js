// Libraries
import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

// App
import { displayDateRange } from 'utils';
import { getHotel } from 'store/modules/hotels/selectors';

// Components
import { Connect, Styled, Table } from 'components';

const Container = Styled.View.extend`
  flex: 1;
`;

const Row = Styled.View.extend`
  flex-direction: row;
`;

const Main = Styled.View.extend`
  flex: 1;
`;

const BookingsTable = ({ bookings }) => (
  <Container>
    <Row>
      <Main>
        <Table
          data={bookings}
          columns={[
            {
              Header: 'ID',
              accessor: 'id',
              maxWidth: 75,
            },
            {
              Header: 'Client',
              id: 'client',
              accessor: booking => `${booking.guestFirstName} ${booking.guestLastName}`,
              width: 225,
            },
            {
              Header: 'Booking Date',
              id: 'bookingDate',
              accessor: booking => moment(booking.createdAt).format('MMM D, YYYY'),
              width: 150,
            },
            {
              Header: 'Hotel',
              accessor: 'hotelId',
              width: 200,
              Cell: row => (
                <Connect getState={state => ({ hotel: getHotel(state, row.value) })}>
                  {({ hotel }) => (hotel ? hotel.name : null)}
                </Connect>
              ),
            },
            {
              Header: 'Travel Dates',
              id: 'travelDates',
              accessor: booking => displayDateRange(booking.flightArrivalDate, booking.flightDepartureDate),
              width: 200,
            },
            {
              Header: 'Status',
              id: 'status',
              accessor: 'status',
              width: 120,
            },
            {
              Header: '',
              accessor: 'id',
              width: 120,
              Cell: row => {
                return (
                  <Link to={`/bookings/${row.value}`}>
                    <button className="view-button">View</button>
                  </Link>
                );
              },
            },
          ]}
          defaultPageSize={10}
          noDataText="No Bookings"
        />
      </Main>
    </Row>
  </Container>
);

export default BookingsTable;
