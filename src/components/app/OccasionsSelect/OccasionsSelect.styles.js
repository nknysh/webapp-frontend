import styled from 'styled-components';

import { theme } from 'styles';
import { Checkbox as BaseCheckbox } from 'components/elements';

export const Checkbox = styled(BaseCheckbox)`
  label > span {
    padding-top: 0;
    padding-bottom: ${theme.gutter / 2}px;
  }
`;
