// Libraries
import React from 'react';
import { connect } from 'react-redux';

// App
import { resetProposals, fetchProposals } from 'actions/proposals';
import { getProposals } from 'selectors/proposals';
import { colors } from 'styles';

// Components
import { Form, Header, Request, Styled } from 'components';
import { ProposalsTable } from 'pages/Proposals/components';
import { ProposalsFilters } from './components';

const Container = Styled.View.extend`
`;

const Content = Styled.View.extend`
  align-self: center;
  width: 1160px;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: ${colors.gray14};
`;

const Main = Styled.View.extend`
`;

const ProposalsList = ({ resetProposals, searchProposals }) => (
  <Container>
    <Header />
    <Request
      getState={state => ({ proposals: getProposals(state) })}
      onRequest={values => {
        resetProposals();
        return searchProposals({ q: values.query, query: {} });
      }}
    >
      {({ proposals, handleRequest }) => (
        <Form
          initialValues={{
            query: '',
          }}
          onSubmit={handleRequest}
        >
          {({ values, handleChange, submitForm }) => (
            <Content>
              <Main>
                <ProposalsFilters {...values} onChange={handleChange} onSubmit={submitForm} />
                <ProposalsTable proposals={proposals} />
              </Main>
            </Content>
          )}
        </Form>
      )}
    </Request>
  </Container>
);

// TODO(mark): Use searchProposals action.
export default connect(
  undefined,
  {
    resetProposals,
    searchProposals: fetchProposals,
  }
)(ProposalsList);
