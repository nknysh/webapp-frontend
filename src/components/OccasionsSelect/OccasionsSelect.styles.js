import styled from 'styled-components';
import { Checkbox as BaseCheckbox } from '@pure-escapes/webapp-ui-components';

import { theme } from 'styles';

export const Checkbox = styled(BaseCheckbox)`
  label > span {
    padding-top: 0;
    padding-bottom: ${theme.spacing.gutter / 2}px;
  }
`;
