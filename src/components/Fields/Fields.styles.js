import styled from 'styled-components';

import breakpoints from 'styles/breakpoints';

export const StyledFields = styled.div`
  margin-top: 50px;
  text-align: left;

  ${breakpoints.tablet`
        min-width: 400px;
    `}
`;
