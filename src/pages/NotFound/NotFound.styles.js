import styled from 'styled-components';
import { Image } from '@pure-escapes/webapp-ui-components';

import { Heading1 } from 'styles';

export const StyledNotFound = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
`;

export const NotFoundHeading = styled(Heading1)``;

export const NotFoundImage = styled(Image)`
  transform: rotate(25deg);
`;
