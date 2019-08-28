import styled from 'styled-components';
import { Icon } from '@material-ui/core';

import { theme } from 'styles';

export const MenuIcon = styled(Icon)`
  font-size: ${theme.fonts.sizes.mid}px !important;
  font-weight: ${theme.fonts.bold};
  line-height: 24px
  overflow: visible !important;
  padding-top: 4px;
  cursor: pointer;
`;

export default MenuIcon;
