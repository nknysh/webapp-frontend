import styled from 'styled-components';

import theme from './theme';

export const Heading1 = styled.h1`
  color: ${theme.colors['gold-neutral']};
  font-size: 22px;
  font-weight: bold;
  margin: ${theme.gutter * 2}px;
`;

export default { Heading1 };