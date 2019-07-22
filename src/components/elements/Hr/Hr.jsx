import styled from 'styled-components';

import { theme } from 'styles';

export const Hr = styled.hr`
  border: 0;
  background: 0;
  border-bottom: 1px solid ${theme.borders.default};
`;

export default Hr;
