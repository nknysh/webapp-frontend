// Libraries
import React from 'react';

// App
import { colors } from 'styles';

// Components
import { Styled } from 'components';

const Container = Styled.View.extend`
`;

const Search = Styled.TextInput.extend`
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

const ProposalSearch = ({ onFilter }) => (
  <Container>
    <Search
      onChange={e => onFilter(e.target.value)}
      placeholder={'Filter by client name, client email, resorts or country...'}
    />
  </Container>
);

export default ProposalSearch;
