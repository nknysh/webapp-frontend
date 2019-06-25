import styled from 'styled-components';

import theme from 'styles/theme';

import Link from 'components/elements/Link';

export const ShowButton = styled(Link)`
  font-size: ${theme.fonts.sizes.default}px;
  font-weight: ${theme.fonts.bold};
  text-transform: uppercase;
  padding: ${theme.gutter / 1.5}px ${theme.gutter}px !important;
`;
