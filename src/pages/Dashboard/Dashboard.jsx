import React, { Fragment } from 'react';
import { Container } from '@pure-escapes/webapp-ui-components';

import { DashboardContainer } from 'containers';

import { SearchArea } from './Dashboard.styles';
import SearchBar from 'containers/SearchBar';

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
