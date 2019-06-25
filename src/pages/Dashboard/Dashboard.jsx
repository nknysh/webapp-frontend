import React, { Fragment } from 'react';

import { DashboardContainer } from 'containers';
import { Container, SearchArea, SearchBar } from './Dashboard.styles';

export const Dashboard = () => (
  <Fragment>
    <SearchArea>
      <Container>
        <SearchBar />
      </Container>
    </SearchArea>
    <DashboardContainer />
  </Fragment>
);

export default Dashboard;
