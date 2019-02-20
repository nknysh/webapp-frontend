// Libraries
import React from 'react';
import { Link } from 'react-router-dom';

// Components
import { Styled, Table } from 'components';

const Container = Styled.View.extend`
  flex: 1;
`;

const Row = Styled.View.extend`
  flex-direction: row;
`;

const Main = Styled.View.extend`
  flex: 1;
`;

const HotelsTable = ({ hotels }) => (
  <Container>
    <Row>
      <Main>
        <Table
          data={hotels}
          columns={[
            {
              Header: 'ID',
              accessor: 'id',
              maxWidth: 75
            }, {
              Header: 'Hotel name',
              id: 'name',
              accessor: hotel => hotel.name,
              width: 225,
            }, {
              Header: 'Country',
              id: 'country',
              accessor: hotel => hotel.country,
              width: 150,
            }, {
              Header: 'Address',
              id: 'address',
              accessor: hotel => hotel.address,
              width: 200,
            }, {
              Header: 'Invoice Total',
              id: 'invoice-total',
              accessor: hotel => '',
              width: 200,
            }, {
              Header: 'Margin',
              id: 'margin',
              accessor: hotel => '',
              width: 120
            }, {
              Header: '',
              accessor: 'id',
              width: 120,
              Cell: row => {
                return (
                  <Link to={`/admin/hotels/${row.value}/edit`}>
                    <button className='view-button'>
                      Edit
                    </button>
                  </Link>
                );
              }
            },
          ]}
          defaultPageSize={10}
          noDataText="No Hotels"
        />
      </Main>
    </Row>
  </Container>
);

export default HotelsTable;
