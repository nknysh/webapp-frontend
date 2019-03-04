import styled from 'styled-components';

import theme from 'styles/theme';
import breakpoints from 'styles/breakpoints';
import { Hero, Markdown } from 'components';

export const StyledSearch = styled.div`
  width: 100%;
`;

export const SearchHero = styled(Hero)`
  overflow: visible;
  min-height: unset;
  height: 500px;
  display: block;
  margin-bottom: 475px;
  background-size: auto;

  ${breakpoints.desktop`
    height: unset;
    margin-bottom: unset;
  `}
`;

export const SearchMarkdown = styled(Markdown)`
  margin: ${theme.gutter * 5}px 0 ${theme.gutter * 2}px;

  h1,
  p {
    max-width: 600px;
    margin: ${theme.gutter * 2}px auto;
  }
`;
