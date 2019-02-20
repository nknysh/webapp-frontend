// Libraries
import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';

// App
import { colors } from 'styles';

// Components
import { Styled } from 'components';
import ClientList from './ClientList';

const Container = Styled.View.extend`
  margin-bottom: 20px;
`;

const Row = Styled.View.extend`
  flex-direction: row;
  margin: 0px auto;
`;

const Title = Styled.H7.extend`
  margin-top: 40px;
  color: ${colors.black3};
  text-align: center;
`;

const Note = Styled.View.extend`
  width: 400px;
  margin: 20px auto;
  align-items: center;
`;

const Text = Styled.H7.extend`
  color: ${colors.gray11};
  text-align: center;
  width: 75%;
`;

const MainButton = Styled.Button.extend`
  width: 200px;
  margin-right: 10px;
  background-color: ${colors.black3};
`;

const MainText = Styled.H8.extend`
  color: ${colors.white16};
`;

const SecondaryButton = Styled.Button.extend`
  width: 200px;
`;

const SecondaryText = Styled.H8.extend`
  color: ${colors.white16};
`;

const OpenModalButton = () => (
    <SecondaryText>
      ADD TO PROPOSAL
    </SecondaryText>
);

class ProposalModal extends Component {
  constructor(props) {
    super();
    this.state = { showModal: false }
  };
  // TODO(JAMES): Add real methods that connect to BE (in progress)
  handleCreateProposal = () => {
    this.setState({ showModal: false })
    alert('New Proposal Created')
  };

  handleAddToProposal = () => {
    this.setState({ showModal: false })
    alert('Added to Client\'s Proposal')
  };

  render() {
    return (
      <Modal 
        style={{width: '500px', height: '500px'}} 
        trigger={<SecondaryButton onClick={() => this.setState({ showModal: true })}><OpenModalButton /></SecondaryButton>} 
        onClose={ () => this.setState({ showModal: false }) } 
        open={ this.state.showModal } 
        centered={false} 
        closeIcon 
      >
        <Container>
          <Title> SELECT A PROPOSAL TO ADD THIS BOOKING TO </Title>
          <Row>
            <Note>
              <Text>This option will only last for 24 hours from the time you add it to your proposal</Text>
            </Note>
          </Row>
          <Row style={{width: '100%'}}>
            <ClientList />
          </Row>
          <Row>
            <MainButton onClick={this.handleCreateProposal}>
              <MainText>
                CREATE NEW PROPOSAL
              </MainText>
            </MainButton>
            <SecondaryButton onClick={this.handleAddToProposal}>
              <SecondaryText>
                ADD TO PROPOSAL
              </SecondaryText>
            </SecondaryButton>
          </Row>
        </Container>
      </Modal>
    );
  };
};

export default ProposalModal;
