// Libraries
import React from 'react';
import { connect } from 'react-redux';

// App
import { resetUsers, fetchUsers, exportUsers } from 'store/modules/users/actions';
import { getUsers } from 'store/modules/users/selectors';
import { colors } from 'styles';

// Components
import { Form, Header, Request, Styled } from 'components';

const Container = Styled.View.extend`
`;

const Content = Styled.View.extend`
  align-self: center;
  width: 1280px;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: ${colors.gray14};
`;

const Filters = Styled.View.extend`
  align-items: flex-end;
  margin-vertical: 20px;
`;

const ExportButton = Styled.Button.extend`
  width: 200px;
`;

const ExportText = Styled.H7.extend`
  color: ${colors.white16};
`;

const TravelAgentsList = ({ resetUsers, fetchUsers, exportUsers }) => (
  <Container>
    <Header />
    <Request
      getState={state => ({ users: getUsers(state) })}
      onRequest={values => {
        resetUsers();
        return fetchUsers({ q: values.query });
      }}
    >
      {({ users, handleRequest }) => (
        <Form
          initialValues={{
            query: '',
          }}
          onSubmit={handleRequest}
        >
          {({ values, handleChange, submitForm }) => (
            <Content>
              <Filters>
                <ExportButton
                  onPress={() =>
                    exportUsers({ fileType: 'csv', filter: {} }).then(csv => {
                      const filename = 'travel-agents.csv';
                      const text = `data:text/csv;charset=utf-8,${csv}`;
                      const link = document.createElement('a');

                      link.setAttribute('href', encodeURI(text));
                      link.setAttribute('download', filename);
                      link.click();
                    })
                  }
                >
                  <ExportText>EXPORT LIST</ExportText>
                </ExportButton>
              </Filters>
            </Content>
          )}
        </Form>
      )}
    </Request>
  </Container>
);

export default connect(
  undefined,
  { resetUsers, fetchUsers, exportUsers }
)(TravelAgentsList);
