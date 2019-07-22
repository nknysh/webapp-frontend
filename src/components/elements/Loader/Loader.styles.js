import styled, { keyframes, css } from 'styled-components';

import Image from 'components/elements/Image';

import { theme, P } from 'styles';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const StyledLoader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  flex: 1;

  ${({ ['data-prev']: prev }) =>
    prev &&
    css`
      background: ${theme.backgrounds.whiteOpacity};
      justify-content: flex-start;
      position: absolute;
      bottom: 0;
      top: 0;
      left: 0;
      right: 0;
      padding-top: ${theme.gutter * 7.5}px;
    `}
`;

export const LoaderImage = styled(Image)`
  animation: ${rotate} 1.5s linear infinite;
  transition: ${theme.defaultTransition};
  display: block;
`;

export const LoaderText = styled(P)`
  font-weight: ${theme.fonts.bold};
  color: ${theme.primary};
  display: block;
`;
