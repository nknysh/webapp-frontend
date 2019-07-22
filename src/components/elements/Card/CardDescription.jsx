import styled from 'styled-components';

import { theme } from 'styles';

export const CardDescription = styled.div`
  color: ${theme.secondary};
  font-size: ${theme.fonts.sizes.normal}px;
  text-transform: uppercase;
  line-height: 20px;
  letter-spacing: ${theme.fonts.letterSpacing.mid}px;
  padding: 0 0 ${theme.gutter * 2}px;
  margin: 0 0 ${theme.gutter * 2}px;
  border-bottom: 1px solid ${theme.borders.default};
`;

export default CardDescription;
