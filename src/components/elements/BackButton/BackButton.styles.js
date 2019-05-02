import styled from 'styled-components';
import { Icon } from '@material-ui/core';

import Link from 'components/elements/Link';

import theme from 'styles/theme';

export const Navigation = styled(Link)`
  font-size: ${theme.fonts.sizes.default}px;
  letter-spacing: ${theme.fonts.letterSpacing.medium}px;
  text-transform: uppercase;
  color: ${theme.primary} !important;
  display: flex;
  align-items: center;
  font-weight: bold;
  line-height: ${theme.fonts.sizes.normal}px;
`;

export const BackWrapper = styled.div`
    background: ${theme.navigation};
    padding ${theme.gutter / 4}px ${theme.gutter / 2}px;
    margin-right: ${theme.gutter}px;

`;

export const Button = styled(Icon)`
  font-size: ${theme.fonts.sizes.normal}px !important;
`;
