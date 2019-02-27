import styled from 'styled-components';

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

export const HeroTitle = styled.h2`
  font-size: 54px;
  color: ${theme.primary};
`;

export const HeroChildren = styled.div`
  position: relative;
  color: white;
  font-size: 24px;
  text-shadow: 0 0 3px ${theme.colors.black};
  z-index: 10;

  p {
    margin: 0;
    padding: 0;
  }
`;

export const HeroVideo = styled.div`
  video {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    height: 100%;
  }
`;
