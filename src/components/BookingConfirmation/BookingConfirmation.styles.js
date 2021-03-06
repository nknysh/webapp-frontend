import styled from 'styled-components';

import { theme, Heading1 } from 'styles';

export const Confirmation = styled.div``;

export const ConfirmationTitle = styled(Heading1)`
  font-size: ${theme.fonts.sizes.bigger}px;
  color: ${theme.palette.secondary};
  letter-spacing: 0.85px;
  line-height: 20px;
  margin: 0 0 ${theme.spacing.gutter * 2.5}px;
  padding: 0;
  font-weight: 500;
`;
export const ConfirmationRefNumber = styled.div`
  text-transform: uppercase;
  color: ${theme.palette.primary};
  font-size: ${theme.fonts.sizes.normal}px;
  font-weight: ${theme.fonts.bold};
  border-bottom: 2px solid ${theme.borders.medium};
  padding-bottom: ${theme.spacing.gutter * 1.5}px;
`;
