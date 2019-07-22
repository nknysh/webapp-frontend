import styled from 'styled-components';
import theme from 'styles/theme';
import breakpoints from 'styles/breakpoints';

export const Container = styled.div`
  width: 100%;

  ${breakpoints.tablet`
    max-width: 100%;
    margin: 0 auto;
    width: ${theme.breakpoints.desktop}px
  `}
`;

export default Container;
