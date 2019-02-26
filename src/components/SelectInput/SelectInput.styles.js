import styled from 'styled-components';

import theme from 'styles/theme';

export const Item = styled.span`
  flex: 1;
  padding-vertical: 6${theme.unit};
  padding-horizontal: 10${theme.unit};
  background-color: ${props => (props.highlighted ? 'lightgray' : 'white')};
`;
