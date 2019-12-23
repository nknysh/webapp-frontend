import React from 'react';
import styled from 'styled-components';

const StyledTextArea = styled.textarea`
  padding: 10px;
  text-transform: uppercase;
  width: 100%;
`;

const Textarea = props => {
  const { rows = 5 } = props;
  return <StyledTextArea rows={rows} {...props} />;
};

export default Textarea;
