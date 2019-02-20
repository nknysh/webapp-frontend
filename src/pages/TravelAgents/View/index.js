// Libraries
import React from 'react';
import { connect } from 'react-redux';

// App
import { colors } from 'styles';
import { fetchTravelAgent } from 'actions/travelAgents';
import { fetchUsers } from 'actions/users';
import { getTravelAgent } from 'selectors/travelAgents';

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

const TravelAgentView = ({ match: { params: { id }}, fetchTravelAgent, fetchUsers, match }) => (
  <Container>
    <Header />
    <Content>
      <Request
        getState={(state) => ({ travelAgent: getTravelAgent(state, id) })}
        onRequest={() => { 
          fetchUsers()
          return fetchTravelAgent({id})
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

export default connect(undefined, { fetchTravelAgent, fetchUsers })(TravelAgentView);
