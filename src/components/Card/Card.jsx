import styled from 'styled-components';

import { theme } from 'styles';

export const Card = styled.article`
  background: ${theme.backgrounds.secondary};
  margin: ${theme.spacing.gutter}px;
`;

export default Card;
