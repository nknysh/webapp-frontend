import styled from 'styled-components';

import theme from 'styles/theme';
import { Heading1 } from 'styles/typography';

export const Confirmation = styled.div``;

export const ConfirmationTitle = styled(Heading1)`
  font-size: ${theme.fonts.sizes.bigger}px;
  color: ${theme.secondary};
  letter-spacing: 0.85px;
  line-height: 20px;
  margin: 0 0 ${theme.gutter * 2.5}px;
  padding: 0;
  font-weight: 500;
`;
export const ConfirmationRefNumber = styled.div`
  text-transform: uppercase;
  color: ${theme.primary};
  font-size: ${theme.fonts.sizes.normal}px;
  font-weight: ${theme.fonts.bold};
  border-bottom: 2px solid ${theme.borders.medium};
  padding-bottom: ${theme.gutter * 1.5}px;
`;
