import styled, { createGlobalStyle } from 'styled-components';
import { Icon } from '@material-ui/core';

import theme from 'styles/theme';
import breakpoints from 'styles/breakpoints';

export const GlobalSliderStyles = createGlobalStyle``;

const SliderArrow = styled(Icon)`
  position: absolute;
  z-index: 1000;
  background: ${theme.backgrounds.secondary};
  color: ${theme.primary};
  opacity: 0.8;
  top: 10%;

  ${breakpoints.tablet`
        top: 40%;
    `}
`;

export const SliderArrowNext = styled(SliderArrow)`
  right: 0;
`;

export const SliderArrowPrev = styled(SliderArrow)`
  left: 0;
`;
