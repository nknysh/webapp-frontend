import styled, { css } from 'styled-components';
import { Icon } from '@material-ui/core';
import { Parallax } from 'react-parallax';

import theme from 'styles/theme';
import breakpoints from 'styles/breakpoints';
import { h2Styling, h1Styling } from 'styles/typography';

export const StyledHome = styled.div`
  height: 100%;
  width: 100%;
`;

export const MoveTo = styled(Icon)`
  position: absolute;
  color: ${theme.colors.white};
  text-align: center;
  top: -100px;
  z-index: 30;
  width: 100% !important;
  font-size: 62px !important;
  cursor: pointer;
`;

export const HomeSection = styled.div`
  position: relative;

  ${({ ['data-striped']: striped }) =>
    striped &&
    css`
      background-color: ${theme.colors['light-blue']};
    `}
  }
`;

export const HomeHero = styled(Parallax)``;

export const HeroShim = styled.div`
  height: 50vh;
`;

export const HomeContainer = styled.div`
  text-align: center;
  padding: ${theme.gutter * 5}px;

  ${breakpoints.tablet`
    padding: 120px ${theme.gutter}px;
    max-width: 600px;
    margin: 0 auto;
  `}

  h1, h2 {
    ${h1Styling}
  }

  h2 {
    ${h2Styling}
  }

  p,
  .small {
    color: ${theme.primary};
  }

  .small {
    font-size: ${theme.fonts.sizes.normal}px;
  }
`;
