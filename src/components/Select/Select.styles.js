import styled from 'styled-components';
import { Select, FormControlLabel, MenuItem } from '@material-ui/core';

import theme from 'styles/theme';
import { inputStyles, Hr } from 'styles/elements';
import breakpoints from 'styles/breakpoints';

const baseClass = 'material';

export const selectClasses = {
  root: `${baseClass}-select`,
  select: `${baseClass}-select__input`,
};

export const StyledFormLabel = styled(FormControlLabel)`
  margin: 0 !important;
  width: 100%;

  ${breakpoints.tablet`
    width: auto;
  `}
`;

export const StyledSelect = styled.div`
  label,
  label span {
    font-family: ${theme.defaultFont} !important;
  }
`;

export const MaterialSelect = styled(Select)`
  margin-bottom: ${theme.gutter * 2}px;
  width: 100%;
  font-size: 14px !important;
  
  :before, :after {
    content: '' !important;
    border: 0 !important;
  }

  .${baseClass}-select {
    min-width: 195px;
    width: 100%;

    ${breakpoints.tablet`
      width: auto;
    `}

    &__input {
      ${inputStyles}
      padding: ${theme.gutter}px;
    }
  }
`;

export const SelectMenuItem = styled(MenuItem)``;

export const SectionDivider = styled(Hr)``;
