import styled from 'styled-components';

import { Hero, Markdown } from 'components';
import { theme, breakpoints } from 'styles';

export const StyledLanding = styled.div`
  width: 100%;
`;

export const LandingHero = styled(Hero)`
  overflow: visible;
  min-height: unset;
  display: block;
  padding: ${theme.gutter * 4.5}px 0 ${theme.gutter * 2}px;

  ${breakpoints.desktop`
    padding: ${theme.gutter * 9.7}px 0 ${theme.gutter * 10.7}px;
  `}

  :after {
    content: '';
    position: absolute;
    background: ${theme.backgrounds.default};
    width: 100%;
    height: ${theme.gutter * 30}px;
    left: 0;
    right: 0;
    bottom: -2px;

    ${breakpoints.desktop`
      content: unset;
      position: unset;
      background: unset;
      width: unset;
      height: unset;
      left: 0;
      right: 0;
      bottom: -2px;
    `}
  }
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
    margin-bottom: ${theme.gutter}px;

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
