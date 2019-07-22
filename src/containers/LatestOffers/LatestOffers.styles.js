import styled from 'styled-components';

import { Container } from 'components';

import theme from 'styles/theme';
import { Heading2 } from 'styles/typography';
import breakpoints from 'styles/breakpoints';

export const StyledLatestOffers = styled(Container)`
  padding: 0;
`;

export const Title = styled(Heading2)`
  font-family: ${theme.fonts.defaultFont};
  font-weight: ${theme.fonts.normal};
  text-transform: uppercase;
  text-align: center;
  margin: ${theme.gutter * 4}px ${theme.gutter * 2}px;
  font-size: ${theme.fonts.sizes.default * 2}px;
`;

export const Offers = styled.div`
  ${breakpoints.tablet`
    display: flex;
    flex-wrap: wrap;
  `}
`;
