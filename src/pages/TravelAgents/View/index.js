// Libraries
import React from 'react';
import { connect } from 'react-redux';

// App
import { colors } from 'styles';
import { fetchTravelAgent } from 'store/modules/travelAgents/actions';
import { fetchUsers } from 'store/modules/users/actions';
import { getTravelAgent } from 'store/modules/travelAgents/selectors';

// Components
import { Header, Request, Styled } from 'components';
import { TravelAgentDetails } from './components';

const Container = Styled.View.extend`
`;

const Content = Styled.View.extend`
  align-self: center;
  width: 1280px;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: ${colors.gray14};
  padding-top: 20px;
`;

const Row = Styled.View.extend`
  flex-direction: row;
`;

const Main = Styled.View.extend`
`;

const TravelAgentView = ({
  match: {
    params: { id },
  },
  fetchTravelAgent,
  fetchUsers,
  match,
}) => (
  <Container>
    <Header />
    <Content>
      <Request
        getState={state => ({ travelAgent: getTravelAgent(state, id) })}
        onRequest={() => {
          fetchUsers();
          return fetchTravelAgent({ id });
        }}
      >
        {({ travelAgent }) => (
          <Main>
            <Row>
              <TravelAgentDetails travelAgent={travelAgent} match={match} />
            </Row>
          </Main>
        )}
      </Request>
    </Content>
  </Container>
);

export default connect(
  undefined,
  { fetchTravelAgent, fetchUsers }
)(TravelAgentView);
