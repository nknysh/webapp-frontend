import styled from 'styled-components';

import theme from 'styles/theme';

export const Container = styled.div`
  flex-direction: row;
  align-items: center;
`;

export const Text = styled.span`
  margin-left: 5${theme.unit};
  color: ${theme.primary};
`;
