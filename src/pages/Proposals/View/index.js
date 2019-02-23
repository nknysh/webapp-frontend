// Libraries
import React from 'react';
import { connect } from 'react-redux';

// App
import { fetchProposal } from 'store/modules/proposals/actions';
import { generateProposalPdf } from 'store/modules/proposals/actions';
import { getProposal } from 'store/modules/proposals/selectors';
import { downloadPdf } from 'utils';
import { colors } from 'styles';

// Components
import { Header, Request, Styled } from 'components';
import { ProposalDetails, ProposalSidebar } from './components';

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

const MainButton = Styled.Button.extend`
  width: 180px;
  background-color: ${colors.black3}; 
  margin-right: 12px;
  flex-direction: row-reverse;
`;

const MainText = Styled.H8.extend`
  color: ${colors.white16};  
`;

const SecondaryButton = Styled.Button.extend`
  width: 300px;
  margin-right: 10px;
`;

const SecondaryText = Styled.H8.extend`
  color: ${colors.white16};
`;

const ProposalView = ({
  match: {
    params: { id },
  },
  fetchProposal,
  generateProposalPdf,
}) => (
  <Container>
    <Header />
    <Content>
      <Request getState={state => ({ proposal: getProposal(state, id) })} onRequest={() => fetchProposal({ id })}>
        {({ proposal }) => (
          <Main>
            <Row style={{ flexDirection: 'row-reverse' }}>
              <SecondaryButton
                onPress={() =>
                  generateProposalPdf({ id }).then(pdf => {
                    // TODO(james): add send ability to pdf from api
                    alert(`Sent proposal to ${proposal.clientName} `);
                  })
                }
              >
                <SecondaryText> GENERATE PDF AND SEND TO CLIENT </SecondaryText>
              </SecondaryButton>
              <MainButton
                onPress={() =>
                  generateProposalPdf({ id }).then(pdf => {
                    downloadPdf(pdf);
                  })
                }
              >
                <MainText> PREVIEW PDF </MainText>
              </MainButton>
            </Row>
            <Row>
              <ProposalDetails proposal={proposal} />
              <ProposalSidebar proposal={proposal} />
            </Row>
          </Main>
        )}
      </Request>
    </Content>
  </Container>
);

export default connect(
  undefined,
  { fetchProposal, generateProposalPdf }
)(ProposalView);
