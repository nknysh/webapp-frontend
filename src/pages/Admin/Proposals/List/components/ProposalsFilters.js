// Libraries
import React from 'react';

// App
import { colors } from 'styles';

// Components
import { Styled } from 'components';

const Container = Styled.View.extend`
  flex-direction: row;
  align-items: center;
`;

const Input = Styled.TextInput.extend`
  width: 600px;
  align-self: center;
  border-radius: 25px;
  margin: 40px;
  padding-left: 20px;
  background-color: none;
  border: 1px solid ${colors.gray14};
  color: ${colors.black3};
  outline: none;
`;

const ProposalsFilters = ({ query, onChange, onSubmit }) => (
  <Container>
    <Input
      name="query"
      placeholder="Filter by client name, client email, reports, or country..."
      value={query}
      onChange={onChange}
      onSubmitEditing={onSubmit}
    />
  </Container>
);

export default ProposalsFilters;
