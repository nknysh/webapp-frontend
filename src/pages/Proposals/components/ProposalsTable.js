// Libraries
import React from 'react';
import { Link } from 'react-router-dom';

// App
import { displayDateRange } from 'utils';

// Components
import { Styled, Table } from 'components';

const Container = Styled.View.extend`
`;

const Row = Styled.View.extend`
  flex-direction: row;
`;

const Main = Styled.View.extend`
  flex: 1;
`;

const columns = [
  {
    Header: 'Client',
    accessor: 'clientName',
    width: 250
  }, {
    Header: 'Dates',
    id: 'checkInDate',
    accessor: proposal => displayDateRange(proposal.checkInDate, proposal.checkOutDate),
    width: 200
  }, {
    Header: 'Notes',
    accessor: 'remarks',
    width: 300
  }, {
    Header: 'Total properties',
    accessor: 'total',
    width: 150,
  }, {
    Header: 'Total rooms',
    accessor: 'total',
    width: 100,
  }, {
    Header: '',
    accessor: 'id',
    Cell: row => {
      return (
        <Link to={`/proposals/${row.value}`}><button className='view-button'>View</button></Link>
      );
    }
  }
];

const ProposalsTable = ({ proposals }) => (
  <Container>
    <Row>
      <Main>
        <Table
          data={proposals}
          columns={columns}
          defaultPageSize={10}
          noDataText="No Proposals Results"
        />
      </Main>
    </Row>
  </Container>
);

export default ProposalsTable;
