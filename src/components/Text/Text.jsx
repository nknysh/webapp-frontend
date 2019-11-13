import styled from 'styled-components';
import { theme } from 'styles';

const Text = styled.span`
  color: ${theme.palette.secondary};
  font-size: ${theme.fonts.sizes.default}px;
  line-height: 20px;
  text-transform: uppercase;
  margin: 0;
  padding: 0;

  ${({ strikethrough }) =>
    strikethrough &&
    `
    text-decoration: line-through;
  `}
`;

export default Text;
