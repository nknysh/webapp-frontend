import styled from 'styled-components';

import { theme, Heading2 } from 'styles';

export const CardTitle = styled(Heading2)`
  color: ${theme.palette.primary};
  font-size: 20px;
  font-weight: ${theme.fonts.bold};
  margin: 0 0 ${theme.spacing.gutter * 2}px;
  padding: ${theme.spacing.gutter}px 0 ${theme.spacing.gutter * 2}px;
  border-bottom: 1px solid ${theme.borders.default};
`;

export default CardTitle;
