import styled from 'styled-components';
import { Container } from '@pure-escapes/webapp-ui-components';

import { theme, Heading2 } from 'styles';

export const StyledLatestOffers = styled(Container)`
  padding: 0;
`;

export const Title = styled(Heading2)`
  font-family: ${theme.fonts.defaultFont};
  font-weight: ${theme.fonts.normal};
  text-transform: uppercase;
  text-align: center;
  margin: ${theme.spacing.gutter * 4}px ${theme.spacing.gutter * 2}px;
  font-size: ${theme.fonts.sizes.default * 2}px;
`;

export const Offers = styled.div`
  ${props => props.theme.breakpoints.tablet`
    display: flex;
    flex-wrap: wrap;
  `}
`;
