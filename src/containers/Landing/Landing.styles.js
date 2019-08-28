import styled from 'styled-components';
import { Hero, Markdown } from '@pure-escapes/webapp-ui-components';

import { theme } from 'styles';

export const StyledLanding = styled.div`
  width: 100%;
`;

export const LandingHero = styled(Hero)`
  overflow: visible;
  min-height: unset;
  display: block;
  padding: ${theme.spacing.gutter * 4.5}px 0 ${theme.spacing.gutter * 2}px;

  ${props => props.theme.breakpoints.desktop`
    padding: ${theme.spacing.gutter * 9.7}px 0 ${theme.spacing.gutter * 10.7}px;
  `}

  :after {
    content: '';
    position: absolute;
    background: ${theme.backgrounds.default};
    width: 100%;
    height: ${theme.spacing.gutter * 30}px;
    left: 0;
    right: 0;
    bottom: -2px;

    ${props => props.theme.breakpoints.desktop`
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
  ${props => props.theme.breakpoints.tablet`
    margin-bottom: ${theme.spacing.gutter * 22}px;
  `}

  h1,
  p {
    max-width: 685px;
    margin: 0 auto;
    padding: 0;
  }

  h1 {
    font-size: 20px;
    margin-bottom: ${theme.spacing.gutter}px;

    ${props => props.theme.breakpoints.tablet`
      letter-spacing: 3.27px;
      font-size: 24px;
    `}
  }

  p {
    line-height: 17px;
    font-size: ${theme.fonts.sizes.normal}px;

    ${props => props.theme.breakpoints.tablet`
      letter-spacing: 2.18px;
      line-height: 19px;
      font-size: ${theme.fonts.sizes.mid}px;
    `}
  }
`;
