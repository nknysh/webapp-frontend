import React, { Fragment } from 'react';

import { Container, SearchArea, SearchBar } from './Dashboard.styles';

export const Dashboard = () => (
  <Fragment>
    <SearchArea>
      <Container>
        <SearchBar />
      </Container>
    </SearchArea>
    <Container>
      <h1>Dashboard</h1>
    </Container>
  </Fragment>
);

export default Dashboard;
