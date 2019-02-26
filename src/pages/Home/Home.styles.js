import styled from 'styled-components';
import { Icon } from '@material-ui/core';

import theme from 'styles/theme';
import breakpoints from 'styles/breakpoints';

import { Hero } from 'components';

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
`;

export const HomeSection = styled.div`
  position: relative;
`;

export const HomeHero = styled(Hero)`
  background-attachment: fixed;
`;

export const HomeContainer = styled.div`
  text-align: center;
  padding: ${theme.gutter * 5}px;

  ${breakpoints.tablet`
    padding: 120px;
  `}

  h1, h2 {
    color: ${theme.secondary};
  }

  p,
  .small {
    color: ${theme.primary};
  }

  .small {
    font-size: 12px;
  }
`;
