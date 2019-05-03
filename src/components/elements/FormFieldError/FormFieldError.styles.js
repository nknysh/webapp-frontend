import styled from 'styled-components';

import theme from 'styles/theme';

export const StyledFormFieldError = styled.div`
  color: ${theme.error};
  font-size: ${theme.fonts.sizes.default}px;
  margin: ${theme.gutter}px 0;
  display: block;
  font-weight: ${theme.fonts.normal};
`;
