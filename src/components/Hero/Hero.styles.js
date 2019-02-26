import styled from 'styled-components';

import { windowExists } from 'utils/window';

import breakpoints from 'styles/breakpoints';
import theme from 'styles/theme';

const getHeight = (offsetBy, headerSize) =>
  windowExists.innerHeight && windowExists.innerHeight - (offsetBy || headerSize);

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
  height: ${({ full, offsetBy = 0 }) => full && `${getHeight(offsetBy, theme.headerSizes.mobile)}px`};
  min-height: 350px;
  text-align: center;

  ${breakpoints.tablet`
    height: ${({ full, offsetBy = 0 }) => full && `${getHeight(offsetBy, theme.headerSizes.tablet)}px`};
  `}
`;

export const HeroTitle = styled.h2`
  font-size: 54px;
  color: ${theme.primary};
`;

export const HeroChildren = styled.div`
  color: white;
  font-size: 24px;
  text-shadow: 0 0 3px ${theme.colors.black};

  p {
    margin: 0;
    padding: 0;
  }
`;
