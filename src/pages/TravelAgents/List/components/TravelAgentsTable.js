// Libraries
import React from 'react';
import { Link } from 'react-router-dom';

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
    Header: 'Name',
    accessor: 'firstName',
    maxWidth: 250,
  },
  {
    Header: 'Email',
    accessor: 'email',
    maxWidth: 200,
  },
  {
    Header: 'Company',
    accessor: 'companyRegistrationNumber',
    width: 250,
  },
  {
    Header: 'Status',
    accessor: 'status',
    width: 100,
  },
  {
    Header: 'Comments',
    accessor: 'id',
    width: 200,
  },
  {
    Header: '',
    accessor: 'id',
    Cell: row => {
      return (
        <Link to={`/users/${row.value}`}>
          <button className="view-button">View</button>
        </Link>
      );
    },
  },
];

const TravelAgentsTable = ({ travelAgents }) => (
  <Container>
    <Row>
      <Main>
        <Table data={travelAgents} columns={columns} defaultPageSize={10} noDataText="No Travel Agent Results" />
      </Main>
    </Row>
  </Container>
);

export default TravelAgentsTable;
