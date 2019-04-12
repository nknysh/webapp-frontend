import styled from 'styled-components';

import theme from 'styles/theme';
import { Heading1 } from 'styles/typography';

export const Confirmation = styled.div``;

export const ConfirmationTitle = styled(Heading1)`
  font-size: 22px;
  color: ${theme.colors['gold-dark']};
  letter-spacing: 0.85px;
  line-height: 20px;
  margin: 0 0 ${theme.gutter * 2.5}px;
  padding: 0;
  font-weight: 500;
`;
export const ConfirmationRefNumber = styled.div`
  text-transform: uppercase;
  color: ${theme.primary};
  font-size: 12px;
  font-weight: ${theme.bold};
  border-bottom: 2px solid ${theme.colors['gray-medium']};
  padding-bottom: ${theme.gutter * 1.5}px;
`;
