import styled from 'styled-components';

import { theme, Heading1 } from 'styles';

export const Title = styled(Heading1)`
  margin-left: 0;
  margin-right: 0;
  color: ${theme.primary};
`;

export const Settings = styled.div`
  display: block;
  background: ${theme.backgrounds.secondary};
  padding: ${theme.gutter * 4}px;
  width: 100%;
`;
