import styled from 'styled-components';

import theme from 'styles/theme';

const headerSpacing = theme.gutter * 2 - theme.gutter / 2;

export const Section = styled.div`
  background: ${theme.navigation};
  padding: ${theme.gutter * 2}px;
  margin: 0 0 ${headerSpacing * 2}px;

  label,
  label > span {
    color: ${theme.colors['gold-neutral']};
    font-size: 12px;
    text-transform: uppercase;
  }

  p {
    font-size: 12px;
    margin: 0 0 ${theme.gutter}px;
    color: ${theme.colors['gold-neutral']};
  }
`;

export const Title = styled.h4`
  color: ${theme.colors['gold-neutral']};
  font-size: 12px;
  font-weight: bold;
  padding: 0 0 ${headerSpacing}px;
  margin: 0 0 ${headerSpacing}px;
  text-transform: uppercase;
  border-bottom: 1px solid ${theme.colors['gray-medium']};
`;
