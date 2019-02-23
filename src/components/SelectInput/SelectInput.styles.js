import styled from 'styled-components';

export const Item = styled.span`
  flex: 1;
  padding-vertical: 6px;
  padding-horizontal: 10px;
  background-color: ${props => props.highlighted ? 'lightgray' : 'white'};
`;