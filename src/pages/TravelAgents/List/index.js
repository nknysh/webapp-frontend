// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';

// App
import { fetchTravelAgentsAssigned } from 'actions/travelAgents';
import { getTravelAgents } from 'selectors/travelAgents';
import { getCurrentUser } from 'selectors/auth';
import { colors } from 'styles';

// Components
import { Header, Styled } from 'components';
import TravelAgentSearch from './components/TravelAgentSearch';
import TravelAgentsTable from './components/TravelAgentsTable';

const Container = Styled.View.extend`
`;

const Content = Styled.View.extend`
  align-self: center;
  width: 1160px;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: ${colors.gray14};
`;

class TravelAgentsList extends Component {
  componentWillMount() {
    this.props.fetchTravelAgentsAssigned({ id: this.props.currentUser.id });
  }

  handleFilter = query => {
    this.setState({
      travelAgents: this.props.travelAgents.filter(row => {
        return (
          row.firstName.includes(query) ||
          row.lastName.includes(query) ||
          row.email.includes(query) ||
          row.city.includes(query) ||
          row.country.includes(query)
        );
      }),
      // need to adjust for upper/lowercase
    });
  };

  render() {
    let travelAgents = this.state ? this.state.travelAgents : this.props.travelAgents;

    return (
      <Container>
        <Header />
        <Content>
          <TravelAgentSearch onFilter={query => this.handleFilter(query)} />
          <TravelAgentsTable travelAgents={travelAgents} />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    travelAgents: getTravelAgents(state),
    currentUser: getCurrentUser(state),
  };
};

export default connect(
  mapStateToProps,
  { fetchTravelAgentsAssigned }
)(TravelAgentsList);
