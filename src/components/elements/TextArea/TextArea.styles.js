import styled from 'styled-components';

import theme from 'styles/theme';

export const StyledTextArea = styled.textarea`
  display: block;
  margin-top: ${theme.gutter / 2}px;
  width: 100%;
  min-height: 250px;
  border: 1px solid ${theme.borders.default};
  padding: ${theme.gutter}px;
  font-family: ${theme.fonts.defaultFont};
  font-size: ${theme.fonts.sizes.normal}px;
`;
