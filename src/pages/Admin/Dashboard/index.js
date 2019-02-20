// Libraries
import React from 'react';
import { connect } from 'react-redux';

// App
import { fetchTravelAgentsAssigned } from 'actions/travelAgents';
import { getTravelAgents } from 'selectors/travelAgents';
import { getCurrentUser } from 'selectors/auth';
import { colors } from 'styles';

// Components
import { Chart, Header, Styled } from 'components';
import TravelAgentsTable from 'pages/TravelAgents/List/components/TravelAgentsTable';

const Container = Styled.View.extend`
`;

const Content = Styled.View.extend`
  align-self: center;
  width: 1160px;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: ${colors.gray14};
`;

const Stats = Styled.View.extend`
  flex-direction: row;
  margin-vertical: 40px;
`;

const Stat = Styled.View.extend`
  flex: 1;
`;

const Info = Styled.View.extend`
  margin-bottom: 20px;
`;

const Title = Styled.H6.extend`
`;

const LineChart = ({ title, data }) => (
  <Stat>
    <Info>
      <Title>{title}</Title>
    </Info>
    <Chart.Line data={data} />
  </Stat>
);

class DashboardPage extends React.Component {
  componentWillMount() {
    this.props.fetchTravelAgentsAssigned({ id: this.props.currentUser.id });
  }

  render() {
    const { travelAgents } = this.props;

    return (
      <Container>
        <Header />
        <Content>
          <Stats>
            <LineChart
              title="TOTAL REVENUE"
              data={[
                ['M', 50],
                ['Tu', 40],
                ['W', 60],
                ['Th', 70],
                ['F', 90],
                ['Sa', 20],
                ['Su', 30],
              ]}
            />
            <LineChart
              title="TOTAL BOOKINGS"
              data={[
                ['M', 50],
                ['Tu', 40],
                ['W', 60],
                ['Th', 70],
                ['F', 90],
                ['Sa', 20],
                ['Su', 30],
              ]}
            />
          </Stats>
          <TravelAgentsTable travelAgents={travelAgents} />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  travelAgents: getTravelAgents(state),
  currentUser: getCurrentUser(state)
});

export default connect(mapStateToProps, { fetchTravelAgentsAssigned })(DashboardPage);
