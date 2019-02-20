// Libraries
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// App
import { colors } from 'styles';

// Components
import { Styled } from 'components';

const Container = Styled.View.extend`
  flex-direction: row;
  margin-vertical: 40px;
`;

const Field = Styled.View.extend`
  margin-right: 20px;
`;

const Input = Styled.TextInput.extend`
  width: 400px;
  border-radius: 25px;
  padding-left: 20px;
  background-color: none;
  border: 1px solid ${colors.gray14};
  color: ${colors.black3};
  outline: none;
`;

const Actions = Styled.View.extend`
  flex: 1;
  align-items: flex-end;
`;

const NewButton = Styled.Button.extend`
  width: 120px;
`;

const NewText = Styled.H7.extend`
  color: ${colors.white16};
`;

const HotelsFilters = ({ history, query, onChange, onSubmit }) => (
  <Container>
    <Field>
      <Input
        name="query"
        placeholder="Filter by hotel name or location..."
        value={query}
        onChange={onChange}
        onSubmitEditing={onSubmit}
      />
    </Field>
    <Actions>
      <NewButton
        onPress={() => history.push('/admin/hotels/new')}
      >
        <NewText>+ NEW HOTEL</NewText>
      </NewButton>
    </Actions>
  </Container>
);

export default withRouter(connect(undefined)(HotelsFilters));
