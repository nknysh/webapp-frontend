// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';

// App
import { colors } from 'styles';
import { fetchBookings } from 'actions/bookings';
import { fetchProposals } from 'actions/proposals';
import { fetchTravelAgentComments } from 'actions/comments';
import { getBookings } from 'selectors/bookings';
import { getCurrentUser } from 'selectors/auth';
import { getProposals } from 'selectors/proposals';
import { getComments } from 'selectors/comments';

// Components
import { Styled } from 'components';
import { BookingsTable } from 'pages/Bookings/components';
import { ProposalsTable } from 'pages/Proposals/components';
import Comments from './Comments';

const Container = Styled.View.extend`
  flex: 1;
`;

const Row = Styled.View.extend`
  flex-direction: row;
`;

const Column = Styled.View.extend`
  flex-direction: column;
`;

const Main = Styled.View.extend`
  margin: 30px;
`;

const Title = Styled.H1.extend`
  width: 100%;
  margin-right: 100px;
  font-weight: bold;
`;

const Text = Styled.H5.extend`
  width: 100%;
  font-weight: bold;
`;

const TabRow = Styled.View.extend`
  flex-direction: row;
  width: 100%;
`;

const Tab = Styled.H7.extend`
  font-weight: bold;
  margin-right: 40px;
  border-bottom-color: black;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  display: inline-block;
`;

const Subtitle = Styled.H5.extend`
  color: ${colors.gray11};
`;

class TravelAgentDetails extends Component {

  render() {
    const { bookings, comments, match, proposals, travelAgent, user } = this.props;

    return (
      <Container>
        <Main>
          <Row>
            <Column>
              <Title>{travelAgent.firstName} {travelAgent.lastName}</Title>
            </Column>
            <Column>
              <Row><Text>{travelAgent.email}</Text></Row>
              <Row><Subtitle>EMAIL ADDRESS</Subtitle></Row>
            </Column>
          </Row>
          <Row style={{marginTop: '100px', marginBottom: '10px'}}>
            <TabRow>
              <Link to={`${match.url}/bookings`}><Tab>BOOKINGS</Tab></Link>
              <Link to={`${match.url}/proposals`}><Tab>PROPOSALS</Tab></Link>
              <Link to={`${match.url}/comments`}><Tab>COMMENTS</Tab></Link>
            </TabRow>
          </Row>
            <Row>
              <Column>
                <Route
                  exact
                  path={`${match.url}/bookings`}
                  component={() => <BookingsTable bookings={bookings} />}
                />
              </Column>
              <Column>
                <Route
                  exact
                  path={`${match.url}/proposals`}
                  component={() => <ProposalsTable proposals={proposals} />}
                />
              </Column>
              <Column>
                <Route
                  exact
                  path={`${match.url}/comments`}
                  component={() => <Comments comments={comments} user={user} travelAgentId={travelAgent.id} />}
                />
              </Column>
            </Row>
        </Main>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comments: getComments(state),
    user: getCurrentUser(state),
    bookings: getBookings(state),
    proposals: getProposals(state)
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return  {
    fetchBookings: dispatch(fetchBookings()),
    fetchProposals: dispatch(fetchProposals()),
    fetchTravelAgentComments: dispatch(fetchTravelAgentComments({id: ownProps.travelAgent.id})),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TravelAgentDetails)
