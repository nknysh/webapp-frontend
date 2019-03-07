import styled from 'styled-components';

import theme from 'styles/theme';
import { Heading2 } from 'styles/typography';
import { Container } from 'styles/elements';
import breakpoints from 'styles/breakpoints';

export const StyledLatestOffers = styled(Container)`
  padding: 0;
`;

export const Title = styled(Heading2)`
  font-family: ${theme.defaultFont};
  font-weight: ${theme.normal};
  text-transform: uppercase;
  text-align: center;
  margin-bottom: ${theme.gutter * 4}px;
`;

export const Offers = styled.div`
  ${breakpoints.tablet`
    display: flex;
    margin-left: -${theme.gutter}px;
    margin-right: -${theme.gutter}px;
    flex-wrap: wrap;
  `}
`;
