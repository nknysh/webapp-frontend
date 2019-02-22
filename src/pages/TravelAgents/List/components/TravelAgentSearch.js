// Libraries
import React from 'react';
import { connect } from 'react-redux';

// App
import { colors } from 'styles';
import { exportUsers } from 'store/modules/users/actions';

// Components
import { Styled } from 'components';

const Container = Styled.View.extend`
  flex-direction: row;
  align-items: center;
`;

const Search = Styled.TextInput.extend`
  width: 600px;
  border-radius: 25px;
  margin: 40px;
  padding-left: 20px;
  background-color: none;
  border: 1px solid ${colors.gray14};
  color: ${colors.black3};
  outline: none;
`;

const ExportButton = Styled.Button.extend`
  width: 200px;
`;

const ExportText = Styled.H7.extend`
  color: ${colors.white16};
`;

const TravelAgentSearch = ({ onFilter, exportUsers }) => (
  <Container>
    <Search onChange={e => onFilter(e.target.value)} placeholder="Filter by travel agent name, city or country..." />
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
  </Container>
);

export default connect(
  undefined,
  { exportUsers }
)(TravelAgentSearch);
