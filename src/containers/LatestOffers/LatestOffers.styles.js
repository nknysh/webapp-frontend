import styled from 'styled-components';

import theme from 'styles/theme';
import { Heading2 } from 'styles/typography';

export const StyledLatestOffers = styled.div`
  padding: ${theme.gutter * 2}px;
`;

export const Title = styled(Heading2)`
  font-family: ${theme.defaultFont};
  font-weight: normal;
  text-transform: uppercase;
  text-align: center;
`;
