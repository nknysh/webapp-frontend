// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';

// App
import { fetchProposals } from 'actions/proposals';
import { getProposals } from 'selectors/proposals';
import { colors } from 'styles';

// Components
import { Header, Styled } from 'components';
import { ProposalsTable } from 'pages/Proposals/components';
import ProposalSearch from './components/ProposalSearch';

const Container = Styled.View.extend`
`;

const Content = Styled.View.extend`
  align-self: center;
  width: 1160px;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: ${colors.gray14};
`;

class ProposalsView extends Component {
  componentWillMount() {
    this.props.fetchProposals();
  }

  handleFilter = query => {
    this.setState({
      proposals: this.props.proposals.filter(row => {
        return row.clientName.includes(query) || row.clientEmail.includes(query);
      }),
      // need to adjust for upper/lowercase
      // need country and resort name in BE
    });
  };

  render() {
    let proposals = this.state ? this.state.proposals : this.props.proposals;
    return (
      <Container>
        <Header />
        <Content>
          <ProposalSearch onFilter={query => this.handleFilter(query)} />
          <ProposalsTable proposals={proposals} />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return { proposals: getProposals(state) };
};

export default connect(
  mapStateToProps,
  { fetchProposals }
)(ProposalsView);
