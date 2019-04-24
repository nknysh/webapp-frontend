import styled from 'styled-components';

import { Link, linkStyles } from 'styles/elements';

export const StyledLink = styled.div`
  a {
    ${linkStyles}
  }
`;

export const PlainLink = styled(Link)``;
