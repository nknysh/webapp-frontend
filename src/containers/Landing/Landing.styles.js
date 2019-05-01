import styled from 'styled-components';

import theme from 'styles/theme';
import breakpoints from 'styles/breakpoints';
import { Hero, Markdown } from 'components';

export const StyledLanding = styled.div`
  width: 100%;
`;

export const LandingHero = styled(Hero)`
  overflow: visible;
  min-height: unset;
  height: 540px;
  display: block;
  margin-bottom: 350px;
  padding: ${theme.gutter * 4.5}px 0;

  ${breakpoints.tablet`
    margin-bottom: 270px;
    padding: ${theme.gutter * 10.7}px 0 ${theme.gutter * 11.7}px 0;
  `}

  ${breakpoints.desktop`
    height: unset;
    margin-bottom: unset;
  `}
`;

export const LandingMarkdown = styled(Markdown)`
  ${breakpoints.tablet`
    margin-bottom: ${theme.gutter * 22}px;
  `}

  h1,
  p {
    max-width: 685px;
    margin: 0 auto;
    padding: 0;
  }

  h1 {
    font-size: 20px;
    margin-bottom: ${theme.gutter * 2}px;

    ${breakpoints.tablet`
      letter-spacing: 3.27px;
      font-size: 24px;
    `}
  }

  p {
    line-height: 17px;
    font-size: ${theme.fonts.sizes.normal}px;

    ${breakpoints.tablet`
      letter-spacing: 2.18px;
      line-height: 19px;
      font-size: ${theme.fonts.sizes.mid}px;
    `}
  }
`;
