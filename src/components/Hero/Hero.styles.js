import styled, { css } from 'styled-components';

import { windowExists } from 'utils/window';

import breakpoints from 'styles/breakpoints';
import theme from 'styles/theme';

const getHeight = (offsetBy, headerSize) =>
  windowExists.innerHeight && windowExists.innerHeight - (offsetBy || headerSize);

const generateHeight = ({ full, offsetBy = 0 }) => full && `${getHeight(offsetBy, theme.headerSizes.tablet)}px`;

export const StyledHero = styled.div`
  background-color: ${theme.colors['gray-light']};
  background-image: ${({ image }) => image && `url(${image})`};
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${generateHeight};
  min-height: 350px;
  text-align: center;
  position: relative;
  overflow: hidden;

  ${breakpoints.tablet`
    height: ${generateHeight};
  `}
`;

const heroTitleStyles = css`
  font-size: 20px;
  color: ${theme.colors.white};
  text-transform: uppercase;
  font-weight: normal;
  margin: ${theme.gutter / 2}px 0;
`;

export const HeroTitle = styled.h2`
  ${heroTitleStyles}
`;

export const HeroChildren = styled.div`
  position: relative;
  color: ${theme.colors.white};
  z-index: 10;
  padding: ${theme.gutter * 2}px;

  h1,
  h2 {
    ${heroTitleStyles};
  }

  p {
    margin: ${theme.gutter * 2}px 0;
    padding: 0;
  }
`;

export const HeroMask = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;
  opacity: 0.3;
  background: ${theme.colors['gold-dark']};
  z-index: 0;
  width: 100%;
  height: 100%;
  max-width: none !important;
`;

export const HeroVideo = styled.div`
  video {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    min-height: 100%;
    width: 100%;
    object-fit: cover;
    z-index: 5;
  }
`;
