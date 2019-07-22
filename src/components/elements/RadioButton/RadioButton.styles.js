import styled from 'styled-components';
import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core';

import { theme } from 'styles';

export const StyledRadioGroup = styled(RadioGroup)`
  flex-direction: row !important;
`;

export const RadioFormControl = styled(FormControlLabel)`
  flex: 1 1 100%;
  text-transform: uppercase;

  > span {
    color: ${theme.secondary} !important;
    font-size: ${theme.fonts.sizes.default}px !important;
    font-family: ${theme.fonts.defaultFont} !important;
  }
`;

export const MaterialRadio = styled(Radio)`
  svg {
    fill: ${theme.primary};
  }
`;
