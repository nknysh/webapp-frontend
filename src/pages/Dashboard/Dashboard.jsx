import React, { Fragment } from 'react';

import { Container } from 'components';
import { DashboardContainer } from 'containers';

import { SearchArea, SearchBar } from './Dashboard.styles';

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
