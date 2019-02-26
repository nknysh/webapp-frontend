import styled, { keyframes } from 'styled-components';

import theme from 'styles/theme';
import { Image } from 'styles/elements';
import { P } from 'styles/typography';

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
`;

export const LoaderImage = styled(Image)`
  animation: ${rotate} 1.5s linear infinite;
  transition: ease-in-out 0.25s all;
  display: block;
`;

export const LoaderText = styled(P)`
  font-weight: bold;
  color: ${theme.primary};
  display: block;
`;
