import styled from 'styled-components';

import Markdown from 'components/elements/Markdown';

import { theme, breakpoints } from 'styles';

export const ServerError = styled(Markdown)`
  border: 1px solid ${theme.primary};
  background: ${theme.backgrounds.secondary};
  text-align: center;
  padding: ${theme.gutter}px;
  margin-bottom: ${theme.gutter * 2}px;

  ${breakpoints.tablet`
    width: 400px;
  `}

  h3 {
    font-family: ${theme.fonts.headingFont};
    color: ${theme.primary};
    font-size: ${theme.fonts.sizes.normal}px;
  }

  p {
    font-size: ${theme.fonts.sizes.normal}px;
  }
`;

export default ServerError;
