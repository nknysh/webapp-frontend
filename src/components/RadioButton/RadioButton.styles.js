import styled from 'styled-components';
import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core';

import theme from 'styles/theme';

export const StyledRadioGroup = styled(RadioGroup)`
  flex-direction: row !important;
`;

export const RadioFormControl = styled(FormControlLabel)`
  flex: 1 1 100%;
  text-transform: uppercase;
  margin-bottom: ${theme.gutter}px;

  > span {
    font-size: 12px !important;
    font-family: ${theme.defaultFont} !important;
  }
`;

export const MaterialRadio = styled(Radio)`
  svg {
    fill: ${theme.primary};
  }
`;
