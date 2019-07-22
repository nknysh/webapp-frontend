import styled from 'styled-components';

import { theme, Heading1 } from 'styles';

export const StyledTitle = styled(Heading1)`
  text-align: center;
  margin-top: 0;
  margin-bottom: ${theme.gutter * 4.7}px;
  color: ${theme.secondary};

  img {
    display: block;
    margin: ${theme.gutter * 2.5}px auto;
  }
`;
