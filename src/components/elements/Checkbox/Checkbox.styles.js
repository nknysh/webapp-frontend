import styled from 'styled-components';
import { Checkbox } from '@material-ui/core';

import theme from 'styles/theme';

export const StyledCheckBox = styled.div`
  label,
  label span {
    font-family: ${theme.defaultFont} !important;
  }
`;

export const MaterialCheckbox = styled(Checkbox)`
  svg {
    fill: ${theme.primary};
  }
`;
