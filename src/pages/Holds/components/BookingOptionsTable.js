// Libraries
import React from 'react';
import { Link } from 'react-router-dom';

// App
import { displayDateRange } from 'utils';
import { getHotel } from 'selectors/hotels';

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

const BookingholdsTable = ({ holds }) => (
  <Container>
    <Row>
      <Main>
        <Table
          data={holds}
          columns={[ 
            {
              Header: 'Travel Dates',
              id: 'travelDates',
              accessor: holds => displayDateRange(holds.flightArrivalDate, holds.flightDepartureDate),
              width: 300,
            }, {
              Header: 'Hotel',
              accessor: 'bookingId',
              width: 300,
              Cell: row => (
                <Connect getState={(state) => ({ hotel: getHotel(state, row.original.hotelId ) })}>
                  {({ hotel }) => ( hotel ? hotel.name : null )}
                </Connect>
              ),
            }, {
              Header: 'Expires',
              accessor: 'hoursUntilExpiration',
              width: 400,
            }, {
              Header: '',
              accessor: 'id',
              width: 120,
              Cell: row => {
                return (
                  <Link to={`/bookings/${row.value}`}>
                    <button className='view-button'>
                      View
                    </button>
                  </Link>
                );
              }
            },
          ]}
          defaultPageSize={10}
          noDataText="No Bookings"
        />
      </Main>
    </Row>
  </Container>
);

export default BookingholdsTable;
